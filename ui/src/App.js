import './App.css';
import SwapForm from './components/SwapForm.js';
import MetaMask from './components/MetaMask.js';
import EventsFeed from './components/EventsFeed.js';
import { MetaMaskProvider } from './contexts/MetaMask';

const config = {
  token0Address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  token1Address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  poolAddress: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0',
  managerAddress: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
  ABIs: {
    'ERC20': require('./abi/ERC20.json'),
    'Pool': require('./abi/Pool.json'),
    'Manager': require('./abi/Manager.json')
  }
};

const App = () => {

  const xSize = 5000;
  const ySize = 1;


  const computeSellX = (deltaX = 10, r = 1) => {
    return (ySize * r * deltaX) / (xSize + r * deltaX)
  }

  const computeBuyX = (deltaY = 10, r = 1) => {
    return (xSize * deltaY) / (r * (ySize - deltaY))
  }


  const priceToTick = (p) => {
    return Math.floor(getBaseLog(p, 1.0001))
  }

  function getBaseLog(x, y) {
    return Math.log(x) / Math.log(y);

  }

  const q96 = 2 ** 96
  function priceToSqrtp(p) {
    return (Math.sqrt(p) * q96)
  }


  function calcP(x, y) {
    return Math.sqrt(x / y)
  }


  function liquidity0(amount, pa, pb) {
    return (amount * (pa * pb) / q96) / (pa > pb ? (pb - pa) : (pa - pb))
  }


  function liquidity1(amount, pa, pb) {

    return amount * q96 / (pa > pb ? (pb - pa) : (pa - pb))
  }


  const sqrtpLow = priceToSqrtp(4545)
  const sqrtpCur = priceToSqrtp(5000)
  const sqrtpUpp = priceToSqrtp(5500)


  const eth = 10 ** 18
  const amountEth = 1 * eth
  const amountUsdc = 5000 * eth

  const liq0 = liquidity0(amountEth, sqrtpCur, sqrtpUpp)
  const liq1 = liquidity1(amountUsdc, sqrtpCur, sqrtpLow)
  const liq = Math.min(liq0, liq1)

  // L= xy
  // P^1/2 = (y/x)^1/2 
  //

  return (
    <MetaMaskProvider>
      <div className="App flex flex-col justify-between items-center w-full h-full">
        <MetaMask />
        computeSell: {computeSellX(10)}<br />
        computeBuy: {computeBuyX(10)}<br />
        priceToTick: {priceToTick(5000)}<br />
        priceToSqrtp4545: {priceToSqrtp(4545)}<br />
        priceToSqrtp5000: {priceToSqrtp(5000)}<br />
        priceToSqrtp5500: {priceToSqrtp(5500)}<br />
        calcP:0 {calcP(5000, 1)}<br />
        liq0: {liq0}<br />
        liq1: {liq1}<br />
        liq: {liq}<br />
        <SwapForm config={config} />
        <footer>
          <EventsFeed config={config} />
        </footer>
      </div>
    </MetaMaskProvider>
  );
}

export default App;
