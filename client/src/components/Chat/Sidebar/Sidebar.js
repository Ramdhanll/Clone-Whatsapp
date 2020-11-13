import React, { useState, useRef, useEffect } from 'react'
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
} from "@chakra-ui/core";
import { BiDotsVerticalRounded  } from 'react-icons/bi'
import { MdDonutLarge, MdChat } from 'react-icons/md'
import axios from '../../../helpers/axios'

import SidebarContact from './SidebarContact/SidebarContact'
import SidebarContactOnChat from './SidebarContactOnChat/SidebarContactOnChat';
import SidebarContactSearch from './SidebarContactSearch/SidebarContactSearch';

function Sidebar() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [drawerAdd, setDrawerAdd] = useState(false)
   const [title, setTitle] = useState('')
   const [placeHolder, setPlaceHolder] = useState("")
   const [contactSearch, setContactSearch] = useState([])
   const [contactSaved, setContactSaved] = useState([])
   const [valueSearch, setValueSearch] = useState("")
   const timeoutRef = useRef(null)
   const [loading, setLoading] = useState(false)

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
               console.log('new chat...', valueSearch)
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

   useEffect(() => {
      setLoading(true)
      axios.post('/contact/get', {
         userFrom: localStorage.getItem("userId")
      }, {
         headers : {
            'Authorization' : `Bearer ${localStorage.getItem("token")}`,
         }
      })
      .then((result) => {
         setLoading(false)
         setContactSaved(result.data.contacts)
      }).catch((err) => {
         setLoading(false)
         console.log(err)
      });
      
   }, [])

   return (
      <div className="sidebar">
         <div className="sidebar__header">
            <Avatar 
               name="Dan Abrahmov" 
               src="https://bit.ly/dan-abramov" 
               size="md"
            />

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
         
         <div className="sidebar__contact kobisa">
            <SidebarContactOnChat />
            <SidebarContactOnChat />
            <SidebarContactOnChat />
            <SidebarContactOnChat />
            <SidebarContactOnChat />
            <SidebarContactOnChat />
            <SidebarContactOnChat />
            <SidebarContactOnChat />
         </div>

         <Drawer 
            placement="left" 
            onClose={onClose} 
            isOpen={isOpen} 
            size="480px">
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
                              />
                        ) : (<SidebarContact
                              loading={loading}
                              contacts={contactSaved}
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
