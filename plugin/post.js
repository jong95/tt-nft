const request = require('request');

const options = {
  uri: 'https://vingle.network/api/forums/QZM66A00L/threads',
  method: 'POST',
  body: {
    thread: {
      title: 'test1',
      content: [
        {
          type: 'text',
          content: 'content',
        },
        {
          type: 'reference',
          botId: 'B1PAE2EDV',
          params: {
            tokenId: 1,
          },
        },
      ],
    },
  },
  json: true,
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQjFQQUUyRURWIiwicmVmZXJlbmNlVXNlciI6IlU5OEpWQVVCSSIsImdyb3VwIjoiRzBDVVdJUkNSRyIsImlhdCI6MTY0Nzg0MzcyM30.lowtsVN36jKCsZ5i3HT1kJrAWewllSpJGzZswtKFhRo',
  },
};

request.post(options, function (err, response, body) {
  console.log('err: ', err);
  console.log('response: ', response);
  console.log('body: ', body);
});
