import React from 'react'
import './Chat.css';
import { 
   Avatar, 
   Box, 
   Icon,
   IconButton,
   InputGroup,
   InputLeftElement,
   PseudoBox,
   Stack
} from "@chakra-ui/core";
import { BiDotsVerticalRounded } from 'react-icons/bi'

import Sidebar from './Sidebar/Sidebar'

function Chat() {
   return (
      <div className="chat">
         <Sidebar />
         
         <div className="chat__main">
            <div className="chat__header">
               <div className="chat__headerInfo">
                  <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                  <h2>Ramadhani</h2>
               </div>
               <div className="chat__headerRight">
                  <IconButton as={BiDotsVerticalRounded} 
                     variant="ghost"
                     isRound="true"
                     size="xs" 
                     color="#A0AEC0"
                     _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                     _active={{ backgroundColor: '#283C45'}}
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Chat
