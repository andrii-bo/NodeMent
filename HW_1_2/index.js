const in_file = process.argv[3];
const result_file = process.argv[4];
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
