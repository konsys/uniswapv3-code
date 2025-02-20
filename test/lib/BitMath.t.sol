// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import "forge-std/Test.sol";
import "../../src/lib/BitMath.sol";

contract BitMathTest is Test {
    function testMostSignificantBit() public {
        uint256 amn = BitMath.mostSignificantBit(0x2);
        assertEq(amn, 1);

        amn = BitMath.mostSignificantBit(0x4);
        assertEq(amn, 2);

        amn = BitMath.mostSignificantBit(0x8);
        assertEq(amn, 3);
    }

    function testLessSignificantBit() public {
        uint256 amn = BitMath.leastSignificantBit(0x1);
        console.log("WETH address", (amn));
        assertEq(amn, 0);

        amn = BitMath.leastSignificantBit(0x2);
        console.log("WETH address", (amn));
        assertEq(amn, 1);

        amn = BitMath.leastSignificantBit(0x8);
        console.log("WETH address", (amn));
        assertEq(amn, 3);
    }
}
