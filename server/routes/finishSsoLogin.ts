import * as jwt from 'jsonwebtoken';
import { isAddress } from 'web3-utils';

import { TypedRequestBody, TypedResponse, success } from '../types';
import { AXIE_SHARED_SECRET } from '../config';
import { sequelize, DB } from '../database';
import { ProfileAttributes } from '../models/profile';
import {
  DynamicTemplate,
  NotificationCategories,
  WalletId,
} from '../../shared/types';

import { AppError, ServerError } from '../util/errors';
import { UserAttributes } from '../models/user';
import { AddressAttributes } from '../models/address';

import { factory, formatFilename } from '../../shared/logging';
import {
  redirectWithLoginError,
  redirectWithLoginSuccess,
} from './finishEmailLogin';
import { mixpanelTrack } from '../util/mixpanelUtil';
import {
  MixpanelLoginEvent,
  MixpanelLoginPayload,
} from '../../shared/analytics/types';

const log = factory.getLogger(formatFilename(__filename));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');

export enum Issuers {
  AxieInfinity = 'AxieInfinity',
}

type AxieInfinityJwt = {
  iat: number; // issued at time
  iss: string; // should be "AxieInfinity"
  jti: string; // random UUID
  roninAddress: string; // eth address
};

function isAxieInfinityJwt(token: any): token is AxieInfinityJwt {
  return (
    typeof token.iat === 'number' &&
    typeof token.iss === 'string' &&
    typeof token.jti === 'string' &&
    typeof token.roninAddress === 'string'
  );
}

const AXIE_INFINITY_CHAIN_ID = 'axie-infinity';
const EXPIRATION_TIME = 60 * 5; // 5 minutes

const Errors = {
  InvalidTokenState: 'Invalid token state',
  InvalidIssuer: 'Invalid issuer',
  NoSharedSecret: 'Missing shared secret',
  MissingToken: 'Must provide token',
  InvalidToken: 'Invalid token',
  TokenBadIssuer: 'Invalid token issuer',
  TokenExpired: 'Token expired',
  TokenBadAddress: 'Invalid token address',
  AlreadyLoggedIn: 'User is already logged in',
  ReplayAttack: 'Invalid token. Try again',
  AccountCreationFailed: 'Failed to create account',
};

type FinishSsoLoginReq = { token: string; issuer: Issuers; stateId: string };
type FinishSsoLoginRes = { user?: UserAttributes; address?: AddressAttributes };

const finishSsoLogin = async (
  models: DB,
  req: TypedRequestBody<FinishSsoLoginReq>,
  res: TypedResponse<FinishSsoLoginRes>
) => {
  // verify issuer (TODO: support other SSO endpoints)
  if (req.body.issuer !== Issuers.AxieInfinity) {
    throw new AppError(Errors.InvalidIssuer);
  } else if (!AXIE_SHARED_SECRET) {
    throw new ServerError(Errors.NoSharedSecret);
  }

  // verify request stateId (i.e. that /auth/sso was called)
  const emptyTokenInstance = await models.SsoToken.findOne({
    where: { state_id: req.body.stateId },
  });
  if (!emptyTokenInstance) {
    throw new AppError(Errors.InvalidTokenState);
  }

  // decode token payload
  const tokenString = req.body.token;
  if (!tokenString) {
    throw new AppError(Errors.MissingToken);
  }

  let jwtPayload: AxieInfinityJwt;
  try {
    const decoded = jwt.verify(tokenString, AXIE_SHARED_SECRET, {
      issuer: 'AxieInfinity',
    });
    if (isAxieInfinityJwt(decoded)) {
      jwtPayload = decoded;
    } else {
      throw new Error('Could not decode token');
    }
  } catch (e) {
    log.info(`Axie token decoding error: ${e.message}`);
    throw new AppError(Errors.InvalidToken);
  }

  // verify issuer
  if (jwtPayload.iss !== Issuers.AxieInfinity) {
    throw new AppError(Errors.TokenBadIssuer);
  }

  // verify expiration
  if (jwtPayload.iat + EXPIRATION_TIME < Math.floor(Date.now() / 1000)) {
    throw new AppError(Errors.TokenExpired);
  }

  // verify address
  if (!isAddress(jwtPayload.roninAddress)) {
    throw new AppError(Errors.TokenBadAddress);
  }

  // check if this is a new signup or a login
  const reqUser = req.user;
  const existingAddress = await models.Address.scope('withPrivateData').findOne(
    {
      where: { address: jwtPayload.roninAddress },
      include: [
        {
          model: models.SsoToken,
          where: { issuer: jwtPayload.iss },
          required: true,
        },
      ],
    }
  );
  if (existingAddress) {
    // TODO: transactionalize
    // if the address was removed by /deleteAddress, we need to re-verify it
    if (!existingAddress.verified) {
      existingAddress.verified = new Date();
      await existingAddress.save();
    }

    if (reqUser?.id && reqUser.id === existingAddress.user_id) {
      const newUser = await models.User.findOne({
        where: {
          id: reqUser.id,
        },
        include: [models.Address],
      });
      return success(res, { user: newUser });
    }

    // check login token, if the user has already logged in before with SSO
    const token = await existingAddress.getSsoToken();

    // perform login on existing account
    if (jwtPayload.iat <= token.issued_at) {
      log.error('Replay attack detected.');
      throw new AppError(Errors.ReplayAttack);
    }
    token.issued_at = jwtPayload.iat;
    token.state_id = emptyTokenInstance.state_id;
    await token.save();

    // delete the empty token that was initialized on /auth/sso, because it is superceded
    // by the existing token for this user
    await emptyTokenInstance.destroy();

    if (reqUser) {
      // perform address transfer
      // TODO: factor this email code into a util
      try {
        const oldUser = await models.User.scope('withPrivateData').findOne({
          where: { id: existingAddress.user_id },
        });
        if (!oldUser) {
          throw new Error('User should exist');
        }
        const msg = {
          to: oldUser.email,
          from: 'Commonwealth <no-reply@commonwealth.im>',
          templateId: DynamicTemplate.VerifyAddress,
          dynamic_template_data: {
            address: existingAddress,
            chain: AXIE_INFINITY_CHAIN_ID,
          },
        };
        await sgMail.send(msg);
        log.info(
          `Sent address move email: ${existingAddress} transferred to a new account`
        );
      } catch (e) {
        log.error(`Could not send address move email for: ${existingAddress}`);
      }

      const newProfile = await models.Profile.findOne({
        where: { user_id: reqUser.id },
      });
      existingAddress.user_id = reqUser.id;
      existingAddress.profile_id = newProfile.id;
      await existingAddress.save();

      const newAddress = await models.Address.findOne({
        where: { id: existingAddress.id },
      });
      return success(res, { address: newAddress });
    } else {
      // user is not logged in, so we log them in
      const user = await models.User.findOne({
        where: {
          id: existingAddress.user_id,
        },
        include: [models.Address],
      });
      // TODO: should we req.login here, or not?
      req.login(user, (err) => {
        if (err)
          return redirectWithLoginError(
            res,
            `Could not log in with ronin wallet`
          );
        if (process.env.NODE_ENV !== 'test') {
          mixpanelTrack({
            event: MixpanelLoginEvent.LOGIN,
            isCustomDomain: null,
          });
        }
      });
      return success(res, { user });
    }
  }

  // create new address and user if needed + populate sso token
  try {
    const result = await sequelize.transaction(async (t) => {
      let user: Express.User;
      // TODO: this profile fetching will eventually need to assume more than one profile
      let profile: ProfileAttributes;
      if (!reqUser) {
        // create new user
        user = await models.User.createWithProfile(
          models,
          { email: null },
          { transaction: t }
        );
        profile = user.Profiles[0];
      } else {
        user = reqUser;
        profile = await models.Profile.findOne({ where: { user_id: user.id } });
      }

      // create new address
      const newAddress = await models.Address.create(
        {
          address: jwtPayload.roninAddress,
          chain: AXIE_INFINITY_CHAIN_ID,
          verification_token: 'SSO',
          verification_token_expires: null,
          verified: new Date(), // trust addresses from magic
          last_active: new Date(),
          user_id: user.id,
          profile_id: profile.id,
          wallet_id: WalletId.Ronin,
        },
        { transaction: t }
      );

      await models.Role.create(
        {
          address_id: newAddress.id,
          chain_id: AXIE_INFINITY_CHAIN_ID,
          permission: 'member',
        },
        { transaction: t }
      );

      // Automatically create subscription to their own mentions
      await models.Subscription.create(
        {
          subscriber_id: user.id,
          category_id: NotificationCategories.NewMention,
          object_id: `user-${user.id}`,
          is_active: true,
        },
        { transaction: t }
      );

      // Automatically create a subscription to collaborations
      await models.Subscription.create(
        {
          subscriber_id: user.id,
          category_id: NotificationCategories.NewCollaboration,
          object_id: `user-${user.id}`,
          is_active: true,
        },
        { transaction: t }
      );

      // populate token
      emptyTokenInstance.issuer = jwtPayload.iss;
      emptyTokenInstance.issued_at = jwtPayload.iat;
      emptyTokenInstance.address_id = newAddress.id;
      await emptyTokenInstance.save({ transaction: t });

      return user;
    });

    if (reqUser) {
      // re-fetch address if existing user
      const newAddress = await models.Address.findOne({
        where: { address: jwtPayload.roninAddress },
      });
      return success(res, { address: newAddress });
    } else {
      // re-fetch user to include address object, if freshly created
      const newUser = await models.User.findOne({
        where: {
          id: result.id,
        },
        include: [models.Address],
      });
      // TODO: should we req.login here? or not?
      req.login(newUser, (err) => {
        if (err)
          return redirectWithLoginError(
            res,
            `Could not log in with ronin wallet`
          );
        if (process.env.NODE_ENV !== 'test') {
          mixpanelTrack({
            event: MixpanelLoginEvent.LOGIN,
            isCustomDomain: null,
          });
        }
      });
      return success(res, { user: newUser });
    }
  } catch (e) {
    log.error(e.message);
    throw new ServerError(Errors.AccountCreationFailed);
  }
};

export default finishSsoLogin;
