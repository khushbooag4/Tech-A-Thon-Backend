const express = require("express");
const fs = require("fs");
const Stream = require("./model/Stream");
const Query = require("./model/Query");
const connect = require("./config/db");
const app = express();
const port = 3000;

//Mongodb connection
connect();

app.get("/", (req, res) => res.send("Hello World!"));

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

app.listen(port, () => console.log(`App listening on port ${port}!`));
