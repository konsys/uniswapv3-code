// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.14;
import "../lib/Math.sol";

contract MathAdapter {
    function calcAmount0Delta(
        uint160 sqrtPriceAX96,
        uint160 sqrtPriceBX96,
        uint128 liquidity
    ) external pure returns (uint256) {
        return Math.calcAmount0Delta(sqrtPriceAX96, sqrtPriceBX96, liquidity);
    }

    function calcAmount1Delta(
        uint160 sqrtPriceAX96,
        uint160 sqrtPriceBX96,
        uint128 liquidity
    ) external pure returns (uint256) {
        return Math.calcAmount1Delta(sqrtPriceAX96, sqrtPriceBX96, liquidity);
    }

    function getNextSqrtPriceFromInput(
        uint160 sqrtPriceX96,
        uint128 liquidity,
        uint256 amountIn,
        bool zeroForOne
    ) external pure returns (uint160) {
        return
            Math.getNextSqrtPriceFromInput(
                sqrtPriceX96,
                liquidity,
                amountIn,
                zeroForOne
            );
    }

    function getNextSqrtPriceFromAmount0RoundingUp(
        uint160 sqrtPriceX96,
        uint128 liquidity,
        uint256 amountIn
    ) internal pure returns (uint160) {
        return
            Math.getNextSqrtPriceFromAmount0RoundingUp(
                sqrtPriceX96,
                liquidity,
                amountIn
            );
    }

    function getNextSqrtPriceFromAmount1RoundingDown(
        uint160 sqrtPriceX96,
        uint128 liquidity,
        uint256 amountIn
    ) internal pure returns (uint160) {
        return
            Math.getNextSqrtPriceFromAmount1RoundingDown(
                sqrtPriceX96,
                liquidity,
                amountIn
            );
    }

    function mulDivRoundingUp(
        uint256 a,
        uint256 b,
        uint256 denominator
    ) internal pure returns (uint256 result) {
        return Math.mulDivRoundingUp(a, b, denominator);
    }

    function divRoundingUp(
        uint256 numerator,
        uint256 denominator
    ) internal pure returns (uint256 result) {
        return Math.divRoundingUp(numerator, denominator);
    }
}
