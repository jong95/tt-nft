import { useEffect, useState } from 'react';
import contract from '../artifacts/contracts/NFT.sol/NFT.json';
import { ethers } from 'ethers';
import { connectAdvanced } from 'react-redux';

const contractAddress = '0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90';
// const contractAddress = process.env['NFT_CONTRACT_ADDRESS'];
const abi = contract.abi;

function Mint() {
  // console.log('contractAddress: ', contractAddress);
  const mintPrice = ethers.utils.parseEther('0.001');
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have Metamask installed!');
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account: ', account);
      setCurrentAccount(account);
    } else {
      console.log('No authorized account found');
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please install Metamask!');
    }

    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Found an account! Address: ', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        const recipient = currentAccount;

        console.log('Initialize payment');
        let nftTxn = await nftContract.mintTo(recipient, {
          value: mintPrice,
        });

        console.log('Minting... please wait');
        await nftTxn.wait();

        console.log(
          // `Minted, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`,
          `Minted, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`,
        );
      } else {
        console.log('Ethereum object does not exist');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="main-app">
      <h1>Mint Nft</h1>
      <div>{currentAccount ? mintNftButton() : connectWalletButton()}</div>
    </div>
  );
}

export default Mint;
