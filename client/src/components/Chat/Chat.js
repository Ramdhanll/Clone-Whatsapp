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
import { MdInsertEmoticon } from 'react-icons/md'
import { ImAttachment } from 'react-icons/im'
import { BsFillMicFill } from 'react-icons/bs'

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
                     autoFocus
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
      </div>
   )
}

export default Chat
