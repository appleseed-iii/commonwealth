/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import { TypedEventFilter, TypedEvent, TypedListener } from './commons';

interface AaveTokenInterface extends ethers.utils.Interface {
  functions: {
    'DOMAIN_SEPARATOR()': FunctionFragment;
    'EIP712_REVISION()': FunctionFragment;
    'PERMIT_TYPEHASH()': FunctionFragment;
    'REVISION()': FunctionFragment;
    '_aaveGovernance()': FunctionFragment;
    '_countsSnapshots(address)': FunctionFragment;
    '_nonces(address)': FunctionFragment;
    '_snapshots(address,uint256)': FunctionFragment;
    'allowance(address,address)': FunctionFragment;
    'approve(address,uint256)': FunctionFragment;
    'balanceOf(address)': FunctionFragment;
    'decimals()': FunctionFragment;
    'decreaseAllowance(address,uint256)': FunctionFragment;
    'increaseAllowance(address,uint256)': FunctionFragment;
    'initialize(address,address,address)': FunctionFragment;
    'name()': FunctionFragment;
    'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)': FunctionFragment;
    'symbol()': FunctionFragment;
    'totalSupply()': FunctionFragment;
    'transfer(address,uint256)': FunctionFragment;
    'transferFrom(address,address,uint256)': FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: 'DOMAIN_SEPARATOR',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'EIP712_REVISION',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'PERMIT_TYPEHASH',
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: 'REVISION', values?: undefined): string;
  encodeFunctionData(
    functionFragment: '_aaveGovernance',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: '_countsSnapshots',
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: '_nonces', values: [string]): string;
  encodeFunctionData(
    functionFragment: '_snapshots',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'allowance',
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'approve',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string;
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'decreaseAllowance',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'increaseAllowance',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [string, string, string]
  ): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'permit',
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'totalSupply',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'transfer',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: 'transferFrom',
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: 'DOMAIN_SEPARATOR',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'EIP712_REVISION',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'PERMIT_TYPEHASH',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'REVISION', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: '_aaveGovernance',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: '_countsSnapshots',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: '_nonces', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: '_snapshots', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'decreaseAllowance',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'increaseAllowance',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'permit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'totalSupply',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'transferFrom',
    data: BytesLike
  ): Result;

  events: {
    'Approval(address,address,uint256)': EventFragment;
    'SnapshotDone(address,uint128,uint128)': EventFragment;
    'Transfer(address,address,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SnapshotDone'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment;
}

export class AaveToken extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: AaveTokenInterface;

  functions: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;

    'DOMAIN_SEPARATOR()'(overrides?: CallOverrides): Promise<[string]>;

    EIP712_REVISION(overrides?: CallOverrides): Promise<[string]>;

    'EIP712_REVISION()'(overrides?: CallOverrides): Promise<[string]>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    'PERMIT_TYPEHASH()'(overrides?: CallOverrides): Promise<[string]>;

    REVISION(overrides?: CallOverrides): Promise<[BigNumber]>;

    'REVISION()'(overrides?: CallOverrides): Promise<[BigNumber]>;

    _aaveGovernance(overrides?: CallOverrides): Promise<[string]>;

    '_aaveGovernance()'(overrides?: CallOverrides): Promise<[string]>;

    _countsSnapshots(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    '_countsSnapshots(address)'(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    '_nonces(address)'(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _snapshots(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { blockNumber: BigNumber; value: BigNumber }
    >;

    '_snapshots(address,uint256)'(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { blockNumber: BigNumber; value: BigNumber }
    >;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    'allowance(address,address)'(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'approve(address,uint256)'(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    'balanceOf(address)'(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    'decimals()'(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'decreaseAllowance(address,uint256)'(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'increaseAllowance(address,uint256)'(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      migrator: string,
      distributor: string,
      aaveGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'initialize(address,address,address)'(
      migrator: string,
      distributor: string,
      aaveGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    'name()'(overrides?: CallOverrides): Promise<[string]>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)'(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    'symbol()'(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    'totalSupply()'(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'transfer(address,uint256)'(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'transferFrom(address,address,uint256)'(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  'DOMAIN_SEPARATOR()'(overrides?: CallOverrides): Promise<string>;

  EIP712_REVISION(overrides?: CallOverrides): Promise<string>;

  'EIP712_REVISION()'(overrides?: CallOverrides): Promise<string>;

  PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  'PERMIT_TYPEHASH()'(overrides?: CallOverrides): Promise<string>;

  REVISION(overrides?: CallOverrides): Promise<BigNumber>;

  'REVISION()'(overrides?: CallOverrides): Promise<BigNumber>;

  _aaveGovernance(overrides?: CallOverrides): Promise<string>;

  '_aaveGovernance()'(overrides?: CallOverrides): Promise<string>;

  _countsSnapshots(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  '_countsSnapshots(address)'(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  '_nonces(address)'(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _snapshots(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { blockNumber: BigNumber; value: BigNumber }
  >;

  '_snapshots(address,uint256)'(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { blockNumber: BigNumber; value: BigNumber }
  >;

  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  'allowance(address,address)'(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'approve(address,uint256)'(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  'balanceOf(address)'(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  'decimals()'(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'decreaseAllowance(address,uint256)'(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'increaseAllowance(address,uint256)'(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    migrator: string,
    distributor: string,
    aaveGovernance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'initialize(address,address,address)'(
    migrator: string,
    distributor: string,
    aaveGovernance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  'name()'(overrides?: CallOverrides): Promise<string>;

  permit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)'(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  'symbol()'(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'transfer(address,uint256)'(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'transferFrom(address,address,uint256)'(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

    'DOMAIN_SEPARATOR()'(overrides?: CallOverrides): Promise<string>;

    EIP712_REVISION(overrides?: CallOverrides): Promise<string>;

    'EIP712_REVISION()'(overrides?: CallOverrides): Promise<string>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    'PERMIT_TYPEHASH()'(overrides?: CallOverrides): Promise<string>;

    REVISION(overrides?: CallOverrides): Promise<BigNumber>;

    'REVISION()'(overrides?: CallOverrides): Promise<BigNumber>;

    _aaveGovernance(overrides?: CallOverrides): Promise<string>;

    '_aaveGovernance()'(overrides?: CallOverrides): Promise<string>;

    _countsSnapshots(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    '_countsSnapshots(address)'(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    '_nonces(address)'(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _snapshots(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { blockNumber: BigNumber; value: BigNumber }
    >;

    '_snapshots(address,uint256)'(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { blockNumber: BigNumber; value: BigNumber }
    >;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    'allowance(address,address)'(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    'approve(address,uint256)'(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    'balanceOf(address)'(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    'decimals()'(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    'decreaseAllowance(address,uint256)'(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    'increaseAllowance(address,uint256)'(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      migrator: string,
      distributor: string,
      aaveGovernance: string,
      overrides?: CallOverrides
    ): Promise<void>;

    'initialize(address,address,address)'(
      migrator: string,
      distributor: string,
      aaveGovernance: string,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    'name()'(overrides?: CallOverrides): Promise<string>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)'(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    'symbol()'(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    'transfer(address,uint256)'(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    'transferFrom(address,address,uint256)'(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    Approval(
      owner: string | null,
      spender: string | null,
      value: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    SnapshotDone(
      owner: null,
      oldValue: null,
      newValue: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { owner: string; oldValue: BigNumber; newValue: BigNumber }
    >;

    Transfer(
      from: string | null,
      to: string | null,
      value: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;
  };

  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;

    'DOMAIN_SEPARATOR()'(overrides?: CallOverrides): Promise<BigNumber>;

    EIP712_REVISION(overrides?: CallOverrides): Promise<BigNumber>;

    'EIP712_REVISION()'(overrides?: CallOverrides): Promise<BigNumber>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    'PERMIT_TYPEHASH()'(overrides?: CallOverrides): Promise<BigNumber>;

    REVISION(overrides?: CallOverrides): Promise<BigNumber>;

    'REVISION()'(overrides?: CallOverrides): Promise<BigNumber>;

    _aaveGovernance(overrides?: CallOverrides): Promise<BigNumber>;

    '_aaveGovernance()'(overrides?: CallOverrides): Promise<BigNumber>;

    _countsSnapshots(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    '_countsSnapshots(address)'(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    '_nonces(address)'(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _snapshots(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    '_snapshots(address,uint256)'(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    'allowance(address,address)'(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'approve(address,uint256)'(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    'balanceOf(address)'(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    'decimals()'(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'decreaseAllowance(address,uint256)'(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'increaseAllowance(address,uint256)'(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      migrator: string,
      distributor: string,
      aaveGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'initialize(address,address,address)'(
      migrator: string,
      distributor: string,
      aaveGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    'name()'(overrides?: CallOverrides): Promise<BigNumber>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)'(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    'symbol()'(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'transfer(address,uint256)'(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'transferFrom(address,address,uint256)'(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'DOMAIN_SEPARATOR()'(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    EIP712_REVISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'EIP712_REVISION()'(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'PERMIT_TYPEHASH()'(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    REVISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'REVISION()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _aaveGovernance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    '_aaveGovernance()'(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _countsSnapshots(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    '_countsSnapshots(address)'(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _nonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    '_nonces(address)'(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _snapshots(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    '_snapshots(address,uint256)'(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    'allowance(address,address)'(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'approve(address,uint256)'(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    'balanceOf(address)'(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'decimals()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'decreaseAllowance(address,uint256)'(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'increaseAllowance(address,uint256)'(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      migrator: string,
      distributor: string,
      aaveGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'initialize(address,address,address)'(
      migrator: string,
      distributor: string,
      aaveGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'name()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)'(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'symbol()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    'totalSupply()'(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'transfer(address,uint256)'(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'transferFrom(address,address,uint256)'(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
