import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import io from 'socket.io-client'
import '../CSS/Login.css'
// const socket = io('http://localhost:4000')
const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const btnClick = (e) => {
        if (!name) {
            e.preventDefault()
        }
       else{
        navigate("/chat", {state: name})
        setName('')
       }
    }
    return (
        <div className='JoinPage'>
            <div className='JoinContainer'>
                <img src='https://t4.ftcdn.net/jpg/04/17/26/55/360_F_417265589_3icF8VsU9yT6mTWTAeFkGry8JKQdztxt.jpg' alt='logo' />
                <input type='text' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
                <button onClick={btnClick}>Login</button>
            </div>
        </div>
    )
}

export default Login
