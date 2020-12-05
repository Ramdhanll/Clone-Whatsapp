import React, { useState, useRef, useEffect, useContext } from 'react'
import './Sidebar.css'
import { 
   Avatar, 
   Icon,
   IconButton,
   MenuButton,
   MenuItem,
   MenuList,
   Menu,
   Drawer,
   DrawerBody,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   useDisclosure,
   useToast,
} from "@chakra-ui/core";
import { BiDotsVerticalRounded  } from 'react-icons/bi'
import { MdDonutLarge, MdChat } from 'react-icons/md'
import axios from '../../../helpers/axios'

import SidebarContact from './SidebarContact/SidebarContact'
import SidebarContactOnChat from './SidebarContactOnChat/SidebarContactOnChat';
import SidebarContactSearch from './SidebarContactSearch/SidebarContactSearch';

import { UserContext } from '../../../context/UserContext';
import { ChatContext } from '../../../context/ChatContext'
import { SelectProfileContext } from '../../../context/SelectProfileContext';

function Sidebar() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [drawerAdd, setDrawerAdd] = useState(false)
   const [title, setTitle] = useState('')
   const [placeHolder, setPlaceHolder] = useState("")
   const [contactSaved, setContactSaved] = useState([])
   const [contactSearch, setContactSearch] = useState([])
   const [contactSavedFilter, setContactSavedFilter] = useState([])
   const [valueSearch, setValueSearch] = useState("")
   const timeoutRef = useRef(null)
   const contactOnChatRef = useRef(null)
   const [loading, setLoading] = useState(false)
   const toast = useToast()

   const [activeIndex, setActiveIndex] = useState(null)
   const {chatState, chatDispatch} = useContext(ChatContext)
   const { selectProfileDispatch } = useContext(SelectProfileContext)
   const { state } = useContext(UserContext)

   // get contacts
   // useEffect(() => {
   //    setLoading(true)
   //    axios.post('/contact/get', {
   //       userFrom: localStorage.getItem("userId")
   //    }, {
   //       headers : {
   //          'Authorization' : `Bearer ${localStorage.getItem("token")}`,
   //       }
   //    })
   //    .then((result) => {
   //       setLoading(false)
   //       setContactSaved(result.data.contacts)
   //       setContactSavedFilter(result.data.contacts)
   //    }).catch((err) => {
   //       setLoading(false)
   //       console.log(err)
   //    });
      
   // }, [])

   useEffect(() => {
      setLoading(true)
      axios.post('/message/synconchat', {
         userFrom: localStorage.getItem("userId")
      }, {
         headers : {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`,
         }
      })
      .then((result) => {
         setLoading(false)
         console.log(result.data.contacts)
         setContactSaved(result.data.contacts)
         setContactSavedFilter(result.data.contacts)

         result.data.contacts.map((item) => {
            chatDispatch({type: "PROFILE", payload: item, id: item.contact.userTo._id})
         })
      }).catch((err) => {
         setLoading(false)
         console.log(err)
      });
      
   }, [])

   // search contact
   useEffect(() => {
      if(valueSearch !== ""){
         setLoading(true)
      } else if (valueSearch === "") {
         setLoading(false)
      }
      
      /**
       * 1. jika timeout.current ada maka jalankan clearTimeout
       * 2. set timeoutref.current = setTimeOut()
       * 3. setelah 5 detik timeoutref.current dibuat null lagi
       * 5. jalankan setelah 500ms
       * 6. set timeoutRef.current menjadi null kembali
       */
      if (timeoutRef.current !== null) {
         clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(()=> {
         timeoutRef.current = null;
         if (valueSearch !== "") {
            if(drawerAdd) {
               fetchContactSearch(valueSearch)
            } else {
               filterContactSearch(valueSearch)
            }
         } else {
            setContactSearch([])
         }
      },500);
   }, [valueSearch])

   

   const fetchContactSearch = (query) => {
      axios.post('/contact/search', {
         query: query
      }, {
         headers : {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`,
         }
      })
      .then((result) => {
         setContactSearch(result.data.contacts)
         setLoading(false)
      }).catch((err) => {
         setLoading(false)
         console.log(err)
      });
   }

   // contactSearch
   const filterContactSearch = (valueSearch) => {
      setLoading(true)
      let result;

      result = contactSaved.filter((str) => {
         let contact = str.userTo.name
         contact.includes(valueSearch)
         if(contact.toLowerCase().includes(valueSearch.toLowerCase())) {
            return str
         } else {
            return false
         }
      })
      setLoading(false)
      return setContactSavedFilter(result)
   }

   const handleSavedContact = (id) => {
      setLoading(true)
      let variables = {
         userTo: id,
         userFrom: localStorage.getItem("userId")
      }

      axios.post('/contact/saved', variables, {
         headers : {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`,
         }
      })
      .then((result) => {
         setLoading(false)
         onClose()
         toast({
            title: "Contact saved.",
            description: "immediately do greetings to new friends.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"
         })
         setContactSaved([...contactSaved, result.data.result])
         setValueSearch("")
      }).catch((err) => {
         alert('something wrong with server', err)
      });
   }

   // Contact
   const handleContactClick = (contact) => {      
      let contactUpdated = contactSaved.findIndex(item => {
         return item.contact._id === contact.contact._id
      })
      contactSaved[contactUpdated].contact.onChat = true
      setContactSaved([...contactSaved])
      chatDispatch({type: "NEW_CHAT", payload: contact})
      onClose()
      setActiveIndex(null)

      // ubah db pada server
      axios.put('/contact/onchat', {
         _id: contact.contact._id
      }, {
         headers :{
            'Authorization' : `Bearer ${localStorage.getItem("token")}`,
         }
      })
      .then((result) => {
      
      }).catch((err) => {
         console.log('handleContactClickErr', err)
      });
   }

   // ContactOnChat
   const handleContactOnChatClick = (index, contact) => {
      contact.unread = 0
      setActiveIndex(index)
      selectProfileDispatch({type: "SELECT_PROFILE", payload: contact.contact.userTo._id}) 
      chatDispatch({type: "PROFILE", payload: contact, id: contact.contact.userTo._id}) 
   }

   const handleContactOnChatDelete = (e, contact) => {
      let contactUpdated = contactSaved.findIndex(item => {
         return item.contact._id === contact.contact._id
      })

      contactSaved[contactUpdated].contact.onChat = false
      setContactSaved([...contactSaved])

      // ubah db pada server
      axios.put('/contact/delete', {
         _id: contact.contact._id
      }, {
         headers :{
            'Authorization' : `Bearer ${localStorage.getItem("token")}`,
         }
      })
      .then((result) => {
      
      }).catch((err) => {
         console.log('handleContactClickErr', err)
      });
   }

   return (
      <div className="sidebar">
         <div className="sidebar__header">
            <Avatar 
               name="Dan Abrahmov" 
               src="https://bit.ly/dan-abramov" 
               size="md"
            />
            <div style={{ 
                  alignSelf: "center",
                  fontSize: "20px",
                  paddingLeft: "15px"
                  }}>
                     { state ? state.name : null }
                  </div>
            <div className="sidebar__headerRight">
               <IconButton as={MdDonutLarge} 
                  variant="ghost"
                  isRound="true"
                  size="xs"
                  color="#A0AEC0"
                  _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                  _active={{ backgroundColor: '#283C45'}}
               />
               <IconButton as={MdChat} 
                  variant="ghost"
                  isRound="true"
                  size="xs" 
                  color="#A0AEC0"
                  _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                  _active={{ backgroundColor: '#283C45'}}
                  onClick={() => {
                     setDrawerAdd(false)
                     setValueSearch("")
                     setTitle('New chat')
                     setPlaceHolder("Search or start new chat")
                     onOpen() 
                  }}
               />
               <Menu>
                  <MenuButton 
                     colorScheme="pink"
                     _focus={{ outline: '0'}}
                  >
                     <BiDotsVerticalRounded fontSize="26px" color="#A0AEC0" />
                  </MenuButton>
                  <MenuList 
                     color="#A0AEC0" 
                     marginRight="130px"
                     marginTop="100px"
                     minWidth="140px"
                     background="#2A2F32" 
                     border="1px solid #2A2F35">
                     <MenuItem
                        _focus={{ backgroundColor: "#131C21" }}
                        onClick={() => {
                           setDrawerAdd(true)
                           setValueSearch("")
                           setContactSearch([])
                           setTitle('Add Contact')
                           setPlaceHolder("Search a new friend")
                           onOpen()
                        }}
                     >
                        Add Contact
                     </MenuItem>
                     <MenuItem
                        _focus={{ backgroundColor: "#131C21" }}
                     >
                        Profile
                     </MenuItem>
                     <MenuItem
                        _focus={{ backgroundColor: "#131C21" }}
                     >
                        Seting
                     </MenuItem>
                     <MenuItem
                        _focus={{ backgroundColor: "#131C21" }}
                     >
                        Log out
                     </MenuItem>
                  </MenuList>
               </Menu>
            </div>
         </div>
         
         <div className="sidebar__search">
            <div className="sidebar__searchContainer">
               <Icon name="search" color="#A0AEC0" />
               <input placeholder="Search or start a new chat" />
            </div>
         </div>
         
         <div className="sidebar__contactonchat">
            {
               contactSaved
                  .filter(data => {
                     if(data.contact.onChat === true) {
                        return data
                     }
                  })
                  .map((data, index) => {
                     return (
                        <SidebarContactOnChat 
                           key={index}
                           index={index} 
                           contact={data} 
                           handleContactOnChatClick={handleContactOnChatClick}
                           handleContactOnChatDelete={handleContactOnChatDelete}
                           contactOnChatRef={contactOnChatRef}
                           activeIndex={activeIndex}
                           />
                     )
                  })
            }
         </div>

         <Drawer 
            placement="left" 
            onClose={onClose} 
            isOpen={isOpen} 
            size="410px"
            isFullHeight="true"
            blockScrollOnMount="true"
            >
            <DrawerOverlay />
            <DrawerContent>
               <DrawerHeader 
                  backgroundColor="#2A2F32"
                  color="#fff"
                  height="89px"
                  display="flex"
                  alignItems="center"
                  borderBottomWidth="1px"
                  borderBottomColor="#2A2F32"
               >
                  {title}
               </DrawerHeader>
               <DrawerBody
                  backgroundColor="#131C21"
                  color="#fff"
                  margin="0"
                  padding="0"
                  overflow="auto"
               >
                  <div className="sidebar__search" style={{ position: "fixed", marginBottom: "20px", zIndex:"999"}}>
                     <div className="sidebar__searchContainer">
                        <Icon name="search" color="#A0AEC0" />
                        <input placeholder={placeHolder} 
                           value={valueSearch} 
                           onChange={(e) => setValueSearch(e.target.value)} 
                        />
                     </div>
                  </div>

                  <div className="sidebar__contact" style={{ marginTop: "65px"}}>
                     {
                        drawerAdd ? (
                           <SidebarContactSearch 
                              contacts={contactSaved}
                              contactSearch={contactSearch} 
                              valueSearch={valueSearch} 
                              loading={loading}
                              handleSavedContact={handleSavedContact}
                              />
                        ) : (<SidebarContact
                              loading={loading}
                              contactSaved={contactSaved}
                              contactSavedFilter={contactSavedFilter}
                              valueSearch={valueSearch} 
                              handleContactClick={handleContactClick}
                              />)
                     }
                     
                  </div>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </div>
   )
}

export default Sidebar
