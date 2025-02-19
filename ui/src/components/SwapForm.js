import './SwapForm.css';
import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { MetaMaskContext } from '../contexts/MetaMask';

const tokens = ["WETH", "USDC"];

const TokensList = (props) => {
  return (
    <select defaultValue={props.selected}>
      {tokens.map((t) => <option key={t}>{t}</option>)}
    </select>
  )
}

const addLiquidity = async (account, { token0, token1, manager }, { managerAddress, poolAddress }) => {

  if (!token0 || !token1) {
    return;
  }

  const amount0 = ethers.utils.parseEther("0.998976618347425280");
  const amount1 = ethers.utils.parseEther("5000"); // 5000 USDC
  const lowerTick = 84222;
  const upperTick = 86129;
  const liquidity = ethers.BigNumber.from("1517882343751509868544");
  const extra = ethers.utils.defaultAbiCoder.encode(
    ["address", "address", "address"],
    [token0.address, token1.address, account]
  );


  Promise.all(
    [
      token0.allowance(account, managerAddress),
      token1.allowance(account, managerAddress)
    ]
  ).then(([allowance0, allowance1]) => {

    return Promise.resolve()
      .then(async () => {
        if (allowance0.lt(amount0)) {
          console.log(5555555, token0)
          console.log(111, amount0.toString(), allowance0.toString(), managerAddress)
          const tx = await token0.approve(managerAddress, amount0)
          console.log(222, tx)
          const ap = await tx.wait()

          return ap
        }
      })
      // .then(() => {
      //   if (allowance1.lt(amount1)) {
      //     return token1.approve(managerAddress, amount1).then(tx => tx.wait())
      //   }
      // })
      // .then(() => {
      //   return manager.mint(poolAddress, lowerTick, upperTick, liquidity, extra)
      //     .then(tx => tx.wait())
      // })
      .then(() => {
        alert('Liquidity added!');
      });
  }).catch((err) => {
    console.error(err);
    alert('Failed!');
  });
}

const swap = async (amountIn, account, { tokenIn, manager, token0, token1 }, { managerAddress, poolAddress }) => {
  const amountInWei = ethers.utils.parseEther(amountIn);
  const extra = ethers.utils.defaultAbiCoder.encode(
    ["address", "address", "address"],
    [token0.address, token1.address, account]
  );


  tokenIn.allowance(account, managerAddress)
    .then((allowance) => {


      if (allowance.lt(amountInWei)) {
        return tokenIn.approve(managerAddress, amountInWei).then(tx => tx.wait())
      }
    })
    .then(() => {
      return manager.swap(poolAddress, extra).then(tx => tx.wait())
    })
    .then(() => {
      alert('Swap succeeded!');
    }).catch((err) => {
      console.error(err);
      alert('Failed!');
    });
}

const SwapForm = (props) => {
  const metamaskContext = useContext(MetaMaskContext);
  const enabled = metamaskContext.status === 'connected';

  const amount0 = 0.008396714242162444;
  const amount1 = 42;

  const [token0, setToken0] = useState();
  const [token1, setToken1] = useState();
  const [manager, setManager] = useState();

  useEffect(() => {
    setToken0(new ethers.Contract(
      props.config.token0Address,
      props.config.ABIs.ERC20,
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
    ));
    setToken1(new ethers.Contract(
      props.config.token1Address,
      props.config.ABIs.ERC20,
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
    ));
    setManager(new ethers.Contract(
      props.config.managerAddress,
      props.config.ABIs.Manager,
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
    ));
  }, [
    props.config.ABIs.ERC20,
    props.config.ABIs.Manager,
    props.config.managerAddress,
    props.config.token0Address,
    props.config.token1Address
  ]);

  const addLiquidity_ = () => {
    addLiquidity(metamaskContext.account, { token0, token1, manager }, props.config);
  }

  const swap_ = (e) => {

    e.preventDefault();
    swap(amount1.toString(), metamaskContext.account, { tokenIn: token1, manager, token0, token1 }, props.config);
  }

  return (
    <section className="SwapContainer">
      <header>
        <h1>Swap tokens</h1>
        <button disabled={!enabled} onClick={addLiquidity_}>Add liquidity</button>
      </header>
      <form className="SwapForm">
        <fieldset>
          <input type="text" placeholder="0.0" value={amount1} readOnly />
          <TokensList selected="USDC" />
        </fieldset>
        <fieldset>
          <input type="text" placeholder="0.0" value={amount0} readOnly />
          <TokensList selected="WETH" />
        </fieldset>
        <button disabled={!enabled} onClick={swap_}>Swap</button>
      </form>
    </section>
  )
}

export default SwapForm;

