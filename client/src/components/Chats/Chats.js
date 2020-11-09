import React, { useState, useRef, useEffect } from 'react'
import './Chats.css';
import axios from '../../helpers/axios'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons'

function Chats({messages}) {
   const [input, setInput] = useState("")
   const chatBodyRef = useRef()

   // scroll to bottom after get new message
   useEffect(() => {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight - (chatBodyRef.current.clientHeight + 50)
   }, [messages])

   const renderMessages = () => (
      messages.map((message, index) => (
         <p key={index} className={`chat__message ${message.received ? "chat__received" : null}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
               {message.timestamp}
            </span>
         </p>
      ))
   )

   const sendMessage = (e) => {
      e.preventDefault();
      if(input.trim() === "") return

      console.log(chatBodyRef)
      axios.post('/message/new', {
         message: input,
         name: "hulk",
         received: false,
         timestamp: "2 August 2020"
      })
      .then(() => {
         setInput("")
      })
   }

   return (
      <div className="chat">
         <div className="chat__header">
            <Avatar />

            <div className="chat__headerInfo">
               <h3>Room name</h3>
               <p>last seen at...</p>
            </div>

            <div className="chat__headerRight">
               <IconButton>
                  <SearchOutlined />
               </IconButton>
               <IconButton>
                  <AttachFile />
               </IconButton>
               <IconButton>
                  <MoreVert />
               </IconButton>
            </div>
         </div>

         <div className="chat__body" ref={chatBodyRef}>
            {
               renderMessages()
            }
         </div>

         <div className="chat__footer">
            <InsertEmoticon />
            <form>
               <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message"
                  type="text"
                  autoFocus
               />
               <button onClick={sendMessage}
               type="submit">
                     Send a message
               </button>
            </form>
            <Mic />
         </div>
      </div>
   )
}

export default Chats
