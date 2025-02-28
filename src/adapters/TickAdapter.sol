// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.14;
import "../lib/Tick.sol";

contract TickAdapter {
    using Tick for mapping(int24 => Tick.Info);
    mapping(int24 => Tick.Info) public ticks;

    function update(int24 tick, uint128 amount) external returns (bool) {
        bool flippedLower = ticks.update(tick, amount);
        return flippedLower;
    }
}
