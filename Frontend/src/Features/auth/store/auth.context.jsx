import { createContext, useState } from "react";
import { register, login } from "../services/auth.api";

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleRegister = async (userName, email, password) => {
        setLoading(true)

        try {
            const response = await register(userName, email, password)
            setUser(response.user)

            return response
        } catch (err) {
            console.log(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLogin =async (identifier, password)=>{
        setLoading(true)

        try{
            const response =await login(identifier, password)
            setUser(response.user)
            return response
        }catch(err){
            console.log(err)
            throw err
        }finally{
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{handleRegister,user,setUser, loading, setLoading,handleLogin}}>
            {children}
        </AuthContext.Provider>
    )
}