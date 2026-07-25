// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IFlareContractRegistry {
  function getContractAddressByName(string calldata name) external view returns (address);
  function getContractAddressByHash(bytes32 nameHash) external view returns (address);
}
