# Execution Client Process

1. npm install

   - install npm packages (in package.json configuration)

2. npx hardhat compile

   - compile contract/NFT.sol
   - src/artifacts/contracts directory (in hardhat.config.js configuration)

3. npx hardhat deploy

   - deploy NFT smart contract to matic network (in scripts/deply.js, use deploy task)
   - after deploy, change NFT_CONTRACT_ADDRESS in .env configuration file

4. npm start (open browser on http://localhost:3000)

# Execution Server(for metadata) Process (If you neeed, instead of using AWS S3 directly)

cd util
node metadata-server.js

# Chrome CORS Extension (If you have CORS error in development)

[CORS Extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=en)

# useNft react hook example (view metadata)

🍮 React hook to fetch metadata from any NFT. [GitHub](https://use-nft.spectre.xyz/)

# MetaMask connect react example

Connecting to MetaMask +React.js + Custom Hook + State Management. [GitHub](https://github.com/blakewood84/react-metamask-medium)

# Mint react example

Building a web3 frontend with React [dev.to](https://dev.to/rounakbanik/building-a-web3-frontend-with-react-340c)
