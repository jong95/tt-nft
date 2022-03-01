const express = require('express');
const app = express();
const PORT = 3200;
const AWS = require('aws-sdk');
// Our default route
app.get('/:tokenId', (req, res) => {
  AWS.config.update({
    accessKeyId: 'AKIAYHZEM2DQ4VNZXGMW',
    secretAccessKey: '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',
  });
  let s3 = new AWS.S3();
  const tokenId = req.params['tokenId'];

  async function getImage() {
    const data = s3
      .getObject({
        Bucket: 'thirsteez-data',
        Key: 'metadata/image/1.jpg',
      })
      .promise();
    return data;
  }

  async function getJson() {
    const data = s3
      .getObject({
        Bucket: 'thirsteez-data',
        Key: `metadata/json/${tokenId}`,
      })
      .promise();
    return data;
  }

  // getImage()
  getJson()
    .then((json) => {
      const jsonData = json.Body.toString('utf-8');
      console.log('json: ', jsonData);
      res.send(jsonData);
    })
    .catch((e) => {
      res.send(e);
    });

  // res.send(req.params['tokenId']);

  function encode(data) {
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64;
  }
});
app.listen(PORT, () => {
  console.log(`Web Server running on port ${PORT}`);
});
