// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.14;

import "forge-std/console.sol";
import "forge-std/Script.sol";
import "../src/UniswapV3Pool.sol";
import "../src/UniswapV3Manager.sol";
import "../src/UniswapV3Quoter.sol";
import "../test/ERC20Mintable.sol";

contract DeployDevelopment is Script {
    function run() public {
        uint256 wethBalance = 10 ether;
        uint256 usdcBalance = 100000 ether;
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
// '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47','0xDA0bab807633f07f013f94DD0E6A4F96F8742B53','5602277097478614198912276234240','85176'
        UniswapV3Manager manager = new UniswapV3Manager();
        UniswapV3Quoter quoter = new UniswapV3Quoter();

        token0.mint(msg.sender, wethBalance);
        token1.mint(msg.sender, usdcBalance);

        vm.stopBroadcast();

        console.log("WETH address", address(token0));
        console.log("USDC address", address(token1));
        console.log("Pool address", address(pool));
        console.log("Manager address", address(manager));
        console.log("Quoter address", address(quoter));
    }
}
