const { pipeline } = require('stream');
const fs = require('fs');
const csv = require('csvtojson');

pipeline(
  fs.createReadStream('node_mentoring_t1_2_input_example.csv'),
  csv({
    headers: ['book', 'author', 'Amount', 'price'],
    colParser: {
      "book": "string",
      "author": "string",
      "Amount": "omit",
      "price": "number",
    },
    trim: true
  }),
  fs.createWriteStream('result.json'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);