import React from 'react'
import './SidebarContactSearch.css'
import { 
   Avatar, 
   IconButton,


} from "@chakra-ui/core";

import { MdAdd} from 'react-icons/md'
function SidebarContactSearch({contacts, contactSearch, valueSearch, loading}) {
   const handleSavedContact = (id) => {
      let variables = {
         userTo: id,
         userFrom: localStorage.getItem("userId")
      }

   }

   const render = () => {
      let a = contactSearch.filter((n, i) => {
         for (let i = 0; i < contacts.length; i++) {
            if(n._id === contacts[i].userTo._id) return false
            if(n._id === localStorage.getItem("userId") ) return false
         }
         return n
      })

      if(!a.length) {
         return (<h2 style={{ 
            textAlign: "center",
            paddingTop: "20px",
            color:"red"
         }}>
               Data not found :(
         </h2>)
      } else {
         return (
            a.map((contact, index) => (
               <div className="sidebarcontactsearch" key={index}>
                  <Avatar name={contact.name} src={contact.photo} />
                  <div className="sidebarcontactsearch__info">
                     <h2> {contact.name} </h2>
                     <p> {contact.phoneNumber}</p>
                  </div>
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
               </div>
         ))
         )
      }
   }

   return (
      loading ? (
         <h2 style={{ 
            textAlign: "center",
            paddingTop: "20px",
         }}>
               Loading....
         </h2>
      ) :
      contactSearch.length !== 0 ?
      render()
      :
      <div className="SidebarContactSearch">
         {
            valueSearch ? (
               <h2 style={{ 
                  textAlign: "center",
                  paddingTop: "20px",
                  color:"red"
                  }}>
                     Data not found :(
                  </h2>
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
