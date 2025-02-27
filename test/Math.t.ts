import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MathAdapter } from '../typechain-types';
import { ContractTransactionResponse } from 'ethers';


function dec2bin(dec: number) {
  return (dec >>> 0).toString(2);
}

describe("Bith math lib", function () {
  let bm: MathAdapter & {
    deploymentTransaction(): ContractTransactionResponse;
  };
  const sPriceLow = '5341294542274603406682713227264'
  const sPriceUpper = '5875717789736564987741329162240'
  const sPriceCurrent = '5602277097478614198912276234240'
  const priceNext = '5604469350942327889444743441197';
  const l = '1517882343751509868544'
  const priceDiffLiq = '2192253463713690532467206957'
  this.beforeAll(async () => {
    const MathAdapter = await ethers.getContractFactory("MathAdapter");
    bm = await MathAdapter.deploy().then(v => v.waitForDeployment());

  })

  it("Should getNextSqrtPriceFromInput", async function () {


    const t = await bm.getNextSqrtPriceFromInput(sPriceCurrent,
      l, '42000000000000000000', false
    )
    expect(t).to.equal(priceNext);
  });

  it("Should mulDivRoundingUp", async function () {
    const t = await bm.mulDivRoundingUp(4000,
      10, 6
    )
    expect(t).to.equal(6667);
  });

  it("Should divRoundingUp", async function () {
    const t = await bm.divRoundingUp(4578,
      26
    )
    expect(t).to.equal(177);
  });

  it("Should calcAmount0Delta", async function () {
    // selling 42 USDC
    const t = await bm.calcAmount0Delta(sPriceCurrent, priceNext,
      l
    )
    // getting 0.008396714242162445 ETH
    expect(t).to.equal(8396714242162445);

  });

  it("Should calcAmount0Delta", async function () {
    // selling 42 USDC
    const t = await bm.calcAmount1Delta(sPriceCurrent, priceNext,
      l
    )
    // getting 0.008396714242162445 ETH
    expect(t).to.equal('42000000000000000000');

  });

});
