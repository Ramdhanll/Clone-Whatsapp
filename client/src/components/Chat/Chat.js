import React, { useContext, useEffect, useRef} from 'react'
import './Chat.css';
import { 
   Avatar, 
   IconButton,
   MenuButton,
   MenuItem,
   MenuList,
   Menu,
   
} from "@chakra-ui/core";
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { MdInsertEmoticon } from 'react-icons/md'
import { ImAttachment } from 'react-icons/im'
import { BsFillMicFill } from 'react-icons/bs'

import photo from './images/landing.png'

import Sidebar from './Sidebar/Sidebar'

import { ChatContext } from '../../context/ChatContext'

function Chat() {
   // const {state, dispatch} = useContext(UserContext)
   const { chatState, chatDispatch } = useContext(ChatContext)
   const inputRef = useRef(null)

   useEffect(() => {
      if(inputRef.current) {
         inputRef.current.focus()
         inputRef.current.value = ""
      }
   })

   return (
      <div className="chat">
         <Sidebar />
         
         {
            chatState ? 
               (
                  <div className="chat__main">
                     <div className="chat__header">
                        <div className="chat__headerInfo">
                           <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                           <h2>
                              {
                                 chatState ? 
                                    ( 
                                       chatState.userTo.name
                                    )
                                    :
                                    'kosong'
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
                        <div className="chat__message">
                           <p className="message">
                              Lagi apa ni.... ?s adsdasdas
                              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla esse laborum quam delectus eius, commodi perferendis aliquid dolor, nesciunt libero, aut mollitia vitae quos omnis quod at. Asperiores, ullam ratione.
                           </p>
                           <p className="chat__timestamps">
                              23:00
                           </p>
                        </div>

                        <div className="chat__message chat__received">
                           <p className="message">
                              Lagi apa ni.... ?s adsdasdas
                              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla esse laborum quam delectus eius, commodi perferendis aliquid dolor, nesciunt libero, aut mollitia vitae quos omnis quod at. Asperiores, ullam ratione.
                           </p>
                           <p className="chat__timestamps">
                              23:00
                           </p>
                        </div>
                        <div className="chat__message chat__received">
                           <p className="message">
                              Lagi apa ni.... ?s adsdasdas
                              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla esse laborum quam delectus eius, commodi perferendis aliquid dolor, nesciunt libero, aut mollitia vitae quos omnis quod at. Asperiores, ullam ratione.
                           </p>
                           <p className="chat__timestamps">
                              23:00
                           </p>
                        </div>
                        <div className="chat__message chat__received">
                           <p className="message">
                              Lagi apa ni.... ?s adsdasdas
                              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla esse laborum quam delectus eius, commodi perferendis aliquid dolor, nesciunt libero, aut mollitia vitae quos omnis quod at. Asperiores, ullam ratione.
                           </p>
                           <p className="chat__timestamps">
                              23:00
                           </p>
                        </div>

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
