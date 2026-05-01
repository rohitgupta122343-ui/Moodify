import axios from "axios";

const api = axios.create({
    baseURL : "https://moodify-1-r8eq.onrender.com/",
    withCredentials : true
})

export async function getSong({ mood }){

    const res = await api.get('/api/songs?mood='+mood)
    
    
    return res.data
}