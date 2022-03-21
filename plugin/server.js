const alchemy = require('@alch/alchemy-web3');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.body.data: ', req.body.data);
  console.log('req.body.data[0]: ', req.body.data[0]);
  console.log('req.body.data[0].params: ', req.body.data[0].params);
  console.log(
    'req.body.data[0].params.tokenId: ',
    req.body.data[0].params.tokenId,
  );
  const tokenId = parseInt(req.body.data.params.tokenId);
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
      contractAddress,
      tokenId,
    })
    .then((response) => {
      let block;

      if (response.error === undefined) {
        console.log('Found tokenId for NFT');
        block = {
          data: [
            {
              actionType: 'replace',
              actionData: [
                {
                  blockId: 'UG9sbDpnRktXdGtpR3Q3eFBzZVE3OVlpRW4=',
                  blocks: [
                    {
                      type: 'text',
                      subType: 'caption',
                      color: '#b1b1b1',
                      content: 'NFT content',
                      botId: 'B1PAE2EDV',
                    },
                    {
                      type: 'image',
                      src: response.metadata.image,
                    },
                  ],
                  botId: 'B1PAE2EDV',
                },
              ],
            },
          ],
        };

        // block = [
        //   {
        //     type: 'text',
        //     content: 'content',
        //   },
        //   {
        //     type: 'image',
        //     src: response.metadata.image,
        //   },
        // ];
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

app.listen(process.env.PORT || 3000, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    process.env.PORT,
    app.settings.env,
  );
});
