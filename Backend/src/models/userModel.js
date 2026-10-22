const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        unique: [true,"userName should be unique"],
        required: [true,"userName is required"]
    },
    email:{
        type: String,
        unique: [true,"email should be unique"],
        required: [true,"email is required"]
    },
    password:{
        type: String,
        required:[true,"password is required"],
        select: false
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel