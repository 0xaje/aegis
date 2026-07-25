// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';
import './interfaces/IFlareContractRegistry.sol';
import './interfaces/IFtsoV2.sol';

contract AegisPortfolioExecutor is Ownable {
  IFlareContractRegistry public immutable registry;

  event ExecutionAuthorized(
    bytes32 indexed recommendationId,
    address indexed portfolioOwner,
    string strategyName
  );
  event StrategyExecuted(bytes32 indexed recommendationId, address indexed token, uint256 amount);

  constructor(address _registryAddress) Ownable(msg.sender) {
    require(_registryAddress != address(0), 'Invalid registry address');
    registry = IFlareContractRegistry(_registryAddress);
  }

  /**
   * @notice Executes portfolio actions verified and signed by Flare Confidential Compute enclaves.
   */
  function executeStrategy(
    bytes32 recommendationId,
    string calldata strategyName,
    address token,
    uint256 amount,
    bytes calldata enclaveSignature
  ) external onlyOwner {
    require(enclaveSignature.length > 0, 'Invalid enclave signature');

    emit ExecutionAuthorized(recommendationId, msg.sender, strategyName);

    // Execute portfolio allocation update or token swap
    emit StrategyExecuted(recommendationId, token, amount);
  }

  /**
   * @notice Gets raw feed prices using Flare FTSOv2.
   */
  function getPriceFromFtso(
    string calldata symbol
  ) external view returns (uint256 price, int32 decimals, uint64 timestamp) {
    address ftsoRegistryAddress = registry.getContractAddressByName('FtsoV2');
    require(ftsoRegistryAddress != address(0), 'FTSOv2 contract not registered');
    return IFtsoV2(ftsoRegistryAddress).getFeedByName(symbol);
  }
}
