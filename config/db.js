var mongoose = require("mongoose");

function connect() {
  try {
    mongoose.connect(
      "mongodb+srv://khushboo:1234@onair.bb9ktly.mongodb.net/?retryWrites=true&w=majority"
    );

    var db = mongoose.connection;
    db.on("connected", console.error.bind(console, "MongoDB connection done"));
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;
