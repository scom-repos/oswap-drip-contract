"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drip = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const Drip_json_1 = __importDefault(require("./Drip.json"));
class Drip extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, Drip_json_1.default.abi, Drip_json_1.default.bytecode);
        this.assign();
    }
    deploy(params, options) {
        return this.__deploy([params.name, params.symbol], options);
    }
    parseApprovalEvent(receipt) {
        return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event) {
        let result = event.data;
        return {
            owner: result.owner,
            approved: result.approved,
            tokenId: new eth_contract_1.BigNumber(result.tokenId),
            _event: event
        };
    }
    parseApprovalForAllEvent(receipt) {
        return this.parseEvents(receipt, "ApprovalForAll").map(e => this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event) {
        let result = event.data;
        return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
            _event: event
        };
    }
    parseAuthorizeEvent(receipt) {
        return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
    }
    decodeAuthorizeEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseDeauthorizeEvent(receipt) {
        return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
    }
    decodeDeauthorizeEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseDripEvent(receipt) {
        return this.parseEvents(receipt, "Drip").map(e => this.decodeDripEvent(e));
    }
    decodeDripEvent(event) {
        let result = event.data;
        return {
            id: new eth_contract_1.BigNumber(result.id),
            amount: new eth_contract_1.BigNumber(result.amount),
            totalClaimed: new eth_contract_1.BigNumber(result.totalClaimed),
            totalAmount: new eth_contract_1.BigNumber(result.totalAmount),
            _event: event
        };
    }
    parseLockEvent(receipt) {
        return this.parseEvents(receipt, "Lock").map(e => this.decodeLockEvent(e));
    }
    decodeLockEvent(event) {
        let result = event.data;
        return {
            id: new eth_contract_1.BigNumber(result.id),
            recipient: result.recipient,
            token: result.token,
            amount: new eth_contract_1.BigNumber(result.amount),
            startDate: new eth_contract_1.BigNumber(result.startDate),
            endDate: new eth_contract_1.BigNumber(result.endDate),
            campaignId: new eth_contract_1.BigNumber(result.campaignId),
            ownerFrozen: result.ownerFrozen,
            _event: event
        };
    }
    parseStartOwnershipTransferEvent(receipt) {
        return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
    }
    decodeStartOwnershipTransferEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseTransferEvent(receipt) {
        return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event) {
        let result = event.data;
        return {
            from: result.from,
            to: result.to,
            tokenId: new eth_contract_1.BigNumber(result.tokenId),
            _event: event
        };
    }
    parseTransferOwnershipEvent(receipt) {
        return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
    }
    decodeTransferOwnershipEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    assign() {
        let balanceOf_call = async (owner, options) => {
            let result = await this.call('balanceOf', [owner], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.balanceOf = balanceOf_call;
        let campaignId_call = async (param1, options) => {
            let result = await this.call('campaignId', [this.wallet.utils.toString(param1)], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.campaignId = campaignId_call;
        let claimedAmount_call = async (param1, options) => {
            let result = await this.call('claimedAmount', [this.wallet.utils.toString(param1)], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.claimedAmount = claimedAmount_call;
        let endDate_call = async (param1, options) => {
            let result = await this.call('endDate', [this.wallet.utils.toString(param1)], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.endDate = endDate_call;
        let getAllInfo_call = async (owner, options) => {
            let result = await this.call('getAllInfo', [owner], options);
            return {
                _tokenId: result._tokenId.map(e => new eth_contract_1.BigNumber(e)),
                _token: result._token,
                _unclaimedFunds: result._unclaimedFunds.map(e => new eth_contract_1.BigNumber(e)),
                _claimedAmount: result._claimedAmount.map(e => new eth_contract_1.BigNumber(e)),
                _totalAmount: result._totalAmount.map(e => new eth_contract_1.BigNumber(e)),
                _startDate: result._startDate.map(e => new eth_contract_1.BigNumber(e)),
                _endDate: result._endDate.map(e => new eth_contract_1.BigNumber(e)),
                _campaignId: result._campaignId.map(e => new eth_contract_1.BigNumber(e)),
                _ownerFrozen: result._ownerFrozen
            };
        };
        this.getAllInfo = getAllInfo_call;
        let getApproved_call = async (tokenId, options) => {
            let result = await this.call('getApproved', [this.wallet.utils.toString(tokenId)], options);
            return result;
        };
        this.getApproved = getApproved_call;
        let getInfo_call = async (id, options) => {
            let result = await this.call('getInfo', [this.wallet.utils.toString(id)], options);
            return {
                _recipient: result._recipient,
                _token: result._token,
                _unclaimedFunds: new eth_contract_1.BigNumber(result._unclaimedFunds),
                _claimedAmount: new eth_contract_1.BigNumber(result._claimedAmount),
                _totalAmount: new eth_contract_1.BigNumber(result._totalAmount),
                _startDate: new eth_contract_1.BigNumber(result._startDate),
                _endDate: new eth_contract_1.BigNumber(result._endDate),
                _campaignId: new eth_contract_1.BigNumber(result._campaignId),
                _ownerFrozen: result._ownerFrozen
            };
        };
        this.getInfo = getInfo_call;
        let isApprovedForAllParams = (params) => [params.owner, params.operator];
        let isApprovedForAll_call = async (params, options) => {
            let result = await this.call('isApprovedForAll', isApprovedForAllParams(params), options);
            return result;
        };
        this.isApprovedForAll = isApprovedForAll_call;
        let isPermitted_call = async (param1, options) => {
            let result = await this.call('isPermitted', [param1], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.isPermitted = isPermitted_call;
        let maximumAllowedClaimedFunds_call = async (id, options) => {
            let result = await this.call('maximumAllowedClaimedFunds', [this.wallet.utils.toString(id)], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.maximumAllowedClaimedFunds = maximumAllowedClaimedFunds_call;
        let name_call = async (options) => {
            let result = await this.call('name', [], options);
            return result;
        };
        this.name = name_call;
        let newOwner_call = async (options) => {
            let result = await this.call('newOwner', [], options);
            return result;
        };
        this.newOwner = newOwner_call;
        let owner_call = async (options) => {
            let result = await this.call('owner', [], options);
            return result;
        };
        this.owner = owner_call;
        let ownerFrozen_call = async (param1, options) => {
            let result = await this.call('ownerFrozen', [this.wallet.utils.toString(param1)], options);
            return result;
        };
        this.ownerFrozen = ownerFrozen_call;
        let ownerOf_call = async (tokenId, options) => {
            let result = await this.call('ownerOf', [this.wallet.utils.toString(tokenId)], options);
            return result;
        };
        this.ownerOf = ownerOf_call;
        let startDate_call = async (param1, options) => {
            let result = await this.call('startDate', [this.wallet.utils.toString(param1)], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.startDate = startDate_call;
        let supportsInterface_call = async (interfaceId, options) => {
            let result = await this.call('supportsInterface', [interfaceId], options);
            return result;
        };
        this.supportsInterface = supportsInterface_call;
        let symbol_call = async (options) => {
            let result = await this.call('symbol', [], options);
            return result;
        };
        this.symbol = symbol_call;
        let timelockCount_call = async (options) => {
            let result = await this.call('timelockCount', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.timelockCount = timelockCount_call;
        let token_call = async (param1, options) => {
            let result = await this.call('token', [this.wallet.utils.toString(param1)], options);
            return result;
        };
        this.token = token_call;
        let tokenByIndex_call = async (index, options) => {
            let result = await this.call('tokenByIndex', [this.wallet.utils.toString(index)], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.tokenByIndex = tokenByIndex_call;
        let tokenOfOwnerByIndexParams = (params) => [params.owner, this.wallet.utils.toString(params.index)];
        let tokenOfOwnerByIndex_call = async (params, options) => {
            let result = await this.call('tokenOfOwnerByIndex', tokenOfOwnerByIndexParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call;
        let tokenURI_call = async (tokenId, options) => {
            let result = await this.call('tokenURI', [this.wallet.utils.toString(tokenId)], options);
            return result;
        };
        this.tokenURI = tokenURI_call;
        let totalAmount_call = async (param1, options) => {
            let result = await this.call('totalAmount', [this.wallet.utils.toString(param1)], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.totalAmount = totalAmount_call;
        let totalSupply_call = async (options) => {
            let result = await this.call('totalSupply', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.totalSupply = totalSupply_call;
        let approveParams = (params) => [params.to, this.wallet.utils.toString(params.tokenId)];
        let approve_send = async (params, options) => {
            let result = await this.send('approve', approveParams(params), options);
            return result;
        };
        let approve_call = async (params, options) => {
            let result = await this.call('approve', approveParams(params), options);
            return;
        };
        this.approve = Object.assign(approve_send, {
            call: approve_call
        });
        let claim_send = async (id, options) => {
            let result = await this.send('claim', [this.wallet.utils.toString(id)], options);
            return result;
        };
        let claim_call = async (id, options) => {
            let result = await this.call('claim', [this.wallet.utils.toString(id)], options);
            return;
        };
        this.claim = Object.assign(claim_send, {
            call: claim_call
        });
        let claimMultiple_send = async (ids, options) => {
            let result = await this.send('claimMultiple', [this.wallet.utils.toString(ids)], options);
            return result;
        };
        let claimMultiple_call = async (ids, options) => {
            let result = await this.call('claimMultiple', [this.wallet.utils.toString(ids)], options);
            return;
        };
        this.claimMultiple = Object.assign(claimMultiple_send, {
            call: claimMultiple_call
        });
        let deny_send = async (user, options) => {
            let result = await this.send('deny', [user], options);
            return result;
        };
        let deny_call = async (user, options) => {
            let result = await this.call('deny', [user], options);
            return;
        };
        this.deny = Object.assign(deny_send, {
            call: deny_call
        });
        let lockParams = (params) => [params.recipient, params.token, this.wallet.utils.toString(params.amount), this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), this.wallet.utils.toString(params.campaignId), params.ownerFrozen];
        let lock_send = async (params, options) => {
            let result = await this.send('lock', lockParams(params), options);
            return result;
        };
        let lock_call = async (params, options) => {
            let result = await this.call('lock', lockParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.lock = Object.assign(lock_send, {
            call: lock_call
        });
        let lockMultipleParams = (params) => [params.recipient, params.token, this.wallet.utils.toString(params.amount), this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), this.wallet.utils.toString(params.campaignId), params.ownerFrozen];
        let lockMultiple_send = async (params, options) => {
            let result = await this.send('lockMultiple', lockMultipleParams(params), options);
            return result;
        };
        let lockMultiple_call = async (params, options) => {
            let result = await this.call('lockMultiple', lockMultipleParams(params), options);
            return result.map(e => new eth_contract_1.BigNumber(e));
        };
        this.lockMultiple = Object.assign(lockMultiple_send, {
            call: lockMultiple_call
        });
        let permit_send = async (user, options) => {
            let result = await this.send('permit', [user], options);
            return result;
        };
        let permit_call = async (user, options) => {
            let result = await this.call('permit', [user], options);
            return;
        };
        this.permit = Object.assign(permit_send, {
            call: permit_call
        });
        let safeTransferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
        let safeTransferFrom_send = async (params, options) => {
            let result = await this.send('safeTransferFrom', safeTransferFromParams(params), options);
            return result;
        };
        let safeTransferFrom_call = async (params, options) => {
            let result = await this.call('safeTransferFrom', safeTransferFromParams(params), options);
            return;
        };
        this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call: safeTransferFrom_call
        });
        let safeTransferFrom_1Params = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId), this.wallet.utils.stringToBytes(params.data)];
        let safeTransferFrom_1_send = async (params, options) => {
            let result = await this.send('safeTransferFrom', safeTransferFrom_1Params(params), options);
            return result;
        };
        let safeTransferFrom_1_call = async (params, options) => {
            let result = await this.call('safeTransferFrom', safeTransferFrom_1Params(params), options);
            return;
        };
        this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call: safeTransferFrom_1_call
        });
        let setApprovalForAllParams = (params) => [params.operator, params.approved];
        let setApprovalForAll_send = async (params, options) => {
            let result = await this.send('setApprovalForAll', setApprovalForAllParams(params), options);
            return result;
        };
        let setApprovalForAll_call = async (params, options) => {
            let result = await this.call('setApprovalForAll', setApprovalForAllParams(params), options);
            return;
        };
        this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call: setApprovalForAll_call
        });
        let takeOwnership_send = async (options) => {
            let result = await this.send('takeOwnership', [], options);
            return result;
        };
        let takeOwnership_call = async (options) => {
            let result = await this.call('takeOwnership', [], options);
            return;
        };
        this.takeOwnership = Object.assign(takeOwnership_send, {
            call: takeOwnership_call
        });
        let transferFromParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.tokenId)];
        let transferFrom_send = async (params, options) => {
            let result = await this.send('transferFrom', transferFromParams(params), options);
            return result;
        };
        let transferFrom_call = async (params, options) => {
            let result = await this.call('transferFrom', transferFromParams(params), options);
            return;
        };
        this.transferFrom = Object.assign(transferFrom_send, {
            call: transferFrom_call
        });
        let transferOwnership_send = async (newOwner, options) => {
            let result = await this.send('transferOwnership', [newOwner], options);
            return result;
        };
        let transferOwnership_call = async (newOwner, options) => {
            let result = await this.call('transferOwnership', [newOwner], options);
            return;
        };
        this.transferOwnership = Object.assign(transferOwnership_send, {
            call: transferOwnership_call
        });
    }
}
exports.Drip = Drip;
Drip._abi = Drip_json_1.default.abi;
