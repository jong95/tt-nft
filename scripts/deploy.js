const { task } = require('hardhat/config');
const { getAccount } = require('./helpers');

task('check-balance', 'Prints out the balance of your account').setAction(
  async function (taskArguments, hre) {
    const account = getAccount();
    console.log(
      `Account balance for ${account.address}: ${await account.getBalance()}`,
    );
  },
);

task('deploy', 'Deploys the NFT.sol contract').setAction(async function (
  taskArguments,
  hre,
) {
  const nftContractFactory = await hre.ethers.getContractFactory(
    'NFT',
    getAccount(),
  );
  // const nftContractFactory = await hre.ethers.getContractFactory("NFT");
  const nft = await nftContractFactory.deploy({
    gasPrice: hre.ethers.utils.parseUnits('50', 'gwei'),
    // gasLimit: hre.ethers.utils.parseUnits('100', 'gwei'),
  });
  // await nft.deployed();
  console.log(`Contract deployed to address: ${nft.address}`);
});

task('estimateGas', 'Estimate the NFT.sol deploy gas fee').setAction(
  async function (taskArguments, hre) {
    const nftContractFactory = await hre.ethers.getContractFactory(
      'NFT',
      getAccount(),
    );
    const estimatedGas = await hre.ethers.provider.estimateGas(
      nftContractFactory.getDeployTransaction(),
    );

    console.log(`Contract deploy estimatedGas : ${estimatedGas}`);
  },
);
