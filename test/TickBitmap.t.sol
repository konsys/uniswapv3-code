// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import {Test, stdError} from "forge-std/Test.sol";
import "./ERC20Mintable.sol";
import "../src/lib/TickBitmap.sol";
import "./TestUtils.sol";

contract TickBitmap1 is Test, TestUtils {
    using TickBitmap for mapping(int16 => uint256);

    mapping(int16 => uint256) public tickBitmap;

    function testBitmap() public {
        // assertEq(true, false);
        tickBitmap.flipTick(1321, 1);
        // (int16 wordPos, uint8 bitPos) = tickBitmap.position(1);
        assertEq(tickBitmap[1], 1321);
    }
}
// 5248
