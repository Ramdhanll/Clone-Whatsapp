import React from 'react'
import './SidebarContactSearch.css'
import { 
   Avatar, 
   Badge, 
   IconButton,
   Spinner,


} from "@chakra-ui/core";

import { MdAdd} from 'react-icons/md'
function SidebarContactSearch({contacts, contactSearch, valueSearch, loading, handleSavedContact}) {

   const renderContactCondition = (contact, contacts) => {
      for (let i = 0; i < contacts.length; i++) {
         if (contact._id === contacts[i].userTo._id) {
            return (
               <div className="sidebarcontactsearch__exists">
                  <Badge variant="solid" bg="#276749">
                     Ditambahkan
                  </Badge>
               </div>
            ) 
         } else if (contact._id === localStorage.getItem("userId")) {
            return (
               <div className="sidebarcontactsearch__exists">
                  <Badge variant="solid" bg="#276749">
                     You
                  </Badge>
               </div>
            )
         }
      }
      return (
         <div className="sidebarcontactsearch__add">
               <IconButton as={MdAdd} 
                  variant="ghost"
                  isRound="true"
                  size="md" 
                  color="#A0AEC0"
                  _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                  _active={{ backgroundColor: '#032b26'}}
                  onClick={() => handleSavedContact(contact._id)}
               />
            </div>
      )
   }

   const renderContact = () => {
      return (
         contactSearch.map((contact, index) => (
            <div className="sidebarcontactsearch" key={index}>
               <Avatar name={contact.name} src={contact.photo} />
               <div className="sidebarcontactsearch__info">
                  <h2> {contact.name} </h2>
                  <p> {contact.phoneNumber}</p>
               </div>
               {
                  renderContactCondition(contact, contacts)
               }
            </div>
      ))
      )
   }

   const dataNotFound = () => (
      <h2 style={{ 
         textAlign: "center",
         paddingTop: "20px",
         color:"red"
      }}>
         Data not found :(
      </h2>
   )

   return (
      loading ? (
         <h2 style={{ 
            textAlign: "center",
            paddingTop: "20px",
         }}>
            <Spinner size="lg" />
         </h2>

      ) :
      contactSearch.length !== 0 ?
      renderContact()
      :
      <div className="SidebarContactSearch">
         {
            valueSearch ? (
               dataNotFound()
            )
            :
            <h2 style={{ 
               textAlign: "center",
               paddingTop: "20px",
            }}>
                  Typing your name friend or phone number
            </h2>
         }
      </div>
   )
}

export default SidebarContactSearch
