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
    streamId: id
  }).then((data) => {
    console.log(data);
    res.status(200).send(data);
  });
});



app.post("/streams", async (req, res) => {
  const stream = new Stream({
    streamName: "Web Development with JavaScript",
    isLive: true,
    thumbnail:
      "https://moralis.io/wp-content/uploads/2021/07/Moralis-Blogpost-JavaScript-Explained-07272021-V12.png",
    source: "vimeo",
  });

  await stream
    .save()
    .then(() => {
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/test", (req, res) => {
  console.log("running....");
  res.send("Test Api");
});

app.get("/video", (req, res) => {
  const range = req.headers.range;
  const videoPath = "./GraphQL.mp4";
  const videoSize = fs.statSync(videoPath).size;

  const chunkSize = 1 * 1e6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  console.log(headers);
  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
});

app.listen(process.env.PORT || port, () =>
  console.log(`App listening on port ${port}!`)
);
