import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Pusher from 'pusher-js'

function App() {

  useEffect(() => {
    console.log('fire')
    const pusher = new Pusher('d7374f71e545a295d4f4', {
      cluster: 'ap1'
    })
    const channel = pusher.subscribe('messages')
    channel.bind('inserted', function(data) {
      alert(JSON.stringify(data))
    })
  }, [])

  

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
