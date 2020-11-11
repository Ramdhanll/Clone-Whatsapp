import React from 'react'
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

function Sidebar() {
   const { isOpen, onOpen, onClose } = useDisclosure();
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
                  onClick={onOpen}
               />
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
                        New Chat
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
                           <SidebarContact />
                           <SidebarContact />
                           <SidebarContact />
                           <SidebarContact />
                           <SidebarContact />
                           <SidebarContact />
                           <SidebarContact />
                           <SidebarContact />
                           <SidebarContact />
                           <SidebarContact />
                           
                        </div>
                     </DrawerBody>
                  </DrawerContent>
               </Drawer>
               
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
      </div>
   )
}

export default Sidebar
