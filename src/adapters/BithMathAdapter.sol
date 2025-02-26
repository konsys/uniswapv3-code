// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.14;
import "../lib/BitMath.sol";

contract BithMathAdapter {
    function mostSignificantBit(uint256 masked) external pure returns (uint8) {
        return BitMath.mostSignificantBit(masked);
    }

    function leastSignificantBit(uint256 masked) external pure returns (uint8) {
        return BitMath.leastSignificantBit(masked);
    }
}
