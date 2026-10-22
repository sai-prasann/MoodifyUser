const express = require("express")
const songController = require("../controllers/songController")
const upload = require("../middlewares/songUpload.middleware")

const songsRoute = express.Router()

songsRoute.post("/",upload.single("song"),songController.uploadSongs)

songsRoute.get("/",songController.getSong)

module.exports= songsRoute

