const alchemy = require('@alch/alchemy-web3');
const express = require('express');
const app = express();

const botId = 'B1PAE2EDV';
const contractAddress = '0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/home', (req, res) => {
  console.log('call /home');
  console.log('req.body: ', req.body);

  const block = {
    data: {
      blocks: [
        {
          type: 'text',
          subType: 'caption',
          color: '#b1b1b1',
          content: 'HOME',
        },
      ],
    },
  };

  res.send(block);
});

app.post('/action', (req, res) => {
  const actionId = req.body.actionId;
  const blockId = req.body.data.blockId;
  const tokenId = req.body.data.params.tokenId;

  console.log('call /action');
  console.log('actionId: ', actionId);
  console.log('blockId: ', blockId);
  console.log('tokenId: ', tokenId);
  const url = 'http://localhost:3000/?tokenId=1';

  const block = {
    data: [
      {
        actionType: 'new-window',
        actionData: {
          url: `http://localhost:3000/?tokenId=${tokenId}&blockId=${blockId}&actionId=${actionId}`,
        },
      },
    ],
  };

  res.send(block);
});

app.post('/replace', (req, res) => {
  const replaceId = req.body.replaceId;
  const blockId = req.body.data[0].blockId;
  const tokenId = parseInt(req.body.data[0].params.tokenId);

  console.log('replaceId: ', replaceId);
  console.log('blockId: ', blockId);
  console.log('tokenId: ', tokenId);

  const web3 = alchemy.createAlchemyWeb3(
    'https://polygon-mainnet.g.alchemy.com/v2/5HELYofdzUhXvcGCDJdFzpmZNU0uV04n',
  );

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
      let block = [];

      if (response.error === undefined) {
        console.log('Found tokenId for NFT');
        const name = response.metadata.name;
        const description = response.metadata.description;
        const image = response.metadata.image;
        // TODO: Show attributes.
        response.metadata.attributes.map((attribute) => {
          console.log('attribute: ', attribute);
        });

        block = {
          data: [
            {
              actionType: 'replace',
              actionData: [
                {
                  blockId,
                  blocks: [
                    {
                      type: 'text',
                      subType: 'h1',
                      color: '#b1b1b1',
                      content: name,
                      botId: 'B1PAE2EDV',
                    },
                    {
                      type: 'text',
                      subType: 'h2',
                      color: '#b1b1b1',
                      content: description,
                      botId: 'B1PAE2EDV',
                    },
                    {
                      type: 'image',
                      src: image,
                    },
                  ],
                  botId: 'B1PAE2EDV',
                },
              ],
            },
          ],
        };
      } else {
        console.log('No tokenId for NFT');

        block = {
          data: [
            {
              actionType: 'replace',
              actionData: [
                {
                  blockId,
                  blocks: [
                    {
                      type: 'text',
                      subType: 'h1',
                      color: '#b1b1b1',
                      content: 'Token does not exists',
                      botId,
                    },
                    {
                      actionId: 'mintNFT',
                      botId,
                      element: {
                        type: 'flat',
                        size: 'medium',
                        style: 'primary',
                        content: 'Mint',
                        status: 'enabled',
                      },
                      params: {
                        tokenId,
                      },
                      content: 'Mint NFT',
                      type: 'button',
                    },
                  ],
                  botId,
                },
              ],
            },
          ],
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
