import React, { useContext, useEffect, useRef, useState} from 'react'
import Pusher, { PresenceChannel } from 'pusher-js'
import './Chat.css';
import { 
   Avatar, 
   IconButton,
   MenuButton,
   MenuItem,
   MenuList,
   Menu,
   Spinner,
   
} from "@chakra-ui/core";
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { MdInsertEmoticon } from 'react-icons/md'
import { ImAttachment } from 'react-icons/im'
import { BsFillMicFill } from 'react-icons/bs'
import axios from 'axios'
import moment from 'moment'

import photo from './images/landing.png'

import Sidebar from './Sidebar/Sidebar'
import _ from 'lodash'
import { ChatContext } from '../../context/ChatContext'
import { SelectProfileContext } from '../../context/SelectProfileContext'

import useStateWithCallback from 'use-state-with-callback'

function Chat() {
   const { chatState, chatDispatch } = useContext(ChatContext)
   const { selectProfileState } = useContext(SelectProfileContext)
   const inputRef = useRef(null)
   const [messages, setMessages] = useStateWithCallback([], messages => {
      if(messages.length > 0 ) scrollToBottom()
   })
   const [message, setMessage] = useState("")
   const [loading, setLoading] = useState(false)
   const [profile, setProfile] = useState(null)
   const [indexAlreadyClicked, setindexAlreadyClicked] = useState([])
   const chatBodyRef = useRef()

   // scroll to bottom after get new message
   const scrollToBottom = () => {
      if(chatBodyRef.current !== undefined) {
         return chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight - (chatBodyRef.current.clientHeight)
      }
   }
   useEffect(() => {
      if(chatBodyRef.current !== undefined) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight - (chatBodyRef.current.clientHeight)
   }, [messages])


   useEffect( async () => {
      // INPUT FOCUS
      if(inputRef.current) {
         inputRef.current.focus()
         inputRef.current.value = ""
      }

      // SET PROFILE
      let indexChatState = chatState.findIndex(item => item.profile.userTo._id === selectProfileState)
      setProfile(chatState[indexChatState])

      // SYNC MESSAGE
      setLoading(true)
      if(chatState[indexChatState]) {
         if (!indexAlreadyClicked.includes(indexChatState)) {
            setindexAlreadyClicked([...indexAlreadyClicked, indexChatState])
            axios.post('/message/sync', {
               from: localStorage.getItem('userId'),
               to: selectProfileState,
            },{
               headers : {
                  'Authorization': localStorage.getItem("token")
               },
            })
            .then((result) => {
               chatDispatch({type: "NEW_CHAT", payload: result.data.messages, id: selectProfileState})
               setLoading(false)
            }).catch((err) => {
               setLoading(false)
               console.log('err', err.response)
            });
         } else {
            setMessages(chatState[indexChatState].chat)
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight - (chatBodyRef.current.clientHeight)
            setLoading(false)
         }
      }      


      return () => {
         setProfile(null)
         setMessages([])
      }

   }, [selectProfileState])

   // render messages
   useEffect( async () => {
      let indexChatState = chatState.findIndex(item => item.profile.userTo._id === selectProfileState)
      if(profile) {
         setMessages(chatState[indexChatState].chat)
      }
      console.log('chatState', chatState[indexChatState])
   }, [profile])

   const sendMessage = () => {
      if(message.trim() === "") return
      setMessages([...messages, {
         from: localStorage.getItem("userId"),
         read: false,
         text: message,
         to: selectProfileState,
      }])
      setMessage("")

      axios.post('/message/send', {
         from: localStorage.getItem("userId"),
         to: selectProfileState,
         text: message
      }, {
         headers: {
            'Authorization': localStorage.getItem("token")
         }
      })
      .then((result) => {
         chatDispatch({type: "UPDATE_CHAT", payload: result.data.message, id: selectProfileState})
      }).catch(() => {
         messages.pop()
      })
   }

   // PUSHER
   useEffect(() => {
      const pusher = new Pusher('d7374f71e545a295d4f4', {
         authEndpoint: process.env.NODE_ENV === 'development' ?  'http://localhost:9000/api/v1/pusher/auth' : `${process.env.APP_URI}/api/v1/pusher/auth`,
         cluster: 'ap1'
      })
      const channel = pusher.subscribe(`private-${localStorage.getItem("userId")}`)
      channel.bind('inserted', function(newMessage) {
         chatDispatch({type: "UPDATE_CHAT", payload: newMessage, id: newMessage.from})
         console.log(newMessage)

      })
      return () => {
         channel.unbind_all()
         channel.unsubscribe()
      }
   }, [])

   return (
      <div className="chat">
         <Sidebar />
         
         {
            profile ? 
               (
                  <div className="chat__main">
                     <div className="chat__header">
                        <div className="chat__headerInfo">
                           <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                           <h2>
                              {                              
                                 profile.profile.userTo.name
                              }
                           </h2>
                        </div>
                        <div className="chat__headerRight">
                        <Menu>
                           <MenuButton 
                              _focus={{ outline: '0'}}
                           >
                              <BiDotsVerticalRounded fontSize="26px" color="#A0AEC0" />
                           </MenuButton>
                           <MenuList 
                              color="#A0AEC0" 
                              minWidth="130px"
                              marginRight="10px"
                              background="#2A2F32" 
                              border="1px solid #2A2F35">
                              <MenuItem
                                 _focus={{ backgroundColor: "#131C21" }}
                              >
                                 Contact info
                              </MenuItem>
                              <MenuItem
                                 _focus={{ backgroundColor: "#131C21" }}
                              >
                                 Clear Message
                              </MenuItem>
                           </MenuList>
                        </Menu>
                        </div>
                     </div>
                     <div className="chat__body" ref={chatBodyRef}>
                        {
                           !loading ? (
                              messages.map((message, index) => {
                                 return (
                                    <div className={`chat__message ${message.from !== localStorage.getItem("userId") ? null : 'chat__received'}`} key={index}>
                                       <p className="message">
                                          { message.text }
                                       </p>
                                       <p className="chat__timestamps">
                                          { moment(message.createdAt).format('llll')}
                                       </p>
                                    </div>
                                 )
                              })
                           ) :
                           <Spinner 
                              color="blue.400"
                              size="md" />                           
                        }
                     </div>
                     <div className="chat__footer">
                           <IconButton as={MdInsertEmoticon}
                              variant="ghost"
                              isRound="true"
                              size="xs"
                              color="#A0AEC0"
                              alignSelf="center"
                              _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                              _active={{ backgroundColor: '#283C45'}}
                           />
                           <IconButton as={ImAttachment}
                              variant="ghost"
                              isRound="true"
                              size="xs"
                              color="#A0AEC0"
                              _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                              _active={{ backgroundColor: '#283C45'}}
                              alignSelf="center"
                           />
                           <form>
                              <input 
                                 placeholder="Type a message"
                                 type="text"
                                 autoFocus={true}
                                 ref={inputRef}
                                 value={message}
                                 onChange={(e) => setMessage(e.target.value)}
                                 onKeyPress={(e)=> {
                                    if(e.key === "Enter") {
                                       e.preventDefault()
                                       sendMessage()
                                    }
                                 }}
                              />
                           </form>
                           <IconButton as={BsFillMicFill}
                              variant="ghost"
                              isRound="true"
                              size="xs"
                              color="#A0AEC0"
                              alignSelf="center"
                              _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                              _active={{ backgroundColor: '#283C45'}}
                           />
                        </div>
                  </div>
               )
               :
               (
                  <div className="chat__landingpage">
                     <img src={photo} alt="wa"/>
                     <div className="title_header">
                        Keep your brain healthy
                     </div>
                     <p>
                        Don't forget to eat, don't forget to pray, don't forget to study, 
                        <br/>
                        don't forget to sleep
                     </p>

                  </div>
               )
         }
      </div>
   )
}

export default Chat
