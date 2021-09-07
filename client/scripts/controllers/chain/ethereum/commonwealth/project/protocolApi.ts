import { utils } from 'ethers';
import BN from 'bn.js';

import { ProjectFactory as CMNProjectProtocolContract } from 'eth/types';

import ContractApi, { attachSigner } from '../../contractApi';
import CMNProjectApi from './projectApi';
import { ProjectMetaData, getTokenDetails } from '../utils';
import { CMNProject } from '../../../../../models';
import EthereumChain from '../../chain';

export default class CMNProjectProtocolApi extends ContractApi<CMNProjectProtocolContract> {
  public readonly gasLimit: number = 3000000;

  public async getAcceptedTokens() {
    // TODO_CMN: getAllAcceptedTokens => getAcceptedTokens
    const tokens = await this.Contract.getAllAcceptedTokens();
    return getTokenDetails(tokens);
  }

  public async createProject(chain: EthereumChain, params: ProjectMetaData) {
    const name = utils.formatBytes32String(params.name);
    const ipfsHash = utils.formatBytes32String('0x01');
    const cwUrl = utils.formatBytes32String('commonwealth.im');
    const nominations = [params.creator, params.beneficiary];
    const endtime = Math.ceil(Math.ceil(Date.now() / 1000) + params.deadline * 24 * 60 * 60); // in days
    const curatorFee = params.curatorFee * 100;
    const threshold = new BN(params.threshold * 100000000);

    const contract = await attachSigner(chain.app.wallets, params.creator, this.Contract);

    let transactionSuccessed: boolean;
    try {
      const tx = await contract.createProject(
        name,
        ipfsHash,
        cwUrl,
        params.beneficiary,
        params.acceptedTokens,
        nominations,
        threshold.toString(),
        endtime,
        curatorFee.toString(),
        { gasLimit: this.gasLimit }
      );
      const txReceipt = await tx.wait();
      transactionSuccessed = txReceipt.status === 1;
    } catch (err) {
      transactionSuccessed = false;
    }
    return {
      status: transactionSuccessed ? 'success' : 'failed',
      error: transactionSuccessed ? '' : 'Failed to process createProject transaction'
    };
  }

  public async getProtocolData() {
    const protocolData = await this.Contract.protocolData();
    const protocolFee = protocolData.protocolFee;
    const feeTo = protocolData.feeTo;
    return {
      protocolFee,
      feeTo,
    };
  }

  public async loadProtooclData(projApis: CMNProjectApi[]) {
    const { protocolFee, feeTo } = await this.getProtocolData();
    const acceptedTokens = await this.getAcceptedTokens();

    const projects: CMNProject[] = [];
    for (let i = 0; i < projApis.length; i++) {
      const projDetails = await projApis[i].getProjectInfo();
      projects.push(projDetails);
    }
    return {
      protocolFee,
      feeTo,
      projects,
      acceptedTokens
    };
  }
}
