import "hardhat-typechain";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";
import "hardhat-gas-reporter";
dotenv.config({ path: __dirname + "/.env" });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500000,
      }
    }/*,
    compilers: [
      {
        version: "0.8.10"
      }
    ]*/
  },
  //defaultNetwork: "cantomain",
  networks: {
    dev: {
      url: "http://localhost:7545",
      gasPrice: 20,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 10
      },
      saveDeployments: true
    },
    cantomain: {
      url: "https://jsonrpc.canto.nodestake.top/",
      chainId: 7700,
      //accounts: [process.env.PRIV_KEY],  
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 10
      },
    },
    bsctest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545",
      accounts: [process.env.PRIV_KEY],
      gasPrice: 10000000000,
      blockGasLimit: 1000000
    },
    solanartest: {
      url: "https://api.testnet.solana.com",
      accounts: [process.env.PRIV_KEY],
      gasPrice: 10000000000,
      blockGasLimit: 10000000
    },
    polygontest: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIV_KEY],
      gasPrice: 10000000000,
      blockGasLimit: 10000000
    },
    main: {
      url: "https://bsc-dataseed1.binance.org",
      accounts: [process.env.PRIV_KEY],
      gasPrice: 5100000000,
      blockGasLimit: 1000000
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.ETHERSCAN_API_KEY
    }
  }
};
