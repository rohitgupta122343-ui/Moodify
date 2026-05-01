import React, { useState } from 'react'
import '../style/authStyle.scss'
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const {loading,handleRegister} = useAuth()

  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const navigate = useNavigate()

  async function submitHandler(e){
    e.preventDefault()

    

    await handleRegister({username,email,password})

    navigate('/login')
    
  }


  return (
    <main>
        <div className="form-container">
            <h1>Regsiter</h1>
            <form onSubmit={submitHandler}>
                <FormGroup value={username} onChange={(e)=>{setusername(e.target.value)}} label = 'username' placeholder='Enter username'/>
                <FormGroup value={email}    onChange={(e)=>{setemail(e.target.value)}} label = 'Email' placeholder='Enter Email' />
                <FormGroup value={password} onChange={(e)=>{setpassword(e.target.value)}} label = 'Password' placeholder='Enter Password' />

                <button className='button'>Register</button>
            </form>
            <p>You Have Already Account <Link to='/login'>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
