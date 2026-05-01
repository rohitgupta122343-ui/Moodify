import React, { useState } from 'react'
import '../style/authStyle.scss'
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

const Login = () => {

    const { loading , handleLogin } = useAuth()

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate()

    async function submitHandler(e){
        e.preventDefault()
       await handleLogin({email,password})

        navigate('/')
    }

  return (
    <main>
        <div className="form-container">
                <h1>Login</h1>
            <form onSubmit={submitHandler}>
               
                <FormGroup value={email} onChange={(e)=>{setemail(e.target.value)}} label="Email" placeholder="Enter a email "/>
                <FormGroup value={password} onChange={(e)=>{setpassword(e.target.value)}} label="Password" placeholder="Enter a password"/>
                <button className='button'>Login</button>
            </form>
            <p>You have Don't Account <Link to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
