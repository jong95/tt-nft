// const createAlchemyWeb3 = require('@alch/alchemy-web3');
const alchemy = require('@alch/alchemy-web3');

// Using HTTPS
const web3 = alchemy.createAlchemyWeb3(
  'https://polygon-mainnet.g.alchemy.com/v2/5HELYofdzUhXvcGCDJdFzpmZNU0uV04n',
);

// Fetch metadata for a particular NFT:
console.log('fetching metadata for a crypto coven NFT...');
// const response = await web3.alchemy.getNftMetadata({
web3.alchemy
  .getNftMetadata({
    contractAddress: '0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90',
    tokenId: '1',
  })
  .then((response) => {
    if (response.error === undefined) {
      console.log('Found tokenId for NFT');
    } else {
      console.log('No tokenId for NFT');
    }
    console.log(response);
  });
