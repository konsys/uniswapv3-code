import { expect } from 'chai';

import { ethers } from 'hardhat';


describe("TickAdapter math lib", function () {


  it("Should set tick", async function () {

    const TickAdapter = await ethers.getContractFactory("TickAdapter");
    const m = await TickAdapter.deploy().then(v => v.waitForDeployment());

    let res = await m.update(86129, '1517882343751509868544')
    expect(res.to).to.equal('0x9A676e781A523b5d0C0e43731313A708CB607508')
    expect(res.from).to.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')

    console.log(res.to)
    res = await m.update(84222, '1517882343751509868544')
    expect(res.to).to.equal('0x9A676e781A523b5d0C0e43731313A708CB607508')
    expect(res.from).to.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')

   console.log(1111,  m.)
  });


});
