import { expect } from "chai";
import {ethers} from "hardhat";
// import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Lock", function () {
  it("Should set the right unlockTime", async function () {
    // const lockedAmount = 1_000_000_000;
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // deploy a lock contract where funds can be withdrawn
    // one year in the future
    // const lock = await hre.ethers.deployContract("UniswapV3Manager", [unlockTime], {
    //   value: lockedAmount,
    // });

       const UniswapV3Manager = await ethers.deployContract("UniswapV3Manager");
       console.log(UniswapV3Manager)
    // assert that the value is correct
    expect(1).to.equal(21);
  });
}); 