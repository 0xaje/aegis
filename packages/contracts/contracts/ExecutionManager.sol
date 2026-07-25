// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/**
 * @title ExecutionManager
 * @notice Manages approvals, execution triggers, and status tracking for strategy updates.
 */
contract ExecutionManager {
  enum ExecutionState {
    Pending,
    Approved,
    Executed,
    Cancelled
  }

  struct Execution {
    bytes32 strategyId;
    address executor;
    uint256 timestamp;
    ExecutionState state;
  }

  mapping(bytes32 => Execution) public executions;
  bytes32[] public executionIds;

  event ExecutionTriggered(bytes32 indexed strategyId, address indexed executor, uint256 timestamp);
  event ExecutionStateChanged(bytes32 indexed strategyId, ExecutionState state);

  /**
   * @notice Initiates a pending execution state for a strategy ID.
   */
  function triggerExecution(bytes32 _strategyId) external {
    require(executions[_strategyId].strategyId == bytes32(0), 'Execution already triggered');

    executions[_strategyId] = Execution({
      strategyId: _strategyId,
      executor: msg.sender,
      timestamp: block.timestamp,
      state: ExecutionState.Pending
    });
    executionIds.push(_strategyId);

    emit ExecutionTriggered(_strategyId, msg.sender, block.timestamp);
  }

  /**
   * @notice Modifies the current execution state (e.g. Approved, Executed, Cancelled).
   */
  function updateExecutionState(bytes32 _strategyId, ExecutionState _state) external {
    require(executions[_strategyId].strategyId != bytes32(0), 'Execution not found');
    executions[_strategyId].state = _state;

    emit ExecutionStateChanged(_strategyId, _state);
  }

  /**
   * @notice Returns the total count of strategy execution events.
   */
  function getExecutionCount() external view returns (uint256) {
    return executionIds.length;
  }
}
