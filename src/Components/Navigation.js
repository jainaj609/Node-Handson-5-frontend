import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Chat from './Chat'


const Navigation = () => {
    return (
        <div>
                <Routes>
                    <Route exact path='/' element={<Login/>} />
                    <Route exact path='/chat' Component={Chat} />
                </Routes>
        </div>
    )
}

export default Navigation
