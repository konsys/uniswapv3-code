// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import "forge-std/console.sol";
import "forge-std/Script.sol";
import "../src/UniswapV3Pool.sol";
import "../src/UniswapV3Manager.sol";
import "../test/ERC20Mintable.sol";

contract DeployDevelopment is Script {
    function run() public {
        uint256 wethBalance = 1 ether;
        uint256 usdcBalance = 5042 ether;
        int24 currentTick = 85176;
        uint160 currentSqrtP = 5602277097478614198912276234240;

        vm.startBroadcast();
        ERC20Mintable token0 = new ERC20Mintable("Wrapped Ether", "WETH", 18);
        ERC20Mintable token1 = new ERC20Mintable("USD Coin", "USDC", 18);

        UniswapV3Pool pool = new UniswapV3Pool(
            address(token0),
            address(token1),
            currentSqrtP,
            currentTick
        );

        UniswapV3Manager manager = new UniswapV3Manager();

        token0.mint(msg.sender, wethBalance);
        token1.mint(msg.sender, usdcBalance);

        vm.stopBroadcast();

        console.log("WETH address", address(token0));
        console.log("USDC address", address(token1));
        console.log("Pool address", address(pool));
        console.log("Manager address", address(manager));
    }
}

//   WETH address 0x0165878A594ca255338adfa4d48449f69242Eb8F
//   USDC address 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
//   Pool address 0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6
//   Manager address 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318

// p qwertyqwerty
