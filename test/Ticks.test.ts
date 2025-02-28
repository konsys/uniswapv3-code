import { expect } from 'chai';
import { ContractTransactionResponse } from 'ethers';
import { ethers } from 'hardhat';


describe("TickAdapter math lib", function () {


  it("Should get most significant bit", async function () {

    const TickAdapter = await ethers.getContractFactory("TickAdapter");
    const m = await TickAdapter.deploy().then(v => v.waitForDeployment());

    const res = await m.update(1, 2)

    console.log(11111, res)
    expect({} as ContractTransactionResponse).to.be('')
  });


});
