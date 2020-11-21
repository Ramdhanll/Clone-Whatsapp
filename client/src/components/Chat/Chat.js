import React, { useContext, useEffect, useRef, useState} from 'react'
import Pusher from 'pusher-js'
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
import axios from '../../helpers/axios'
import moment from 'moment'

import photo from './images/landing.png'

import Sidebar from './Sidebar/Sidebar'
import _ from 'lodash'
import { ChatContext } from '../../context/ChatContext'
import { SelectProfileContext } from '../../context/SelectProfileContext'

function Chat() {
   const { chatState, chatDispatch } = useContext(ChatContext)
   const { selectProfileState } = useContext(SelectProfileContext)
   const inputRef = useRef(null)
   const [messages, setMessages] = useState([])
   const [message, setMessage] = useState("")
   const [loading, setLoading] = useState(false)
   const [profile, setProfile] = useState(null)
   // index messages at state context
   const [indexContext, setIndexContext] = useState(null)

   useEffect(() => {
      // INPUT FOCUS
      if(inputRef.current) {
         inputRef.current.focus()
         inputRef.current.value = ""
      }

      // SET PROFILE
      let newProfile = chatState.filter(item => item.profile.userTo._id === selectProfileState)
      setProfile(newProfile[0])
      // SYNC MESSAGE
      setLoading(true)
      if(newProfile[0]) {
         if (newProfile[0].chat.length === 0) {
            axios.post('/message/sync', {
               from: localStorage.getItem('userId'),
               to: selectProfileState
            }, {
               headers : {
                  'Authorization': localStorage.getItem("token")
               }
            })
            .then( (result) => {
               chatDispatch({type: "NEW_CHAT", payload: result.data.messages, id: selectProfileState})
               setLoading(false)
               if(
                  result.data.messages[0].from === localStorage.getItem('userId') && result.data.messages[0].to === selectProfileState ||
                  result.data.messages[0].from === selectProfileState && result.data.messages[0].to === localStorage.getItem('userId')
               ) {
                  setMessages(result.data.messages)
               }

            }).catch((err) => {
               setLoading(false)
               console.log('err', err.response)
            });
         } else {
            setMessages(newProfile[0].chat)
            setLoading(false)
         }
      }
      


      return () => {
         setMessages([])
      }

   }, [selectProfileState])


   const checkMessages = () => {

      let result = {
         index: null,
         exist: false
      }
      for (let i = 0; i < chatState.chat.length; i++) {
         if(chatState.chat[i]){
            for (let j = 0; j < chatState.chat[i].length; j++) {
               if(
                  chatState.chat[i][j].from === localStorage.getItem('userId') && chatState.chat[i][j].to === chatState.profile.userTo._id ||
                  chatState.chat[i][j].from === chatState.profile.userTo._id && chatState.chat[i][j].to === localStorage.getItem('userId')
                  ) {
                     result.index = i
                     result.exist = true
                     break
                  }
            }
         }
         if(result.exist === true){
            break
         }
      }
         
      setIndexContext(result.index)
      return result
   }

   // SYNC MESSAGE
   // useEffect(() => {
   //    setLoading(true)
      
   //    // console.log('profile', profile)
   //    // if(profile.profile.chat.length < 0)
   //    axios.post('/message/sync', {
   //       from: localStorage.getItem('userId'),
   //       to: selectProfileState
   //    }, {
   //       headers : {
   //          'Authorization': localStorage.getItem("token")
   //       }
   //    })
   //    .then( (result) => {
   //       setMessages(result.data.messages)
   //       chatDispatch({type: "NEW_CHAT", payload: result.data.messages, id: selectProfileState})
   //       setLoading(false)
   //    }).catch((err) => {
   //       setLoading(false)
   //       console.log('err', err.response)
   //    });


   //    return () => {
   //       setMessages([])
   //    }
   // }, [selectProfileState])

   // useEffect(() => {
      // setLoading(true)
      // const result = checkMessages()
      
      // if(result.exist === true) {
      //    setLoading(false)
      //    setMessages(chatState.chat[result.index])
      // } else {
      //    axios.post('/message/sync', {
      //       from: localStorage.getItem('userId'),
      //       to: !_.isEmpty(chatState.profile) ? chatState.profile.userTo._id : null
      //    }, {
      //       headers : {
      //          'Authorization': localStorage.getItem("token")
      //       }
      //    })
      //    .then( (result) => {
      //       if(result.data.messages.length !== 0){
      //          console.log('dispatch NEW_CHAT')
      //          chatDispatch({type: "NEW_CHAT", payload: result.data.messages})
      //          if(
      //             result.data.messages[0].from === localStorage.getItem('userId') && result.data.messages[0].to === chatState.profile.userTo._id ||
      //             result.data.messages[0].from === chatState.profile.userTo._id && result.data.messages[0].to === localStorage.getItem('userId')
      //          ) {
      //             setMessages(result.data.messages)
      //          }
      //       }

            
      //       setLoading(false)
      //    }).catch((err) => {
      //       setLoading(false)
      //       console.log('err', err.response)
      //    });
         
      //    console.log('STATE', chatState)
      //    return () => {
      //       setMessages([])
      //    }
      // }
   // }, [chatState.profile])

   const sendMessage = () => {
      if(message.trim() === "") return

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
         setMessages([...messages, result.data.message])
         chatDispatch({type: "UPDATE_CHAT", payload: result.data.message, id: selectProfileState})
         setMessage("")

         // if(resultCheckMessage.index === null) {
         //    chatDispatch({type: "NEW_CHAT", payload: messages})
         // } else {
         //    chatDispatch({type: "UPDATE_CHAT", payload: result.data.message, index: resultCheckMessage.index})
         // }

      })
   }

   // PUSHER

   // useEffect(() => {
   //    const pusher = new Pusher('d7374f71e545a295d4f4', {
   //       cluster: 'ap1'
   //    })
   //    const channel = pusher.subscribe('messages')
   //    channel.bind('inserted', function(newMessage) {
   //       // setMessages([...messages, newMessage])
   //    })
   //    return () => {
   //       channel.unbind_all()
   //       channel.unsubscribe()
   //    }
   // }, [messages])

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
                     <div className="chat__body">
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
