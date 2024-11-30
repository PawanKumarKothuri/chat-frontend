import React, { useState, useEffect } from 'react';

function Chat({ socket, username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = () => {
    if (message) {
      socket.emit('message', { username, text: message });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
