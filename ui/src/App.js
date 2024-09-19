import './App.css';
import SwapForm from './components/SwapForm.js';
import MetaMaskConnector from './components/MetaMaskConnector.js';
import EventsFeed from './components/EventsFeed.js';
import { MetaMaskProvider } from './contexts/MetaMask';

const App = () => {

  return (
    <MetaMaskProvider>
      <div className="App flex flex-col justify-between items-center w-full h-full">
        <MetaMaskConnector />
        <SwapForm />
        <footer>
          <EventsFeed />
        </footer>
      </div>
    </MetaMaskProvider>
  );
}

export default App;
