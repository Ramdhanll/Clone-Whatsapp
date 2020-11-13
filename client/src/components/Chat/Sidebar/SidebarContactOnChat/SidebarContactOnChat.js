import React from 'react'
import './SidebarContactOnChat.css'
import { 
   Avatar, 


} from "@chakra-ui/core";
function SidebarContactOnChat() {
   return (
      <div className="sidebarcontactonchat">
         <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
         <div className="sidebarcontactonchat__info">
            <h2> Name </h2>
            <p>Last message....</p>
         </div>
      </div>
   )
}

export default SidebarContactOnChat
