/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('./scripts/deploy.js');
require('./scripts/mint.js');
require('@nomiclabs/hardhat-etherscan');

const {
  ALCHEMY_KEY,
  ALCHEMY_KEY_RINKEBY,
  ALCHEMY_KEY_POLYGON,
  ACCOUNT_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
} = process.env;

module.exports = {
  solidity: '0.8.1',
  defaultNetwork: 'matic',
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY_RINKEBY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
    matic: {
      // url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY_POLYGON}`,
      // accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
      url: 'https://polygon-rpc.com',
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    ethereum: {
      chainId: 1,
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // apiKey: ETHERSCAN_API_KEY,
    apiKey: POLYGONSCAN_API_KEY,
  },
};
