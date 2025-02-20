// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import "forge-std/Test.sol";
import "../../src/lib/Position.sol";

contract PositionTest is Test {
    using Position for mapping(bytes32 => Position.Info);
    using Position for Position.Info;
    mapping(bytes32 => Position.Info) public positions;

    address owner1 = 0x6d2e03b7EfFEae98BD302A9F836D0d6Ab0002766;
    address owner2 = 0xe688b84b23f322a994A53dbF8E15FA82CDB71127;
    int24 lowerTick = 85420;
    int24 upperTick = 85420;
    uint128 amount = 1 ether;

    function testPositionGet() public {
        Position.Info storage position1 = positions.get(
            owner1,
            lowerTick,
            upperTick
        );
        Position.Info storage position2 = positions.get(
            owner2,
            lowerTick,
            upperTick
        );
        assertEq(position1.liquidity, 0);
        assertEq(position2.liquidity, 0);
        position1.update(1);
        assertEq(position1.liquidity, 1);
        assertEq(position2.liquidity, 0);
        position1.update(3);
        assertEq(position1.liquidity, 4);
        assertEq(position2.liquidity, 0);
        position2.update(5);
        assertEq(position1.liquidity, 4);
        assertEq(position2.liquidity, 5);
    }
}
