require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privKey');
const privateKeys = process.env.PRIVATE_KEYS || ""
console.log(privateKeys)
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
        },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 4
    }
  },
  contracts_directory: './src/backEnd/contracts/',
  contracts_build_directory: './src/backEnd/abis/',
  migrations_directory: './src/backEnd/migrations/',
  test_directory: './src/backEnd/test/',
  compilers: {
    solc: {
        optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}