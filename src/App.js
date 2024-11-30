import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Chat from './components/Chat';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);

  const joinChat = () => {
    if (username) setIsChatActive(true);
  };

  return (
    <div>
      {!isChatActive ? (
        <div>
          <h1>Join Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={joinChat}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}

export default App;
