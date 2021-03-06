import React, { useEffect } from 'react'
import './SidebarProfileFriend.css'

import { Button, Input, useDisclosure ,
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
} from '@chakra-ui/core'

function SidebarProfileFriend({isModalOpen, handleChangeIsSidebarProfileFriend, profile}) {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef = React.useRef()
   const {name, email, phoneNumber, photo, _id} = profile.profile.contact.userTo
   useEffect(() => {
      onOpen()

   }, [isModalOpen])

   const handleClose = () => {
      onClose()
      handleChangeIsSidebarProfileFriend(false)
   }
   return (
      <>
         <Drawer
         isOpen={isOpen}
         placement="right"
         onClose={() => handleClose()}
         finalFocusRef={btnRef}
         >
         <DrawerOverlay>
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
                  Contact Info
               </DrawerHeader>

               <DrawerBody
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  backgroundColor="#131C21"
                  color="#fff"
                  margin="0"
                  padding="30px 0px"
                  overflow="auto"
               >
                  <img src={photo} className="sidebarprofilefriend__photo" />
                  <h3 className="sidebarprofilefriend__name">{name}</h3>
                  <div className="sidebarprofilefriend__line"></div>

                  <div className="sidebarprofilefriend__detail">
                     <p className="title">About and phone number</p>
                     <p className="item">{email}</p>
                     <p className="item">{phoneNumber}</p>
                  </div>
               </DrawerBody>
            </DrawerContent>
         </DrawerOverlay>
         </Drawer>
      </>
   )
}

export default SidebarProfileFriend
