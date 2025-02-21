// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import "forge-std/Test.sol";
import "../../src/lib/SwapMath.sol";

contract SwapMathTest is Test {
    address owner1 = 0x6d2e03b7EfFEae98BD302A9F836D0d6Ab0002766;
    address owner2 = 0xe688b84b23f322a994A53dbF8E15FA82CDB71127;
    int24 lowerTick = 85420;
    int24 upperTick = 85420;
    uint128 amount = 1 ether;
    uint160 sqrtPriceCurrentX96 = 5602277097478614198912276234240;
    uint160 sqrtPriceTargetX96 = 5604469350942327889444743441197;
    uint128 liquidity = 1517882343751509900000;
    uint256 amountRemaining = 42000000000000000;

    function testComputeSwapStep() public {
        uint160 sqrtPriceNextX96;
        uint256 amountIn;
        uint256 amountOut;
        (sqrtPriceNextX96, amountIn, amountOut) = SwapMath.computeSwapStep(
            sqrtPriceCurrentX96,
            sqrtPriceTargetX96,
            liquidity,
            amountRemaining
        );
        assertEq(sqrtPriceNextX96, 0);
    }
}
