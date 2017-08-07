const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Video = require("../models/video");

const db = "mongodb://localhost:27017/videos";
mongoose.Promise = global.Promise;

mongoose.connect(db, { useMongoClient: true }, (err) => {
  if (err) { console.log("Error! " + err); }
});

router.get("/videos", (req, res) => {
  Video.find((err, videos) => {
    if (err) {
      res.send(500, err);
    } else {
      res.status(200).json(videos);
    }
  });
});

router.get("/videos/:id", (req, res) => {
  Video.findById(req.params.id, (err, video) => {
    if (err) {
      res.send(404, err);
    } else {
      res.status(200).json(video);
    }
  });
});

module.exports = router;
