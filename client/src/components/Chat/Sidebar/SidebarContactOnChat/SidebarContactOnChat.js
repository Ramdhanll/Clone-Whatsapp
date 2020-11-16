import React, { useEffect, useState } from 'react'
import './SidebarContactOnChat.css'
import { 
   Avatar, Menu, MenuButton, MenuItem, MenuList, 


} from "@chakra-ui/core";
import { RiArrowDropDownLine } from 'react-icons/ri';
function SidebarContactOnChat({contact, index, handleContactOnChatClick, contactOnChatRef, activeIndex}) {
   
   return (
      <div className={`sidebarcontactonchat } ${index === activeIndex ? 'active': null} `} 
            key={index} 
            onClick={() => handleContactOnChatClick(index, contact)} 
            >
         <Avatar name={contact.userTo.name} src={contact.userTo.photo} />
         <div className="sidebarcontactonchat__info">
            <h2> {contact.userTo.name} </h2>
            <p>Last message....</p>
         </div>

         <div className="sidebarcontactonchat__deletechat">
            <Menu>
               <MenuButton 
                  _focus={{ outline: '0'}}
               >
                  <RiArrowDropDownLine fontSize="35px" color="#A0AEC0" />
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
                     Delete Chat
                  </MenuItem>
               </MenuList>
            </Menu>
         </div>
      </div>
   )
}

export default SidebarContactOnChat
