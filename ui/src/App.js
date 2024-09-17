import './App.css';
import SwapForm from './components/SwapForm.js';
import MetaMask from './components/MetaMask.js';
import EventsFeed from './components/EventsFeed.js';
import { MetaMaskProvider } from './contexts/MetaMask';

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
        <SwapForm />
        <footer>
          <EventsFeed />
        </footer>
      </div>
    </MetaMaskProvider>
  );
}

export default App;
