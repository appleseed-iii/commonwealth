import { NextFunction, Request, Response } from 'express';
import { DB } from '../../database';

export const Errors = {
	NotLoggedIn: 'Not logged in',
	NoValidAddress: 'No valid address',
	NoCommunityId: 'No community id given'
};

/**
 * Gets all relevant messages of a community. A user must be logged in, and they must have a valid address in the
 * community whose chat messages they are trying to view.
 * @param models
 * @param req
 * @param res
 * @param next
 */
export default async (models: DB, req: Request, res: Response, next: NextFunction) => {
	if (!req.user) {
		return next(new Error(Errors.NotLoggedIn));
	}

	// check address
	const addressAccount = await models.Address.findOne({
		where: {
			address: req.body.address,
			// @ts-ignore
			user_id: req.user.id
		}
	});
	if (!addressAccount) {
		return next(new Error(Errors.NoValidAddress))
	}

	// check community id
	if (!req.body.community_id) {
		return next(new Error(Errors.NoCommunityId))
	}

	// get all messages
	const messages = await models.ChatChannel.findAll({
		where: {
			community_id: req.body.community_id
		},
		include: {
			model: models.ChatMessage,
			required: true
		}
	})

	// return
	return res.json({ status: 'Success', result: JSON.stringify(messages) });
}
