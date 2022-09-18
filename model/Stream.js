const mongoose = require("mongoose");
//User Schema
const StreamSchema = new mongoose.Schema({
  streamId: {
    type: Number,
    required: true,
  },
  streamName: {
    type: String,
  },
  isVimeo: {
    type: Boolean,
    default: false,
  },
  isYoutube: {
    type: Boolean,
    default: false,
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
  thumbnail: {
    type: String,
  },
  title: {
    type: String,
  },
});

const Stream = mongoose.model("stream", StreamSchema);

module.exports = Stream;
