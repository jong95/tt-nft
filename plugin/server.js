const alchemy = require('@alch/alchemy-web3');
const express = require('express');
const app = express();

app.get('/ttnft/:id', (req, res) => {
  console.log(
    'fetching metadata for a crypto coven NFT token id: ',
    req.params.id,
  );
  const tokenId = parseInt(req.params.id);
  const contractAddress = '0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90';

  // Using HTTPS
  const web3 = alchemy.createAlchemyWeb3(
    'https://polygon-mainnet.g.alchemy.com/v2/5HELYofdzUhXvcGCDJdFzpmZNU0uV04n',
  );

  // Fetch metadata for a particular NFT:
  console.log('fetching metadata for a crypto coven NFT...');

  // Normal case response.

  // 	{
  //   contract: { address: '0x6a544c126ffde8e4e9cbf1a4dfd0883c0639eb90' },
  //   id: { tokenId: '1', tokenMetadata: { tokenType: 'ERC721' } },
  //   title: '#1 NFT',
  //   description: 'NFT description',
  //   tokenUri: {
  //     raw: 'https://thirsteez-data.s3.ap-northeast-2.amazonaws.com/metadata/json/1',
  //     gateway: 'https://thirsteez-data.s3.ap-northeast-2.amazonaws.com/metadata/json/1'
  //   },
  //   media: [
  //     {
  //       raw: 'https://thirsteez-data.s3.ap-northeast-2.amazonaws.com/metadata/image/1.jpg',
  //       gateway: 'https://thirsteez-data.s3.ap-northeast-2.amazonaws.com/metadata/image/1.jpg'
  //     }
  //   ],
  //   metadata: {
  //     name: '#1 NFT',
  //     description: 'NFT description',
  //     image: 'https://thirsteez-data.s3.ap-northeast-2.amazonaws.com/metadata/image/1.jpg',
  //     attributes: [ [Object] ]
  //   },
  //   timeLastUpdated: '2022-03-21T07:42:23.195Z'
  // }

  // Error case response.

  // {
  //   contract: { address: '0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90' },
  //   id: { tokenId: '10', tokenMetadata: { tokenType: 'ERC721' } },
  //   title: '',
  //   description: '',
  //   tokenUri: { raw: 'Unable to get token URI', gateway: '' },
  //   media: [ { raw: '', gateway: '' } ],
  //   metadata: {},
  //   timeLastUpdated: '',
  //   error: 'Token does not exist'
  // }
  web3.alchemy
    .getNftMetadata({
      contractAddress: contractAddress,
      tokenId: tokenId,
    })
    .then((response) => {
      let block;

      if (response.error === undefined) {
        console.log('Found tokenId for NFT');

        block = [
          {
            type: 'text',
            content: 'content',
          },
          {
            type: 'image',
            src: response.metadata.image,
          },
        ];
      } else {
        console.log('No tokenId for NFT');

        block = {
          type: 'text',
          content: 'Token does not exist',
        };
      }
      console.log(response);
      res.send(block);
    });
});

app.listen(3000, () => console.log('Listening on port 3000...'));
