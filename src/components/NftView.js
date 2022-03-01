import { providers, getDefaultProvider } from 'ethers';
import { NftProvider } from 'use-nft';
import NftShow from './NftShow';
import Mint from './Mint';

const ethersConfig = {
  // provider: getDefaultProvider('rinkeby', {
  //   alchemy: 'aPaDbb6ZM5j14sr3tKo4m4B3VlCCeN4u',
  // }),

  provider: new providers.AlchemyProvider(
    'matic',
    'aPaDbb6ZM5j14sr3tKo4m4B3VlCCeN4u',
  ),
};

const NftView = ({
  getNftData,
  onChangeContractAddressInput,
  onChangeTokenIdInput,
  contractAddress,
  tokenId,
  NftContractAddress,
  NftTokenId,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    getNftData(e.target[0].value, e.target[1].value);
  };

  const onChangeContractAddress = (e) =>
    onChangeContractAddressInput(e.target.value);
  const onChangeTokenId = (e) => onChangeTokenIdInput(e.target.value);

  // console.log('build Nft component');
  // console.log('NftContractAddress: ', NftContractAddress);
  // console.log('NftTokenId: ', NftTokenId);

  return (
    <NftProvider fetcher={['ethers', ethersConfig]}>
      <div>
        <form onSubmit={onSubmit}>
          <h3>Nft Smart Contract Address</h3>
          <h6>
            Sample NFT Contract (on Matic Network) : <br />
            0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90
          </h6>
          <input
            style={{ width: '350px' }}
            value={contractAddress}
            onChange={onChangeContractAddress}
          />
          <br />
          <h3>Nft Token ID</h3>
          <input
            style={{ width: '50px' }}
            value={tokenId}
            onChange={onChangeTokenId}
          />
          <br />
          <button type="submit">View</button>
        </form>
      </div>
      <Mint />
      <NftShow contractAddress={NftContractAddress} tokenId={NftTokenId} />
    </NftProvider>
  );
};

export default NftView;
