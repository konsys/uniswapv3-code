import {loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {expect} from 'chai';
import waffle from "ethereum-waffle"


// const {deployContract} = waffle;
const LibArtifact = require('../artifacts/src/lib/BitMath.sol/BitMath.json');

describe("Lib tests", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployOnceFixture() {
    console.log(111111, waffle)
  //   const [owner, ...otherAccounts] = await ethers.getSigners();
  //   const lib = (await deployContract(owner, LibArtifact));

  //   console.log(111111, lib)
  //   return { lib, owner, otherAccounts };
  return {lib:1}
  }

  describe("Testing test()", function () {
    it("s working testFunc ?", async function () {
      const { lib } = await loadFixture(deployOnceFixture); 
      // expect(await lib.testFunc()).to.be.true;
    });
  });
});