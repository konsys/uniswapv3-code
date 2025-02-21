import { expect } from "chai";
import {ethers} from "hardhat";
// import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Lock", function () {
  it("Should set the right unlockTime", async function () {
    const wethBalance = 100000000000000000000n;
    const usdcBalance = 100000000000000000000000n;
    const currentTick = 85176;
    const currentSqrtP = 5602277097478614198912276234240n;


    const ERC20Mintable = await ethers.getContractFactory("ERC20Mintable");
    const token0 = await ERC20Mintable.deploy("Wrapped Ether", "WETH", 18);
    const token1 = await ERC20Mintable.deploy("USD Coin", "USDC", 18);
 
    const UniswapV3Pool = await ethers.getContractFactory("UniswapV3Pool");
    const pool = await UniswapV3Pool.deploy( token0.target.toString(),  token1.target.toString(), currentSqrtP, currentTick);

    const UniswapV3Manager = await ethers.getContractFactory("UniswapV3Manager");
    const manager = await UniswapV3Manager.deploy( );

    const UniswapV3Quoter = await ethers.getContractFactory("UniswapV3Quoter");
    const quoter = await UniswapV3Quoter.deploy( );


   

    await token0.mint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', wethBalance);
    await token1.mint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', usdcBalance);


    const b0 = await token0.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    console.log('b0', b0)

    const b1 = await token1.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    console.log('b1', b1)

    expect(b1).to.equal(21);
  });
}); 