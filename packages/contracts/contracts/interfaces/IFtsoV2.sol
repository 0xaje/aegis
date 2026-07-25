// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IFtsoV2 {
  function getFeedByName(
    string calldata name
  ) external view returns (uint256 value, int32 decimals, uint64 timestamp);
}
