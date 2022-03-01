import React from 'react';
import { useNft } from 'use-nft';
import Mint from './Mint';

const NftShow = ({ contractAddress, tokenId }) => {
  console.log('contractAddress: ', contractAddress);
  console.log('tokenId: ', tokenId);

  const { loading, error, nft } = useNft(contractAddress, tokenId);

  // nft.loading is true during load.
  if (loading) return <>Loading…</>;

  // nft.error is an Error instance in case of error.
  // console.log('error: ', error);
  // console.log('nft: ', nft);
  if (error || !nft) {
    return (
      <>
        <h3>Not yet minted.</h3>
        <Mint />
      </>
    );
  }

  // You can now display the NFT metadata.
  return (
    <section>
      <h1>{nft.name}</h1>
      <img src={nft.image} alt="" />
      <p>{nft.description}</p>
      <p>Owner: {nft.owner}</p>
      <p>Metadata URL: {nft.metadataUrl}</p>
    </section>
  );
};

export default React.memo(NftShow);
