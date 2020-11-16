// packages
import React, { useEffect, useReducer ,useContext } from 'react';
import './App.css';
// import Pusher from 'pusher-js'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

// helpers
import { reducer, initialState } from './reducers/userReducer'
import { reducer as ChatReducer, initialState as ChatState} from './reducers/chatReducer'
import { UserContext } from './context/UserContext'
import { ChatContext } from './context/ChatContext'

// components
import Chat from './components/Chat/Chat';
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'


function Routing() {
  const { dispatch } = useContext(UserContext)
  const history = useHistory()
  const [chatState, chatDispatch] = useReducer(ChatReducer, ChatState)
  // const [messages, setMessages] = useState([])

   // jalankan pertama, jika ada user lakukan reduce
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({type:"USER", payload:user})
    } else {
      // jika selain route dibawah alihkan ke /login
      // if (!history.location.pathname.startsWith('/reset-password'))
      // if (!history.location.pathname.startsWith('/reset-password/:token'))
      if (!history.location.pathname.startsWith('/register'))
      history.push('/login')
    }
  }, [])

  // useEffect(() => {
  //   axios.get('/message/sync')
  //   .then((response) => {
  //     setMessages(response.data)
  //   }).catch((err) => {
  //     alert('failed get messages')
  //   });
  // }, [])
  
  // useEffect(() => {
  //   const pusher = new Pusher('d7374f71e545a295d4f4', {
  //     cluster: 'ap1'
  //   })
  //   const channel = pusher.subscribe('messages')
  //   channel.bind('inserted', function(newMessage) {
  //     setMessages([...messages, newMessage])
  //   })
  //   return () => {
  //     channel.unbind_all()
  //     channel.unsubscribe()
  //   }
  // }, [messages])

  return (
    <Switch>
      <Route exact path="/">
        <ChatContext.Provider value={{ chatState, chatDispatch}}>
          <Chat />
        </ChatContext.Provider>
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
