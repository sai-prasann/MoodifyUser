const mongoose= require("mongoose")

const songSchema= new mongoose.Schema({
    url:{
        type:String,
        required:[true,"url is required"]
    },
    posterUrl:{
        type:String,
        required:[true,"posterUrl is required"]
    },
    tittle:{
        type:String,
        required:[true,"tittle is required"]
    },
    mood:{
        type:String,
        enum:{
            values:['Happy','Sad','Surprised','Angry']
        }
    }
})

const songsModel = mongoose.model("songs",songSchema)

module.exports = songsModel