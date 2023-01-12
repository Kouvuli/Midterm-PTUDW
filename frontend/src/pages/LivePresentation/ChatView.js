import { Button } from 'antd'
import { useEffect, useState } from 'react'
import './ChatView.css'
import io from 'socket.io-client'

const socket = io.connect('https://socket-io-server.onrender.com/')

const renderMessage = ({ username, message }) => {
  return (
    <div className="chat-message-container">
      <p className="chat-user">{username}</p>
      <p className="chat-message">{message}</p>
    </div>
  )
}

const ChatView = ({ showChat, roomId, messages, role, user }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    socket.emit('send_message', {
      data: { username: user.username, message: inputValue },
      room: roomId,
      message: 'chat',
    })
    setInputValue('')
  }

  if (!showChat) {
    return <></>
  }
  return (
    <div className="chat-view">
      <div className="chat-header">Chat</div>
      <div className="chat-body">
        {messages.map((message) => {
          return renderMessage(message)
        })}
      </div>
      <div className="chat-action">
        <div className="input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            type="primary"
            className="chat-send-btn"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatView
