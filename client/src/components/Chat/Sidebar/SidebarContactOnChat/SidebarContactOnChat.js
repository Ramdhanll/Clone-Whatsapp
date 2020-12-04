import React, { useEffect, useState } from 'react'
import './SidebarContactOnChat.css'
import { 
   Avatar, Menu, MenuButton, MenuItem, MenuList, 


} from "@chakra-ui/core";
import { RiArrowDropDownLine } from 'react-icons/ri';
function SidebarContactOnChat({contact, index, handleContactOnChatClick, handleContactOnChatDelete, activeIndex}) {
   
   return (
      <div className={`sidebarcontactonchat ${index === activeIndex ? 'active': null} `}>
         <div className={`sidebarcontactonchat__left`} 
            key={index} 
            onClick={() => handleContactOnChatClick(index, contact)} 
            >
         <Avatar name={contact.contact.userTo.name} src={contact.contact.userTo.photo} />
         <div className="sidebarcontactonchat__info">
            <h2> {contact.contact.userTo.name} </h2>
            <p className="sidebarcontactonchat__lastmessage">{ contact.lastMessage }</p>
         </div>
      </div>
         {
            contact.unread > 0 &&
            <div className="sidebarcontactonchat__countnewmessage">
               {Math.floor(contact.unread)}
            </div> 
         }
         <div className={`sidebarcontactonchat__deletechat ${index === activeIndex ? 'active': null} `}>
            <Menu
               placement="right-start"
            >
               <div className="btnarrow">
                  <MenuButton 
                     _focus={{ 
                        outline: '0',
                     }}
                  >
                     <RiArrowDropDownLine 
                        fontSize="35px" 
                        color="#A0AEC0"  />
                  </MenuButton>
               </div>
               <MenuList 
                  color="#A0AEC0" 
                  minWidth="130px"
                  marginRight="10px"
                  background="#2A2F32" 
                  height="100px"
                  border="1px solid #2A2F35">
                  <MenuItem
                     _focus={{ backgroundColor: "#131C21" }}
                     onClick={(e) => handleContactOnChatDelete(e, contact)}
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
