
import { login,register,getme,logout } from "../services/authServices";
import { AuthContext } from "../AuthContext";
import { useContext, useEffect } from "react";

export function useAuth(){

    const context = useContext(AuthContext)

const {user,setuser,loading,setloading} = context




const handleRegister = async({username,email,password})=>{
        setloading(true)
       const data = await register({username,email,password})
       setuser(data.user)
       setloading(false)
    }

const handleLogin = async({username,email,password})=>{

        setloading(true)
        const data = await login({username,email,password})
        setuser(data.user)
        setloading(false)
    }

const handleGetme = async()=>{
        setloading(true)
       const data = await getme()
       setuser(data.user)
       setloading(false)
    }

const handleLogout = async()=>{
        setloading(true)
        const data = await logout()
        setuser(null)
        setloading(false)
    }

    useEffect(()=>{
    handleGetme()
},[])

    return ({
        user,loading,handleLogin,handleRegister,handleLogout,handleGetme
    })

}

