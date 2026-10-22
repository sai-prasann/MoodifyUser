const express = require("express")

const authControllers = require("../controllers/authController")
const userVerification = require("../middlewares/userVerification")

const authRoute = express.Router()


authRoute.post('/register',authControllers.registerController)
authRoute.post('/login',authControllers.loginController)
authRoute.get('/get-me',userVerification,authControllers.getMeController)
authRoute.get('/logout',authControllers.logoutController)

module.exports=authRoute