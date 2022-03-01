import React from 'react';
import { useNft } from 'use-nft';
import Mint from './Mint';

const NftShow = ({ contractAddress, tokenId }) => {
  console.log('contractAddress: ', contractAddress);
  console.log('tokenId: ', tokenId);

  const { loading, error, nft } = useNft(contractAddress, tokenId);

  if (!tokenId) return <>Set token Id</>;

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

  const attributes = nft.rawData['attributes'];

  return (
    <section>
      <h1>{nft.name}</h1>
      <img src={nft.image} alt="" />
      <p>{nft.description}</p>
      <p>Owner: {nft.owner}</p>
      <p>Metadata URL: {nft.metadataUrl}</p>
      <p>Attributes</p>
      {attributes.map((attribute) =>
        Object.keys(attribute).map((key, i) => (
          <p key={i}>
            <span>
              {key} : {attribute[key]}
            </span>
          </p>
        )),
      )}
    </section>
  );
};

export default React.memo(NftShow);
