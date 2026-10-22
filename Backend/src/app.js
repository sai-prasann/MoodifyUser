const express = require("express")
const cookieParser = require("cookie-parser")
const cors =require("cors")

const authRoute = require("./routes/authRoutes")
const songsRoute= require("./routes/songsRoutes")


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/songs",songsRoute)


module.exports = app