# Execution Client Process

1. npm install

   - install npm packages (in package.json configuration)

2. write .env file

- see hardhat.config.fs file
- see process.env array
  - ALCHEMY_KEY
  - ALCHEMY_KEY_RINKEBY
  - ALCHEMY_KEY_POLYGON
  - ACCOUNT_PRIVATE_KEY
  - ETHERSCAN_API_KEY
  - POLYGONSCAN_API_KEY

3. npx hardhat compile

   - compile contract/NFT.sol
   - src/artifacts/contracts directory (in hardhat.config.js configuration)

4. npx hardhat deploy

   - deploy NFT smart contract to matic network (in scripts/deply.js, use deploy task)
   - after deploy, change NFT_CONTRACT_ADDRESS in .env configuration file
   - # source .env

5. npm start (open browser on http://localhost:3000)

# Execution Server(for metadata) Process (If you neeed, instead of using AWS S3 directly)

cd util
node metadata-server.js

# useNft react hook example (view metadata)

🍮 React hook to fetch metadata from any NFT. [GitHub](https://use-nft.spectre.xyz/)

# MetaMask connect react example

Connecting to MetaMask +React.js + Custom Hook + State Management. [GitHub](https://github.com/blakewood84/react-metamask-medium)

# Mint react example

Building a web3 frontend with React [dev.to](https://dev.to/rounakbanik/building-a-web3-frontend-with-react-340c)

# AWS S3 console

[S3 console](https://crypto-badge.signin.aws.amazon.com/console)

# Chrome CORS Extension (If you have CORS error in development)

- Set AWS S3 CORS by JSON
- [CORS Extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=en)
