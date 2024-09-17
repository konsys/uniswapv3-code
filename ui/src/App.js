import './App.css';
import SwapForm from './components/SwapForm.js';
import MetaMask from './components/MetaMask.js';
import EventsFeed from './components/EventsFeed.js';
import { MetaMaskProvider } from './contexts/MetaMask';

const App = () => {




  const sqrtpLow = priceToSqrtp(4545)
  const sqrtpCur = priceToSqrtp(5000)
  const sqrtpUpp = priceToSqrtp(5500)


  const eth = 10 ** 18
  const amountEth = 1 * eth
  const amountUsdc = 5000 * eth

  const liq0 = liquidity0(amountEth, sqrtpCur, sqrtpUpp)
  const liq1 = liquidity1(amountUsdc, sqrtpCur, sqrtpLow)
  const liqOut = Math.min(liq0, liq1)

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
