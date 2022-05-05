const alchemy = require('@alch/alchemy-web3');
const express = require('express');
const app = express();

const botId = 'B1PAE2EDV';
const contractAddress = '0x6A544c126fFdE8E4e9cBF1A4Dfd0883C0639eb90';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home end point for admin page.
app.post('/home', (req, res) => {
  const block = {
    blocks: [
      {
        type: 'text',
        subType: 'h1',
        color: '#b1b1b1',
        content: 'HOME TEST',
      },
    ],
  };

  res.send(block);
});

// Action end point for button or form.
app.post('/action', (req, res) => {
  const actionId = req.body.actionId;
  const blockId = req.body.data.params.blockId;
  const tokenId = req.body.data.params.tokenId;

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

// Replace end point for reference block.
app.post('/replace', (req, res) => {
  const blockId = req.body.data[0].blockId;
  const tokenId = parseInt(req.body.data[0].params.tokenId);

  const web3 = alchemy.createAlchemyWeb3(
    'https://polygon-mainnet.g.alchemy.com/v2/5HELYofdzUhXvcGCDJdFzpmZNU0uV04n',
  );

  web3.alchemy
    .getNftMetadata({
      contractAddress,
      tokenId,
    })
    .then((response) => {
      let block;
      let attributeBlocks = [];

      if (response.error === undefined) {
        // Found tokenId for NFT.

        const name = response.metadata.name;
        const description = response.metadata.description;
        const image = response.metadata.image;

        response.metadata.attributes.map((attribute) => {
          Object.keys(attribute).map((key) => {
            const content = `${key}: ${attribute[key]}`;

            attributeBlocks.push({
              type: 'text',
              content,
              botId: 'B1PAE2EDV',
              subType: 'h3',
              color: '#000000',
            });
          });
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
                      content: `name: ${name}`,
                      subType: 'h1',
                      color: '#000000',
                      botId,
                    },
                    {
                      type: 'text',
                      content: `description: ${description}`,
                      subType: 'h2',
                      color: '#000000',
                      botId,
                    },
                    {
                      type: 'image',
                      src: image,
                    },
                    {
                      type: 'text',
                      content: 'Attributes',
                      subType: 'h2',
                      color: '#000000',
                      botId,
                    },
                    ...attributeBlocks,
                  ],
                  botId,
                },
              ],
            },
          ],
        };
      } else {
        // No tokenId for NFT.

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
                      content: 'Token has not yet minted',
                      botId,
                      subType: 'h2',
                      color: '#b1b1b1',
                    },
                    {
                      type: 'button',
                      content: 'Mint NFT',
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
                        blockId,
                      },
                    },
                  ],
                  botId,
                },
              ],
            },
          ],
        };
      }

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
