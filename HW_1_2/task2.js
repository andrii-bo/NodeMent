const { pipeline } = require('stream');
const fs = require('fs');
const csv=require('csvtojson');

pipeline(
  fs.createReadStream('node_mentoring_t1_2_input_example.csv'),
  csv(),  
  fs.createWriteStream('result.json'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);