import React from 'react'
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "../CSS/AppFile.css";
let socket;

function AppFile() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // socket = io("https://node-handson-5.vercel.app");
    socket = io("https://chat-application-v8ky.onrender.com");
    // socket = io("http://localhost:5000");
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendmessage = (e) => {
    e.preventDefault();
    socket.emit("chat", { username, message });
    setMessage("");
  };
  return (
    <div>
      <h1>React chat app</h1>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div className="msg-boxes" key={idx}>
            {msg.username === username ? (
              <div className="msg-box outgoing">
                <p className="username">You</p>
                <p key={idx}>
                  {msg.message}
                </p>
              </div>

            ) : (
              <div className="msg-box incoming">
                <p className="username">{msg.username}</p>
                <p key={idx}>
                  {msg.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={sendmessage}>
          <input
            type="text"
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default AppFile
