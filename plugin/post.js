const crypto = require('crypto');
const request = require('request');

const blockId = crypto.randomBytes(20).toString('hex');
const botToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQjFQQUUyRURWIiwicmVmZXJlbmNlVXNlciI6IlU5OEpWQVVCSSIsImdyb3VwIjoiRzBDVVdJUkNSRyIsImlhdCI6MTY0Nzg0MzcyM30.lowtsVN36jKCsZ5i3HT1kJrAWewllSpJGzZswtKFhRo';
const botId = 'B1PAE2EDV';
const forumId = 'QZM66A00L';
const moimDomain = 'https://vingle.network';
const tokenId = 10;

const options = {
  uri: `${moimDomain}/api/forums/${forumId}/threads`,
  method: 'POST',
  body: {
    thread: {
      title: `TTNFT #${tokenId}`,
      content: [
        {
          type: 'text',
          content: `TTNFT Metadata #${tokenId}`,
          subType: 'h1',
          color: '#b1b1b1',
        },
        {
          type: 'reference',
          botId,
          blockId,
          replaceId: 'options',
          params: {
            tokenId,
          },
        },
      ],
    },
  },
  json: true,
  headers: {
    authorization: `Bearer ${botToken}`,
  },
};

request.post(options, function (err, response, body) {
  console.log('err: ', err);
  console.log('response: ', response);
  console.log('body: ', body);
});
