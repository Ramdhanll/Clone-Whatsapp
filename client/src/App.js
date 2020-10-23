import React from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';

function App() {
  return (
    <div className="app">
        <Sidebar />
        <Chat />
    </div>
  );
}

export default App;
