import React from 'react'
import "../style/register.scss"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { handleRegister} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await handleRegister(
                userName,
                email,
                password
            )

            console.log("Registration successful", response)
        } catch (error) {
            console.log("Registration failed", error)
        }
    }

    return (
        <main>
            <div className="register-container">
                <h2>User Register</h2>
                <form className='register-form' onSubmit={handleSubmit}>
                    <input className='text-area' 
                    type="text" 
                    placeholder='Enter your userName' 
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    required/>

                    <input className='text-area' 
                    type="text" 
                    placeholder='Enter your email' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required/>

                    <input className='text-area' 
                    type="text" 
                    placeholder='Enter password' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required/>
                    <button>Register</button>
                    <p>Already have an account? <Link className="login-link" to="/login">Login</Link></p>
                </form>
            </div>
        </main>
    )
}

export default Register
