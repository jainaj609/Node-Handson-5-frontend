import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
// import Chat from './Chat'
import TestFile from './TestFile'


const Navigation = () => {
    return (
        <div>
                <Routes>
                    <Route exact path='/' element={<Login/>} />
                    <Route exact path='/chat' Component={TestFile} />
                </Routes>
        </div>
    )
}

export default Navigation
