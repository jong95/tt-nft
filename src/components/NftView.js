import { useState } from 'react';
import { providers, getDefaultProvider } from 'ethers';
import { NftProvider } from 'use-nft';
import NftShow from './NftShow';
import { Container, Col, Row } from 'react-bootstrap';

const ethersConfig = {
  // provider: getDefaultProvider('rinkeby', {
  //   alchemy: 'aPaDbb6ZM5j14sr3tKo4m4B3VlCCeN4u',
  // }),

  provider: new providers.AlchemyProvider('matic'),
};

const NftView = ({ getNftData, contractAddress, tokenId }) => {
  const nftContractAddress = '0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90';

  console.log('nftContractAddress: ', nftContractAddress);
  const tokenIdOptions = [];
  for (let i = 1; i < 11; ++i) tokenIdOptions.push(i);
  const [selectedOption, setSelectedOption] = useState(tokenIdOptions[0].value);

  return (
    <NftProvider fetcher={['ethers', ethersConfig]}>
      <div>
        <Container>
          <Row>
            <Col>
              <h3>Nft Smart Contract Address</h3>
              <h6>
                Sample NFT Contract (on Matic Network) : <br />
                0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90
              </h6>
              <h3>Nft Token ID</h3>
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  getNftData(nftContractAddress, e.target.value);
                }}
              >
                {tokenIdOptions.map((tokenId) => (
                  <option key={tokenId} value={tokenId}>
                    #{tokenId}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <NftShow contractAddress={contractAddress} tokenId={tokenId} />
            </Col>
          </Row>
        </Container>
      </div>
    </NftProvider>
  );
};

export default NftView;
