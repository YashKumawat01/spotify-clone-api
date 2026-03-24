const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");

// Here only artist can create/upload music

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "File is required" });
  }

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url, // ✅ FIXED
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music Created Successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });

  // ------------------------------
}

// Here Is album of artist containg all his songs

async function createAlbum(req, res) {
  const { title, music } = req.body;
  const album = await albumModel.create({
    title,
    artist: req.user.id,
    music: music,
  });

  res.status(201).json({
    message: "Album Created Succesully",
    album: {
      id: album.id,
      title: album.title,
      artist: album.artist,
      music: album.music,
    },
  });
}

// Here a user can listen all musics

async function getAllMusics(req, res) {
  const musics = await musicModel.find().populate("artist", "username email");
  res.status(200).json({
    message: "Music Fetched Successfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");

  res.status(200).json({
    message: "All Albums",
    albums: albums,
  });
}

async function getAllAlbumById(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel.findById(albumId).populate("artist","username email").populate("music")
  
  return res.status(200).json({
    message:"Album fetched Succesfuly",
    album:album
  })
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAllAlbumById,
};
