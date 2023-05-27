import React from 'react'
import '../CSS/Messages.css'
const Messages = ({ user, message, classs, time }) => {
    
        if (user) {
        return (
            <div className={`messageBox ${classs}`}>
                <p className="username">{user}</p>
                <p>
                {message}
                </p>
                <p className="username time">{time}</p>
            </div>
        )
    }
    else {
        return (
            <div className={`messageBox ${classs}`}>
                <p className="username">You</p>
                <p>
                {message}
                </p>
                <p className="username time">&nbsp;{time}</p>
            </div>
        )
    }
}

export default Messages
