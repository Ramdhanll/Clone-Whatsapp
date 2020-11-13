import React from 'react'
import './SidebarContact.css'
import { 
   Avatar, 

} from "@chakra-ui/core";

function SidebarContact({contacts, loading}) {

   const renderContacts = () => (
      contacts.map((contact, index) => {
         let user = contact.userTo
         
         return (
            <div className="sidebarcontact" key={index}>
            {console.log(user)}
               <Avatar name={user.name} src={contact.userTo.photo} />
               <div className="sidebarcontact__info">
                  <h2> {user.name} </h2>
               </div>
            </div>
         )
      })
   )
   return (
      loading ? 
         (
            <h2 style={{ 
               textAlign: "center",
               paddingTop: "20px",
            }}>
                  Loading....
            </h2>
         )
         :
         renderContacts()
   )
}

export default SidebarContact
