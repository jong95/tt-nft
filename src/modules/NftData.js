const GET_NFT_DATA = 'nftData/GET_NFT_DATA';
const CHANGE_CONTRACT_ADDRESS = 'nftData/CHANGE_CONTRACT_ADDRESS';
const CHANGE_TOKEN_ID = 'nftData/CHANGE_TOKEN_ID';

export const getNftData = (contractAddress, tokenId) => ({
  type: GET_NFT_DATA,
  contractAddress,
  tokenId,
});
export const changeContractAddress = (contractAddress) => ({
  type: CHANGE_CONTRACT_ADDRESS,
  contractAddress,
});
export const changeTokenId = (tokenId) => ({
  type: CHANGE_TOKEN_ID,
  tokenId,
});

const initialState = {
  contractAddress: '',
  tokenId: '',
  NftContractAddress: '',
  NftTokenId: '',
};

function nftData(state = initialState, action) {
  switch (action.type) {
    case GET_NFT_DATA:
      console.log('action.contractAddress: ', action.contractAddress);
      console.log('action.tokenId: ', action.tokenId);

      return {
        ...state,
        NftContractAddress: action.contractAddress,
        NftTokenId: action.tokenId,
      };

    case CHANGE_CONTRACT_ADDRESS:
      return {
        ...state,
        contractAddress: action.contractAddress,
      };

    case CHANGE_TOKEN_ID:
      return {
        ...state,
        tokenId: action.tokenId,
      };

    default:
      return state;
  }
}

export default nftData;
