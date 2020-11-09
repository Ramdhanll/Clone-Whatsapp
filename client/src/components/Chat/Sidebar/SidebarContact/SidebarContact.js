import React from 'react'
import './SidebarContact.css'
import { 
   Avatar, 
   AvatarBadge,


} from "@chakra-ui/core";
function SidebarContact() {
   return (
      <div className="sidebarcontact">
         <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
         <div className="sidebarcontact__info">
            <h2> Name </h2>
            <p> Last message </p>
         </div>
      </div>
   )
}

export default SidebarContact
