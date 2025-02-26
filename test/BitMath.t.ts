import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import waffle, { deployContract } from "ethereum-waffle"
import { ethers } from 'hardhat';


function dec2bin(dec: number) {
  return (dec >>> 0).toString(2);
}

describe("Bith math lib", async function () {
  const MathAdapter = await ethers.getContractFactory("MathAdapter");
  const bm = await MathAdapter.deploy().then(v => v.waitForDeployment());


  it("Should get most significant bit", async function () {

    const res = await bm.calcAmount0Delta(1, 1, 1)
    console.log(1111, res)
  });



});
