import React from 'react'
import './SidebarContact.css'
import { 
   Avatar, 
   Spinner, 

} from "@chakra-ui/core";

function SidebarContact({contactSaved, contactSavedFilter, valueSearch, loading, handleContactClick}) {

   const renderContacts = () => {

      if (contactSavedFilter.length === 0 && valueSearch !== "") {
         return (
            <h2 style={{ 
               textAlign: "center",
               paddingTop: "20px",
               color:"red"
            }}>
               Contact not found :(
            </h2>
         )
      } else if (valueSearch === "") {
         return (
            contactSaved
            .sort((a, b) => (a.userTo.name.toLowerCase() > b.userTo.name.toLowerCase()) ? 1 : ((b.userTo.name.toLowerCase() > a.userTo.name.toLowerCase()) ? -1 : 0))
            .map((contact, index) => {
               let user = contact.userTo
               
               return (
                  <div className="sidebarcontact" key={index} onClick={() => handleContactClick(contact, index)}>
                     <Avatar name={user.name} src={contact.userTo.photo} />
                     <div className="sidebarcontact__info">
                        <h2> {user.name} </h2>
                     </div>
                  </div>
               )
            })
         )
      } else {
         return (
            contactSavedFilter.map((contact, index) => {
               return (
                  <div className="sidebarcontact" key={index}>
                     <Avatar name={contact.userTo.name} src={contact.userTo.photo} />
                     <div className="sidebarcontact__info">
                        <h2> {contact.userTo.name} </h2>
                     </div>
                  </div>
               )
            })
         )
      }
      
   }
   return (
      loading ? 
         (
            <h2 style={{ 
               textAlign: "center",
               paddingTop: "20px",
            }}>
               <Spinner size="lg" />
            </h2>
         )
         :
         renderContacts()
   )
}

export default SidebarContact
