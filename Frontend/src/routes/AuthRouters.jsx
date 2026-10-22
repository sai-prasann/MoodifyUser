import { Routes, Route } from "react-router-dom"
import Register from '../Features/auth/pages/Register'
import Login from '../Features/auth/pages/Login'
import Emotion from "../Features/FaceTracker/Pages/Emotion"
import Home from '../Features/home/pages/Home'

const AuthRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/face-tracker" element={<Emotion />}></Route>
        </Routes>
    )
}

export default AuthRouters
