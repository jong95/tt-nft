const { ethers } = require('ethers');
const { task } = require('hardhat/config');
const { getContract } = require('./helpers');
const fetch = require('node-fetch');

task('mint', 'Mints from the NFT contract')
  .addParam('address', 'The address to receive a token')
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract('NFT', hre);
    const transactionResponse = await contract.mintTo(taskArguments.address, {
      // value: ethers.utils.parseEther("0.001"),
      gasPrice: hre.ethers.utils.parseUnits('50', 'gwei'),
      // gasLimit: 500_000,
    });
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  });

// ex: https://thirsteez-data.s3.ap-northeast-2.amazonaws.com/metadata/json/1
task(
  'set-base-token-uri',
  'Sets the base token URI for the deployed smart contract',
)
  .addParam('baseUrl', 'The base of the tokenURI endpoint to set')
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract('NFT', hre);
    const transactionResponse = await contract.setBaseTokenURI(
      taskArguments.baseUrl,
      {
        gasPrice: hre.ethers.utils.parseUnits('50', 'gwei'),
        // gasLimit: 500_000,
      },
    );
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  });

task(
  'get-base-token-uri',
  'Get the base token URI for the deployed smart contract',
).setAction(async function (taskArguments, hre) {
  const contract = await getContract('NFT', hre);
  const response = await contract.getBaseTokenURI({});
  console.log(`base token URL: ${response}`);
});

task('token-uri', 'Fetches the token metadata for the given token ID')
  .addParam('tokenId', 'The tokenID to fetch metadata for')
  .setAction(async function (taskArguments, hre) {
    const contract = await getContract('NFT', hre);
    const response = await contract.tokenURI(taskArguments.tokenId, {
      // gasPrice: hre.ethers.utils.parseUnits('50', 'gwei'),
      // gasLimit: 500_000,
    });

    const metadata_url = response;
    console.log(`Metadata URL: ${metadata_url}`);

    const res = await fetch(metadata_url);
    const metadata = await res.json();
    console.log(
      `Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`,
    );
  });
