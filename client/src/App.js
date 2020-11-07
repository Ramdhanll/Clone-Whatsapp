// packages
import React, { useEffect, useState, createContext, useReducer ,useContext } from 'react';
import './App.css';
import Pusher from 'pusher-js'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// helpers
import axios from './helpers/axios'
import { reducer, initialState } from './reducers/userReducer'
import { UserContext } from './context/UserContext'

// components
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'


function Routing() {
  const { state, dispatch } = useContext(UserContext)
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
    <Switch>
      <Route exact path="/">
        <div className="chat__parent">
          <div className="chat__parent__body">
            <Sidebar/>
            <Chat messages={messages} />
          </div>
        </div>
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
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="app">
      <UserContext.Provider value={{state, dispatch}}>
        <Router>
          <Routing/>
        </Router>
      </UserContext.Provider>
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
