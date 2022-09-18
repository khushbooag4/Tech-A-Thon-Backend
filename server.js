const express = require("express");
const fs = require("fs");
const Stream = require("./model/Stream");
const Query = require("./model/Query");
const connect = require("./config/db");
const path = require("path");
const app = express();
const port = 3000;

//Mongodb connection
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  console.log("running....");
  res.send("Hello World");
});

app.get("/streams", async (req, res) => {
  const user = await Stream.find().then((data) => {
    console.log(data);
    res.status(200).send(data);
  });
});

app.get("/streams/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Stream.find({
    streamId: id,
  }).then((data) => {
    console.log(data);
    res.status(200).send(data);
  });
});

app.post("/streams", async (req, res) => {
  const stream = new Stream(req.body);

  await stream
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/test", (req, res) => {
  console.log("running....");
  res.send("Test Api");
});


app.listen(process.env.PORT || port, () =>
  console.log(`App listening on port ${port}!`)
);
