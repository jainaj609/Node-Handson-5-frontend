import React, { useEffect, useState } from 'react'
import '../CSS/Chat.css'
import { AiOutlineSend } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import Messages from './Messages';
import socketio from 'socket.io-client'
import ReactScrollToBottom from 'react-scroll-to-bottom'
const socket = socketio('http://localhost:4000', { transports: ['websocket'] });

socket.on('connect', () => {
    alert("connected")
})

const Chat = () => {
    const [id, setId] = useState()

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    let user = useLocation().state;

    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    mins = mins < 10 ? "0" + mins : mins;
    let am_pm = 'am';
    if (hours >= 12) {
        hours = hours - 12;
        am_pm = 'pm';
    }
    let time = hours + ':' + mins + ' ' + am_pm

    const send = (e) => {
        e.preventDefault()
        socket.emit('message', { message, id, time })

        setMessage('')
    }

    useEffect(() => {

        setId(socket.id)
        socket.emit('joined', { user, time });
        socket.on('welcome', (data) => {
            setMessages([...messages, data])

        })

        socket.on('leave', (data) => {
            setMessages([...messages, data])
        })

        return () => {

        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])

        })
        socket.on('userjoined', data => {
            setMessages([...messages, data])
        })
    }, [messages])

    return (
        <div className='ChatPage'>
            <div className='ChatContainer'>
                <div className='header'>
                    <img src={'./download.jpeg'} alt='logo' height={'40px'} />
                    <h1>CHAT <span className='app-text'>APP</span></h1>
                    <Link to={'/'}><MdOutlineClose className='close' /></Link>
                </div>
                <ReactScrollToBottom className={'chatBox'}>
                    {messages.map((item, i) =>
                        <Messages key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} time={item.time} />
                    )}
                </ReactScrollToBottom >
                <form onSubmit={send} >
                    <div className='inputBox'>
                        <input type='text' id='chatInput' value={message} onChange={(e) => setMessage(e.target.value)} style={{ color: 'black' }} required />
                        <button type='submit' className='sendBtn'><AiOutlineSend className='logo' /></button>
                    </div>
                </form >
            </div>
        </div>
    )
}

export default Chat
