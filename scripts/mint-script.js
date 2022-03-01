const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("NFT");  
  const URI = "ipfs://QmZu6UUBHo2bHLiRMZCoQf6hiSmnFVVzWqyEAyF9SJwxhx"
  const WALLET_ADDRESS = "0x1e60Cf7B8fB0B7EaD221CF8D0e7d19c863FfbE40"
  const CONTRACT_ADDRESS = "0xb20c2De42592a128f9dE581E0a42A04290Ba5c83"
  const contract = NFT.attach(CONTRACT_ADDRESS);

  const transactionResponse = await contract.mintTo(WALLET_ADDRESS);
  console.log("NFT minted transaction hash:", transactionResponse.hash);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
