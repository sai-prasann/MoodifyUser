const songsModel = require("../models/songModel")
const storageService =require("../services/storage.service")
const id3 = require("node-id3")

async function uploadSongs(req,res){

    const songBuffer = req.file.buffer
    const {mood}=req.body

    const tags = id3.read(songBuffer)

    const songFile = await storageService.uploadFile({
        buffer: songBuffer,
        filename: tags.title + ".mp3",
        folder:"/moodify/songs"
    })

    const posterFile =await storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: tags.title + ".jpeg",
        folder:"/moodify/poster"
    })

    const song = await songsModel.create({
        tittle:tags.title,
        url: songFile.url,
        posterUrl:posterFile.url,
        mood
    })

    res.status(201).json({
        message:"song created successfully",
        song
    })
}

async function getSong(req,res){
    const {mood} = req.query

    const songs = await songsModel.find({mood})

    res.status(200).json({
        message:"songs fetched successfully",
        songs
    })
}

module.exports={
    uploadSongs,
    getSong
}