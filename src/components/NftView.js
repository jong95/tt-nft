import { getDefaultProvider } from 'ethers';
import { NftProvider } from 'use-nft';
import NftShow from './NftShow';
import Mint from './Mint';

const ethersConfig = {
  provider: getDefaultProvider('rinkeby', {
    alchemy: 'aPaDbb6ZM5j14sr3tKo4m4B3VlCCeN4u',
  }),
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
          <input
            style={{ width: '500px' }}
            value={contractAddress}
            onChange={onChangeContractAddress}
          />
          <br />
          <h3>Nft Token ID</h3>
          <input value={tokenId} onChange={onChangeTokenId} />
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
