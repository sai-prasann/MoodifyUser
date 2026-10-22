const userModel = require("../models/userModel")
const blacklistModel = require("../models/blacklistModel")
const redis = require("../config/cache")
const jwt = require("jsonwebtoken")


async function userVerification(req, res, next) {
    const token = req.cookies.jwt_token

    if (!token) {
        return res.status(401).json({
            message: "Token is required"
        })
    }

    const isTokenBlackListed = await redis.get(token)

    if(isTokenBlackListed){
        return res.status(401).json({
            message:"token is blacklisted"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        return next()
    } catch (err) {
        return res.status(401).json({
            message:"Invalid token or token expired"
        })
    }
}

module.exports = userVerification