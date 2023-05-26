import React, { useEffect, useState } from 'react'
import '../CSS/Chat.css'
import { AiOutlineSend } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';

import { useLocation } from 'react-router-dom';

import socketio from 'socket.io-client'
import Messages from './Messages';
const socket = socketio('http://localhost:4000', { transports: ['websocket'] });

const Chat = () => {
    const [id, setId] = useState()
    const [message, setMessage] = useState();
    // const [msg, setMsg] = useState();
    const [messages, setMessages] = useState([]);
    let user = useLocation().state;

    const send = () => {
        console.log('send');
        socket.emit('message', { message, id })
        // setMsg(message)
        setMessage('')

    }

    useEffect(() => {
        console.log("hello");
        setId(socket.id)
        socket.on('connect', () => {
            alert("connected")

            const element = document.querySelector(".chatBox")
            element.scrollTop = element.scrollHeight;
        })

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages([...messages, data])
            console.log('welcome', messages);

            console.log(data.user, data.message);
        })
        socket.on('userjoined', data => {
            setMessages([...messages, data])
            console.log('userjoined', messages);

            console.log(data.user, data.message);
        })
        socket.on('leave', (data) => {
            setMessages([...messages, data])
            console.log('leave', messages);

            console.log(data.user, data.message);
        })
        console.log(messages, id)

        return () => {
            socket.disconnect();
            // socket.off();
        }
    })

    useEffect(() => {
        console.log("hi");

        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message, data.id);
            console.log(messages);
            const element = document.querySelector(".chatBox")
            element.scrollTop = element.scrollHeight;
        })
        return () => {
            socket.off()
        }
    })
    return (
        <div className='ChatPage'>
            <div className='ChatContainer'>
                <div className='header'>
                    <img src={'./download.jpeg'} alt='logo' height={'40px'} />
                    <h1>CHAT <span className='app-text'>APP</span></h1>
                    <a href='/'><MdOutlineClose className='close' /></a>
                </div>
                <div className='chatBox'>
                    {messages.map((item, i) => console.log(item.user, item.messages, item.id, id)
                        // <Messages key={i} user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'} />
                    )}
                </div>
                <div className='inputBox'>
                    <input type='text' id='chatInput' onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={send} className='sendBtn'><AiOutlineSend className='logo' /></button>
                </div>
            </div>


        </div>
    )
}

export default Chat
