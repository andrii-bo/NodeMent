let in_file = process.argv[2];
let result_file = process.argv[3];

if (in_file == null) {
  in_file="HW_1_2\\index.js DATA_IN\\node_mentoring_t1_2_input_example.csv";
}

if (result_file == null) {
  result_file="DATA_OUT\\hw_1_2_result.json";
}

const { pipeline } = require("stream");
const fs = require("fs");
const csv = require("csvtojson");

console.log("transform " + in_file + " to " + result_file);

pipeline(
  fs.createReadStream(in_file),
  csv({
    headers: ["book", "author", "Amount", "price"],
    colParser: {
      book: "string",
      author: "string",
      Amount: "omit",
      price: "number"
    },
    trim: true
  }),
  fs.createWriteStream(result_file),
  err => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.log("Pipeline succeeded.");
    }
  }
); 