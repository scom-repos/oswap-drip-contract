// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.9;

import "./IDrip.sol";
import "./Authorization.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Drip is IDrip, Authorization, ERC721Enumerable {
    using SafeERC20 for IERC20;

    uint256 public override timelockCount;
    mapping(uint256 => IERC20) public token;
    mapping(uint256 => uint256) public claimedAmount;
    mapping(uint256 => uint256) public totalAmount;
    mapping(uint256 => uint256) public startDate;
    mapping(uint256 => uint256) public endDate;
    mapping(uint256 => uint256) public campaignId;
    mapping(uint256 => bool) public ownerFrozen;
    
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
    }
    
    /// @dev Lock some token up and configure a linear drip from the start date to the end date.
    /// @param _recipient The address that will be able to claim these tokens
    /// @param _amount The amount of tokens that will be locked
    /// @param _startDate When the tokens start being released, does not need to be in the future.
    /// @param _endDate When the last of the tokens will be released.
    /// @param _campaignId The campaign ID.
    function lock(
        address _recipient, 
        IERC20 _token, 
        uint256 _amount, 
        uint256 _startDate, 
        uint256 _endDate, 
        uint256 _campaignId, 
        bool _ownerFrozen
    ) public override auth returns (uint256 lockId) {
        require(_startDate <= _endDate, "Start date cannot be later than end date");
        
        lockId = timelockCount;
        timelockCount += 1;
        
        token[lockId] = _token;
        totalAmount[lockId] = _amount;
        startDate[lockId] = _startDate;
        endDate[lockId] = _endDate;
        campaignId[lockId] = _campaignId;
        ownerFrozen[lockId] = _ownerFrozen;
        
        emit Lock(lockId, _recipient, _token, _amount, _startDate, _endDate, _campaignId, _ownerFrozen);
        
        _token.safeTransferFrom(msg.sender, address(this), _amount);
        _safeMint(_recipient, lockId);
        return lockId;
    }
    function lockMultiple(
        address[] calldata _recipient, 
        IERC20 _token, 
        uint256[] calldata _amount, 
        uint256 _startDate, 
        uint256 _endDate, 
        uint256 _campaignId, 
        bool _ownerFrozen
    ) external override auth returns (uint256[] memory lockId) {
        uint256 length = _recipient.length;
        require(length == _amount.length, "Array length not matched");
        lockId = new uint256[](length);
        for (uint256 i ; i < length ; i++) {
            lockId[i] = lock(_recipient[i], _token, _amount[i], _startDate, _endDate, _campaignId, _ownerFrozen);
        }
    }

    /// @dev Claim from a lockup. The tokens will be sent directly to the recipient.
    /// @param id The ID to claim on.
    function claim(uint256 id) external override {
        doClaim(id);
    }
    
    /// @dev Claim from multiple lockups. The tokens will be sent directly to their recipients.
    /// @param ids The lockups to claim on.
    function claimMultiple(uint256[] memory ids) external override {
        uint256 length = ids.length;
        for (uint256 i = 0; i < length; i++) {
            doClaim(ids[i]);
        }
    }
    function doClaim(uint256 id) internal {
        require(ownerOf(id) == msg.sender, "Cannot claim() on a token belonging to another address!");
        uint256 maxClaimable = maximumAllowedClaimedFunds(id);
        if (maxClaimable == claimedAmount[id])
            return;
        uint256 unclaimed = maxClaimable - claimedAmount[id];
        claimedAmount[id] = maxClaimable;
        emit Drip(id, unclaimed, claimedAmount[id], totalAmount[id]);
        token[id].safeTransfer(msg.sender, unclaimed);
    }
    
    function unclaimedFunds(uint256 id) internal view returns (uint256) {
         return maximumAllowedClaimedFunds(id) - claimedAmount[id];
    }
    function maximumAllowedClaimedFunds(uint256 id) public view override returns (uint256) {
        if (block.timestamp < startDate[id])
            return 0;

        if (endDate[id] == startDate[id])
            return totalAmount[id];

        if (block.timestamp >= endDate[id])
            return totalAmount[id];

        uint256 elapsedTime = block.timestamp - startDate[id];
        uint256 totalTime = endDate[id] - startDate[id];
        return totalAmount[id] * elapsedTime / totalTime;
    }

    function getInfo(uint256 id) external override view returns (address _recipient, IERC20 _token, uint256 _unclaimedFunds, uint256 _claimedAmount, uint256 _totalAmount, uint256 _startDate, uint256 _endDate, uint256 _campaignId, bool _ownerFrozen) {
        _recipient = ownerOf(id);
        _token = token[id];
        _unclaimedFunds = unclaimedFunds(id);
        _claimedAmount = claimedAmount[id];
        _totalAmount = totalAmount[id];
        _startDate = startDate[id];
        _endDate = endDate[id];
        _campaignId = campaignId[id];
        _ownerFrozen = ownerFrozen[id];
    }
    function getAllInfo(address owner) external override view returns (uint256[] memory _tokenId, IERC20[] memory _token, uint256[] memory _unclaimedFunds, uint256[] memory _claimedAmount, uint256[] memory _totalAmount, uint256[] memory _startDate, uint256[] memory _endDate, uint256[] memory _campaignId, bool[] memory _ownerFrozen) {
        uint256 length = ERC721.balanceOf(owner);
        _tokenId = new uint256[](length);
        _token = new IERC20[](length);
        _unclaimedFunds = new uint256[](length);
        _claimedAmount = new uint256[](length);
        _totalAmount = new uint256[](length);
        _startDate = new uint256[](length);
        _endDate = new uint256[](length);
        _campaignId = new uint256[](length);
        _ownerFrozen = new bool[](length);

        for (uint256 i = 0 ; i < length ; i++) {
            uint256 id = tokenOfOwnerByIndex(owner, i);
            _tokenId[i] = id;
            _token[i] = token[id];
            _unclaimedFunds[i] = unclaimedFunds(id);
            _claimedAmount[i] = claimedAmount[id];
            _totalAmount[i] = totalAmount[id];
            _startDate[i] = startDate[id];
            _endDate[i] = endDate[id];
            _campaignId[i] = campaignId[id];
            _ownerFrozen[i] = ownerFrozen[id];
        }
    }

    function _transfer(address from, address to, uint256 tokenId) internal override {
        require(to != from, "Cannot transfer to the same address");
        require(!ownerFrozen[tokenId], "Token owner is frozen!");
        super._transfer(from, to, tokenId);
    }
    function _approve(address to, uint256 tokenId) internal override {
        require(to == address(0) || !ownerFrozen[tokenId], "Token owner is frozen!");
        super._approve(to, tokenId);
    }
}
