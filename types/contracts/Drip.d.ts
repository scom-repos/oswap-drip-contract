import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IDeployParams {
    name: string;
    symbol: string;
}
export interface IApproveParams {
    to: string;
    tokenId: number | BigNumber;
}
export interface IIsApprovedForAllParams {
    owner: string;
    operator: string;
}
export interface ILockParams {
    recipient: string;
    token: string;
    amount: number | BigNumber;
    startDate: number | BigNumber;
    endDate: number | BigNumber;
    campaignId: number | BigNumber;
    ownerFrozen: boolean;
}
export interface ILockMultipleParams {
    recipient: string[];
    token: string;
    amount: (number | BigNumber)[];
    startDate: number | BigNumber;
    endDate: number | BigNumber;
    campaignId: number | BigNumber;
    ownerFrozen: boolean;
}
export interface ISafeTransferFromParams {
    from: string;
    to: string;
    tokenId: number | BigNumber;
}
export interface ISafeTransferFrom_1Params {
    from: string;
    to: string;
    tokenId: number | BigNumber;
    data: string;
}
export interface ISetApprovalForAllParams {
    operator: string;
    approved: boolean;
}
export interface ITokenOfOwnerByIndexParams {
    owner: string;
    index: number | BigNumber;
}
export interface ITransferFromParams {
    from: string;
    to: string;
    tokenId: number | BigNumber;
}
export declare class Drip extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
    parseApprovalEvent(receipt: TransactionReceipt): Drip.ApprovalEvent[];
    decodeApprovalEvent(event: Event): Drip.ApprovalEvent;
    parseApprovalForAllEvent(receipt: TransactionReceipt): Drip.ApprovalForAllEvent[];
    decodeApprovalForAllEvent(event: Event): Drip.ApprovalForAllEvent;
    parseAuthorizeEvent(receipt: TransactionReceipt): Drip.AuthorizeEvent[];
    decodeAuthorizeEvent(event: Event): Drip.AuthorizeEvent;
    parseDeauthorizeEvent(receipt: TransactionReceipt): Drip.DeauthorizeEvent[];
    decodeDeauthorizeEvent(event: Event): Drip.DeauthorizeEvent;
    parseDripEvent(receipt: TransactionReceipt): Drip.DripEvent[];
    decodeDripEvent(event: Event): Drip.DripEvent;
    parseLockEvent(receipt: TransactionReceipt): Drip.LockEvent[];
    decodeLockEvent(event: Event): Drip.LockEvent;
    parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Drip.StartOwnershipTransferEvent[];
    decodeStartOwnershipTransferEvent(event: Event): Drip.StartOwnershipTransferEvent;
    parseTransferEvent(receipt: TransactionReceipt): Drip.TransferEvent[];
    decodeTransferEvent(event: Event): Drip.TransferEvent;
    parseTransferOwnershipEvent(receipt: TransactionReceipt): Drip.TransferOwnershipEvent[];
    decodeTransferOwnershipEvent(event: Event): Drip.TransferOwnershipEvent;
    approve: {
        (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IApproveParams, options?: TransactionOptions) => Promise<void>;
    };
    balanceOf: {
        (owner: string, options?: TransactionOptions): Promise<BigNumber>;
    };
    campaignId: {
        (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    };
    claim: {
        (id: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (id: number | BigNumber, options?: TransactionOptions) => Promise<void>;
    };
    claimMultiple: {
        (ids: (number | BigNumber)[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (ids: (number | BigNumber)[], options?: TransactionOptions) => Promise<void>;
    };
    claimedAmount: {
        (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    };
    deny: {
        (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (user: string, options?: TransactionOptions) => Promise<void>;
    };
    endDate: {
        (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    };
    getAllInfo: {
        (owner: string, options?: TransactionOptions): Promise<{
            _tokenId: BigNumber[];
            _token: string[];
            _unclaimedFunds: BigNumber[];
            _claimedAmount: BigNumber[];
            _totalAmount: BigNumber[];
            _startDate: BigNumber[];
            _endDate: BigNumber[];
            _campaignId: BigNumber[];
            _ownerFrozen: boolean[];
        }>;
    };
    getApproved: {
        (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
    };
    getInfo: {
        (id: number | BigNumber, options?: TransactionOptions): Promise<{
            _recipient: string;
            _token: string;
            _unclaimedFunds: BigNumber;
            _claimedAmount: BigNumber;
            _totalAmount: BigNumber;
            _startDate: BigNumber;
            _endDate: BigNumber;
            _campaignId: BigNumber;
            _ownerFrozen: boolean;
        }>;
    };
    isApprovedForAll: {
        (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
    };
    isPermitted: {
        (param1: string, options?: TransactionOptions): Promise<BigNumber>;
    };
    lock: {
        (params: ILockParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ILockParams, options?: TransactionOptions) => Promise<BigNumber>;
    };
    lockMultiple: {
        (params: ILockMultipleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ILockMultipleParams, options?: TransactionOptions) => Promise<BigNumber[]>;
    };
    maximumAllowedClaimedFunds: {
        (id: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    };
    name: {
        (options?: TransactionOptions): Promise<string>;
    };
    newOwner: {
        (options?: TransactionOptions): Promise<string>;
    };
    owner: {
        (options?: TransactionOptions): Promise<string>;
    };
    ownerFrozen: {
        (param1: number | BigNumber, options?: TransactionOptions): Promise<boolean>;
    };
    ownerOf: {
        (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
    };
    permit: {
        (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (user: string, options?: TransactionOptions) => Promise<void>;
    };
    safeTransferFrom: {
        (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
    };
    safeTransferFrom_1: {
        (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<void>;
    };
    setApprovalForAll: {
        (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
    };
    startDate: {
        (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    };
    supportsInterface: {
        (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
    };
    symbol: {
        (options?: TransactionOptions): Promise<string>;
    };
    takeOwnership: {
        (options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: TransactionOptions) => Promise<void>;
    };
    timelockCount: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    token: {
        (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
    };
    tokenByIndex: {
        (index: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    };
    tokenOfOwnerByIndex: {
        (params: ITokenOfOwnerByIndexParams, options?: TransactionOptions): Promise<BigNumber>;
    };
    tokenURI: {
        (tokenId: number | BigNumber, options?: TransactionOptions): Promise<string>;
    };
    totalAmount: {
        (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    };
    totalSupply: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    transferFrom: {
        (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<void>;
    };
    transferOwnership: {
        (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
    };
    private assign;
}
export declare module Drip {
    interface ApprovalEvent {
        owner: string;
        approved: string;
        tokenId: BigNumber;
        _event: Event;
    }
    interface ApprovalForAllEvent {
        owner: string;
        operator: string;
        approved: boolean;
        _event: Event;
    }
    interface AuthorizeEvent {
        user: string;
        _event: Event;
    }
    interface DeauthorizeEvent {
        user: string;
        _event: Event;
    }
    interface DripEvent {
        id: BigNumber;
        amount: BigNumber;
        totalClaimed: BigNumber;
        totalAmount: BigNumber;
        _event: Event;
    }
    interface LockEvent {
        id: BigNumber;
        recipient: string;
        token: string;
        amount: BigNumber;
        startDate: BigNumber;
        endDate: BigNumber;
        campaignId: BigNumber;
        ownerFrozen: boolean;
        _event: Event;
    }
    interface StartOwnershipTransferEvent {
        user: string;
        _event: Event;
    }
    interface TransferEvent {
        from: string;
        to: string;
        tokenId: BigNumber;
        _event: Event;
    }
    interface TransferOwnershipEvent {
        user: string;
        _event: Event;
    }
}
