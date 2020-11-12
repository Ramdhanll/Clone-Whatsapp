import React, { useState } from 'react'
import './Sidebar.css'
import { 
   Avatar, 
   Button, 
   Icon,
   IconButton,
   MenuButton,
   MenuItem,
   MenuList,
   Menu,
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   useDisclosure,
} from "@chakra-ui/core";
import { BiDotsVerticalRounded  } from 'react-icons/bi'
import { MdDonutLarge, MdChat } from 'react-icons/md'

import SidebarContact from './SidebarContact/SidebarContact'
import SidebarContactOnChat from './SidebarContactOnChat/SidebarContactOnChat';
import SidebarContactSearch from './SidebarContactSearch/SidebarContactSearch';

function Sidebar() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [drawerAdd, setDrawerAdd] = useState(false)
   const [title, setTitle] = useState('')

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
                     setTitle('New chat')
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
                           setTitle('Add Contact')
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
         
         <div className="sidebar__contact">
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
                        <input placeholder="Search contact" />
                     </div>
                  </div>

                  <div className="sidebar__contact" style={{ marginTop: "50px"}}>
                     {
                        drawerAdd ? (<SidebarContactSearch />) : (<SidebarContact />)
                     }
                     
                  </div>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </div>
   )
}

export default Sidebar
