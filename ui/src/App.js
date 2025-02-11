import './App.css';
import SwapForm from './components/SwapForm.js';
import MetaMask from './components/MetaMask.js';
import EventsFeed from './components/EventsFeed.js';
import { MetaMaskProvider } from './contexts/MetaMask';

const config = {
  token0Address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  token1Address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  poolAddress: '0x1e011a7Fe24AA92b2623eB6efEE51E640A109236',
  managerAddress: '0x845AE1770Bc28d8468e03BE4b4520564467CcC3E',
  ABIs: {
    'ERC20': require('./abi/ERC20.json'),
    'Pool': require('./abi/Pool.json'),
    'Manager': require('./abi/Manager.json')
  }
};

const App = () => {
  return (
    <MetaMaskProvider>
      <div className="App flex flex-col justify-between items-center w-full h-full">
        <MetaMask />
        <SwapForm config={config} />
        <footer>
          <EventsFeed config={config} />
        </footer>
      </div>
    </MetaMaskProvider>
  );
}

export default App;
