// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface IDrip is IERC721Enumerable {
    event Lock(uint256 id, address indexed recipient, IERC20 indexed token, uint256 amount, uint256 startDate, uint256 endDate, uint256 campaignId, bool ownerFrozen);
    event Drip(uint256 id, uint256 amount, uint256 totalClaimed, uint256 totalAmount);

    function timelockCount() external view returns (uint256);

    /// @dev Lock some token up and configure a linear drip from the start date to the end date.
    /// @param recipient The address that will be able to claim these tokens
    /// @param amount The amount of tokens that will be locked
    /// @param startDate When the tokens start being released, does not need to be in the future.
    /// @param endDate When the last of the tokens will be released.
    /// @param campaignId The campaign ID.
    function lock(address recipient, IERC20 token, uint256 amount, uint256 startDate, uint256 endDate, uint256 campaignId, bool freezeOwner) external returns (uint256 lockId);
    function lockMultiple(address[] calldata _recipient, IERC20 _token, uint256[] calldata _amount, uint256 _startDate, uint256 _endDate, uint256 _campaignId, bool _ownerFrozen) external returns (uint256[] memory lockId);

    /// @dev Claim from a lockup. The tokens will be sent directly to the recipient.
    /// @param id The ID to claim on.
    function claim(uint256 id) external;

    /// @dev Claim from multiple lockups. The tokens will be sent directly to their recipients.
    /// @param ids The lockups to claim on.
    function claimMultiple(uint256[] memory ids) external;

    function maximumAllowedClaimedFunds(uint256 id) external view returns (uint256);

    /// @dev Get information on a lockup.
    function getInfo(uint256 id) external view returns (address recipient, IERC20 token, uint256 unclaimedFunds, uint256 claimedAmount, uint256 totalAmount, uint256 startDate, uint256 endDate, uint256 campaignId, bool ownerFrozen);
    function getAllInfo(address owner) external view returns (uint256[] memory tokenId, IERC20[] memory token, uint256[] memory unclaimedFunds, uint256[] memory claimedAmount, uint256[] memory totalAmount, uint256[] memory startDate, uint256[] memory endDate, uint256[] memory campaignId, bool[] memory ownerFrozen);
}
