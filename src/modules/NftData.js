const GET_NFT_DATA = 'nftData/GET_NFT_DATA';

export const getNftData = (contractAddress, tokenId) => ({
  type: GET_NFT_DATA,
  contractAddress,
  tokenId,
});

const initialState = {
  contractAddress: '',
  tokenId: '',
};

function nftData(state = initialState, action) {
  switch (action.type) {
    case GET_NFT_DATA:
      console.log('action.contractAddress: ', action.contractAddress);
      console.log('action.tokenId: ', action.tokenId);

      return {
        ...state,
        contractAddress: action.contractAddress,
        tokenId: action.tokenId,
      };

    default:
      return state;
  }
}

export default nftData;
