import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Pusher from 'pusher-js'
import axios from './helpers/axios'

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'

function Routing() {

  return (
    <Switch>
      <Route exact path="/">
        <p>jaa</p>
      </Route>
      <Route exact path="/login">
          <Login />
      </Route>
      <Route exact path="/register">
          <Register/>
      </Route>
    </Switch>
  )
}

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/message/sync')
    .then((response) => {
      setMessages(response.data)
    }).catch((err) => {
      alert('failed get messages')
    });
  }, [])
  
  useEffect(() => {
    const pusher = new Pusher('d7374f71e545a295d4f4', {
      cluster: 'ap1'
    })
    const channel = pusher.subscribe('messages')
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    })
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  
  return (
    <div className="app">
      <Router>
        <Routing/>
        <div className="app__body">

        </div>
      </Router>
    </div>
  );
  // return (
  //   <div className="app">
  //     <div className="app__body">
  //       <Sidebar />
  //       <Chat messages={messages} />
  //     </div>
  //   </div>
  // );
}

export default App;
