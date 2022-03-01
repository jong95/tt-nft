const coolImages = require('cool-images');
const downloadHTTP = require('download-http');
const fs = require('fs');

for (var i = 1; i <= 10; i++) {
  const url = coolImages.one(300, 400, false, false);
  const imageFileName = `${i}.jpg`;
  const jsonFileName = `json/${i}`;

  // downloadHTTP(url, imageFileName, function (error) {
  //   if (error) {
  //     throw error;
  //   }
  // });

  // create a JSON object
  // ex: {"name":"sloppy-steve","description":"A drawing of sloppy steve","image":"ipfs://YOUR_ASSET_CID","attributes":[{"beard":"","rarity":0.5}]}
  const metadata = {
    name: `#${i} NFT`,
    description: 'NFT description',
    image: `https://thirsteez-data.s3.ap-northeast-2.amazonaws.com/metadata/image/${i}.jpg`,
    attributes: [
      {
        number: i,
        rarity: 0.5,
      },
    ],
  };

  // convert JSON object to string
  const data = JSON.stringify(metadata, null, 4);

  // write JSON string to a file
  fs.writeFile(jsonFileName, data, (err) => {
    if (err) {
      throw err;
    }
  });

  console.log('Call to generate #', i);
}
