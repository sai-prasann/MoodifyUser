import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export async function register(userName, email, password){
    try{
        const response = await api.post('/register',{
            userName,
            email,
            password
        })

        return response.data
    }catch(err){
        throw err
    }
}

export async function login(identifier, password){

    const credentials=identifier.includes("@") ? {email: identifier,password}:{userName: identifier, password}
    try{
        const response = await api.post('/login', credentials)

        return response.data
    }catch(err){
        throw err
    }
}