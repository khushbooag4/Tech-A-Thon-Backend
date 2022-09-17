const mongoose = require("mongoose");
//User Schema
const QuerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  query: {
    type: String,
  },
  tags: {
    type: Array,
  },
  answer: {
    type: String,
  },
  freq: {
    type: String,
  },
});

const Query = mongoose.model("query", QuerySchema);

module.exports = Query;
