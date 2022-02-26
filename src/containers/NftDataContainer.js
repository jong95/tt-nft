import React from 'react';
import { connect } from 'react-redux';
import NftView from '../components/NftView';
import {
  getNftData,
  changeContractAddress,
  changeTokenId,
} from '../modules/NftData';

const NftDataContainer = ({
  getNftData,
  changeContractAddress,
  changeTokenId,
  contractAddress,
  tokenId,
  NftContractAddress,
  NftTokenId,
}) => {
  return (
    <NftView
      getNftData={getNftData}
      onChangeContractAddressInput={changeContractAddress}
      onChangeTokenIdInput={changeTokenId}
      contractAddress={contractAddress}
      tokenId={tokenId}
      NftContractAddress={NftContractAddress}
      NftTokenId={NftTokenId}
    />
  );
};

export default connect(
  (state) => ({
    contractAddress: state.nftData.contractAddress,
    tokenId: state.nftData.tokenId,
    NftContractAddress: state.nftData.NftContractAddress,
    NftTokenId: state.nftData.NftTokenId,
  }),
  {
    getNftData,
    changeContractAddress,
    changeTokenId,
  },
)(NftDataContainer);
