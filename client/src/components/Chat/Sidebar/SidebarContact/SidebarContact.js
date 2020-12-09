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
            .filter(item => !item.contact.unsaved)
            .sort((a, b) => (a.contact.userTo.name.toLowerCase() > b.contact.userTo.name.toLowerCase()) ? 1 : ((b.contact.userTo.name.toLowerCase() > a.contact.userTo.name.toLowerCase()) ? -1 : 0))
            .map((contact, index) => {
               let user = contact.contact.userTo
               
               return (
                  <div className="sidebarcontact" key={index} onClick={() => handleContactClick(contact)}>
                     <Avatar name={user.name} src={contact.contact.userTo.photo} />
                     <div className="sidebarcontact__info">
                        <h2> {user.name} </h2>
                     </div>
                  </div>
               )
            })
         )
      } else {
         return (
            contactSavedFilter
            .filter(item => !item.contact.unsaved)
            .map((contact, index) => {
               return (
                  <div className="sidebarcontact" key={index} onClick={() => handleContactClick(contact)}>
                     <Avatar name={contact.contact.userTo.name} src={contact.contact.userTo.photo} />
                     <div className="sidebarcontact__info">
                        <h2> {contact.contact.userTo.name} </h2>
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
