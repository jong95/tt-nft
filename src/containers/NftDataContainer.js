import React from 'react';
import { connect } from 'react-redux';
import NftView from '../components/NftView';
import { getNftData } from '../modules/NftData';

const NftDataContainer = ({ getNftData, contractAddress, tokenId }) => {
  return (
    <NftView
      getNftData={getNftData}
      contractAddress={contractAddress}
      tokenId={tokenId}
    />
  );
};

export default connect(
  (state) => ({
    contractAddress: state.nftData.contractAddress,
    tokenId: state.nftData.tokenId,
  }),
  {
    getNftData,
  },
)(NftDataContainer);
