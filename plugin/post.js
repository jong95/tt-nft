const crypto = require('crypto');
const request = require('request');

const blockId = crypto.randomBytes(20).toString('hex');
const botToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQjFQQUUyRURWIiwicmVmZXJlbmNlVXNlciI6IlU5OEpWQVVCSSIsImdyb3VwIjoiRzBDVVdJUkNSRyIsImlhdCI6MTY0Nzg0MzcyM30.lowtsVN36jKCsZ5i3HT1kJrAWewllSpJGzZswtKFhRo';
const tokenId = 10;

const options = {
  uri: 'https://vingle.network/api/forums/QZM66A00L/threads',
  method: 'POST',
  body: {
    thread: {
      title: `reference block test #${tokenId}`,
      content: [
        {
          type: 'text',
          content: 'test ttnft query',
        },
        {
          type: 'reference',
          botId: 'B1PAE2EDV',
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
