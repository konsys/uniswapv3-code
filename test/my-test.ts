import { expect } from "chai";
import { ethers } from "hardhat";
import { AbiCoder,MaxInt256 } from "ethers"
// import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Lock", function () {
  it("Should qoute", async function () {
    const wethBalance = 100000000000000000000n;
    const usdcBalance = 100000000000000000000000n;
    const currentTick = 85176;
    const lowerTick = 84222;
    const upperTick = 86129;
    const liqudity = 1.5178823437515099e+21
    const ethAmount = 0.9989766183474252 * (10 ** 18)
    const usdcAmout = 5000 * (10 ** 18)
    const currentSqrtP = 5602277097478614198912276234240n;
    const owner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const liquidity = 1517882343751509868544n;
    const ERC20Mintable = await ethers.getContractFactory("ERC20Mintable");
    const token0 = await ERC20Mintable.deploy("Wrapped Ether", "WETH", 18);
    const token1 = await ERC20Mintable.deploy("USD Coin", "USDC", 18);

    const UniswapV3Pool = await ethers.getContractFactory("UniswapV3Pool");
    const pool = await UniswapV3Pool.deploy(token0.target.toString(), token1.target.toString(), currentSqrtP, currentTick);

    const abiCoder = new AbiCoder()
    const extra = abiCoder.encode(
      ["address", "address", "address"],
      [token0.target, token1.target, owner]
    );

    console.log(11111111111, extra)
    // await pool.mint({
    //   owner,
    //   lowerTick,
    //    upperTick,
    //   amount:liqudity,
    //     data:''
    // })
    const UniswapV3Manager = await ethers.getContractFactory("UniswapV3Manager");
    const manager = await UniswapV3Manager.deploy();

    const UniswapV3Quoter = await ethers.getContractFactory("UniswapV3Quoter");
    const quoter = await UniswapV3Quoter.deploy();

    // const res = await quoter.quote({   pool:'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    //    amountIn:1,
    //    zeroForOne: true})

    await token0.mint(owner, wethBalance);
    await token1.mint(owner, usdcBalance);


    const b0 = await token0.balanceOf(owner)
    const b1 = await token1.balanceOf(owner)

    expect(b0).to.equal(wethBalance);
    expect(b1).to.equal(usdcBalance);

    const r = await token0.approve(manager.target, MaxInt256).then(tx => tx.wait())

    console.log(11111,r)
  });

}); 


// const mint = async (manager, token0, token1, account, managerAddress,poolAddress, amount0, amount1) => {
//   Promise.all(
//     [
//       token0.allowance(account, managerAddress),
//       token1.allowance(account, managerAddress)
//     ]
//   ).then(([allowance0, allowance1]) => {
//     return Promise.resolve()
//       .then(() => {
//         if (allowance0.lt(amount0)) {
//           return token0.approve(managerAddress, MaxInt256).then(tx => tx.wait())
//         }
//       })
//       .then(() => {
//         if (allowance1.lt(amount1)) {
//           return token1.approve(managerAddress, MaxInt256).then(tx => tx.wait())
//         }
//       })
//       .then(() => {
//         return manager.mint(poolAddress, lowerTick, upperTick, liquidity, extra)
//           .then(tx => tx.wait())
//       })
//       .then(() => {
//         alert('Liquidity added!');
//       });
//   }).catch((err) => {
//     console.error(err);
//     alert('Failed!');
//   });
// }