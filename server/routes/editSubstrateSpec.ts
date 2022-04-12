import { Request, Response, NextFunction } from 'express';
import validateRoles from '../util/validateRoles';
import validateChain from '../util/validateChain';
import { DB } from '../database';
import { ChainBase } from '../../shared/types';

import testSubstrateSpec from '../util/testSubstrateSpec';

const editSubstrateSpec = async (
  models: DB,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [chain, error] = await validateChain(models, req.body);
  if (error) return next(new Error(error));
  if (!chain) return next(new Error('Unknown chain.'));
  if (chain.base !== ChainBase.Substrate)
    return next(new Error('Chain must be substrate'));

  const isAdmin = validateRoles(models, req.user, 'admin', chain.id);
  if (!isAdmin) return next(new Error('Must be admin to edit'));

  const nodes = await chain.getChainNodes();
  if (!nodes.length) return next(new Error('no chain nodes found'));

  let sanitizedSpec;
  try {
    sanitizedSpec = await testSubstrateSpec(req.body.spec, nodes[0].url);
  } catch (e) {
    return next(new Error('Failed to validate Substrate Spec'));
  }

  // write back to database
  chain.substrate_spec = sanitizedSpec;
  await chain.save();

  return res.json({ status: 'Success', result: chain.toJSON() });
};

export default editSubstrateSpec;
