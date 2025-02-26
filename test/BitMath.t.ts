import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import waffle, { deployContract } from "ethereum-waffle"
import { ethers } from 'hardhat';


function dec2bin(dec: number) {
  return (dec >>> 0).toString(2);
}

describe("Bith math lib", function () {


  it("Should get most significant bit", async function () {

    const BithMathAdapter = await ethers.getContractFactory("BithMathAdapter");
    const bm = await BithMathAdapter.deploy().then(v => v.waitForDeployment());

    let r = await bm.mostSignificantBit(0x2)
    expect(r).to.equal(1);

    r = await bm.mostSignificantBit(0x4);
    expect(r).to.equal(2);

    r = await bm.mostSignificantBit(0x8);
    expect(r).to.equal(3);

    r = await bm.mostSignificantBit(0x10);
    expect(r).to.equal(4);

    let x = 100
    x >>= 2;
    expect(x).to.equal(25)

    let bin = dec2bin(100)
    expect(bin).to.equal('1100100')
    expect(parseInt('11001', 2)).to.equal(25)
    r = await bm.mostSignificantBit(0x12);
    expect(r).to.equal(4);
  });

  it("Should get less significant bit", async function () {

    const BithMathAdapter = await ethers.getContractFactory("BithMathAdapter");
    const bm = await BithMathAdapter.deploy().then(v => v.waitForDeployment());

    let r = await bm.leastSignificantBit(0x1)
    expect(r).to.equal(0);

    r = await bm.leastSignificantBit(0x2);
    expect(r).to.equal(1);

    r = await bm.leastSignificantBit(0x4);
    expect(r).to.equal(2);

    r = await bm.leastSignificantBit(0x8);
    expect(r).to.equal(3);

    r = await bm.leastSignificantBit(0x16);
    expect(r).to.equal(1);

  });

});
