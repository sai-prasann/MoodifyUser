const userModel = require("../models/userModel")
const blacklistModel = require("../models/blacklistModel")
const redis = require("../config/cache")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function registerController(req, res) {
    const { userName, email, password } = req.body

    const userAlreadyExists = await userModel.findOne({
        $or: [
            { userName },
            { email }
        ]
    })

    if (userAlreadyExists) {
        return res.status(401).json({
            message: "user already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        userName,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        userName: user.userName,
        email:user.email
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user is registered successfully",
        user
    })

}

async function loginController(req, res) {
    const { userName, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { userName },
            { email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const hash = await bcrypt.compare(password, user.password)

    if (!hash) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        userName: user.userName,
        email: user.email
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User logged in successfully",
    })


}

async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)

    if (!user) {
        return res.status(404).json({
            message: "user doesn't exists"
        })
    }

    res.status(200).json({
        message: "user details",
        user
    })
}

async function logoutController(req, res){
    const token = req.cookies.jwt_token

    res.clearCookie("jwt_token", token)

    await redis.set(token,Date.now().toString())

    res.status(200).json({
        message:"user logged out successfully"
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}