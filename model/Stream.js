const mongoose = require("mongoose");
//User Schema
const StreamSchema = new mongoose.Schema({
  streamName: {
    type: String,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  source: {
    type: String,
    default: "youtube",
  },
  url: {
    type: String,
  },
  video: {
    type: String,
  },
});

const Stream = mongoose.model("stream", StreamSchema);

module.exports = Stream;
