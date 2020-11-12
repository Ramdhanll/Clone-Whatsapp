import React from 'react'
import './SidebarContactSearch.css'
import { 
   Avatar, 
   AvatarBadge,
   IconButton,


} from "@chakra-ui/core";

import { MdAdd} from 'react-icons/md'
function SidebarContactSearch() {
   return (
      <div className="sidebarcontactsearch">
         <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
         <div className="sidebarcontactsearch__info">
            <h2> Name </h2>
            <p>0822222222222</p>
         </div>
         <div className="sidebarcontactsearch__add">
               <IconButton as={MdAdd} 
                  variant="ghost"
                  isRound="true"
                  size="md" 
                  color="#A0AEC0"
                  _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                  _active={{ backgroundColor: '#032b26'}}
               
               />
         </div>
      </div>
   )
}

export default SidebarContactSearch
