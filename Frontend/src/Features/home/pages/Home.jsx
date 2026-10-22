import React from 'react'
import "../style/home.scss"
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className='welcome-page'>
            <h1>MooditfyUser</h1>
            <p>Every Emotion Deserves a Playlist.</p>
            <button onClick={()=>navigate("/login")}>SignUp</button>
        </div>
    )
}

export default Home
