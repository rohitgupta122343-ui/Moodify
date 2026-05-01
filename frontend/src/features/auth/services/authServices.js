
import axios from 'axios'

const api = axios.create({
    baseURL : "https://moodify-1-r8eq.onrender.com/",
    withCredentials : true
})

export async function register({username,email,password}){

    const res = await api.post('/api/auth/register',{
        username,email,password
    })

    return res.data

}

export async function login({email,password,username}){

    const res = await api.post('/api/auth/login',{
        username,email,password
    })

    return res.data
}

export async function logout(){

    const res = await api.get('/api/auth/logout')

    return res.data
}

export async function getme(){
    const res = await api.get('/api/auth/get-me')

    return res.data
}