import React from 'react'
import "../style/login.scss"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from "react-router-dom"

const Login = () => {

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await handleLogin(
        identifier,
        password
      )

      navigate("/face-tracker")

      console.log("Login successful", response)
    } catch (error) {
      console.log("Login failed", error)
    }
  }

  return (
    <main>
      <div className="login-container">
        <h2>User Login</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <input className='text-area' 
          type="text" 
          placeholder='Enter your userName or email' 
          value={identifier}
          onChange={(e)=>setIdentifier(e.target.value)}
          required/>

          <input className='text-area' 
          type="text" 
          placeholder='Enter password' 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required/>

          <button type="submit"
          onClick={()=> navigate("/face-tracker")}>Login</button>
          <p>Don't have an account? <Link className="auth-link" to="/register">Register</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login
