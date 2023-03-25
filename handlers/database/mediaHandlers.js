"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/medialist");

//SCHEMA
const mediaSchema = new mongoose.Schema({
  apiID: String,
  title: String,
  poster_path: String,
  description: String,
  media_type: String,
  providers: [String],
  complete: { type: Boolean, default: false },
});
//MODEL
const mediaModel = mongoose.model("media", mediaSchema);

//HOME
function homeHandler(req, res) {
  res.send("homepage");
}
//GET ALL
async function mediaListHandler(req, res) {
  try {
    let mediaList = await mediaModel.find({});
    res.json(mediaList);
  } catch (error) {
    console.error(`Error retrieving media from db: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
}

//ADD
async function mediaAddHandler(req, res) {
  try {
    console.log(req.body);
    const apiID = req.body.apiID;
    const title = req.body.title;
    const poster_path = req.body.poster_path;
    const description = req.body.description;
    const media_type = req.body.media_type;
    const providers = req.body.providers;

    let newMedia = await mediaModel.create({
      apiID,
      title,
      poster_path,
      description,
      media_type,
      providers,
    });
    newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    console.error(`Error adding media to db: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
}

//DELETE
async function mediaDeleteHandler(req, res) {
  try {
    const media = await mediaModel.findByIdAndDelete(req.params.id);

    res.json(media);
  } catch (error) {
    console.error(`Error deleting media from db: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
}

//COMPLETE
async function mediaCompleteHandler(req, res) {
  try {
    const media = await mediaModel.findById(req.params.id);
    media.complete = !media.complete;
    media.save();
    res.json(media);
  } catch (error) {
    console.error(`Error marking media as complete in db: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  homeHandler,
  mediaListHandler,
  mediaAddHandler,
  mediaDeleteHandler,
  mediaCompleteHandler,
};
