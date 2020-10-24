import React from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import img from '../../images/jeni.jpg'
import SidebarChat from './SidebarChat/SidebarChat';

function Sidebar() {
   return (
      <div className="sidebar">
         <div className="sidebar__header">
            <Avatar src={img} />
            <div className="sidebar__headerRight">
               <IconButton>
                  <DonutLargeIcon />
               </IconButton>
               <IconButton>
                  <ChatIcon />
               </IconButton>
               <IconButton>
                  <MoreVertIcon />
               </IconButton>
            </div>
         </div>

         <div className="sidebar__search">
            <div className="sidebar__searchContainer">
               <SearchOutlinedIcon />
               <input type="text" placeholder="Search or star new chat"/>
            </div>
         </div>

         <div className="sidebar__chats">
            <SidebarChat />
         </div>
      </div>
   )
}

export default Sidebar
