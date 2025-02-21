import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version:"0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks:{
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // See its defaults
    }
  }
};

export default config;
