import React, { useEffect } from 'react'
import './SidebarProfile.css'

import { Button, Input, useDisclosure ,
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
} from '@chakra-ui/core'

function SidebarProfile({isModalOpen, handleChangeIsSidebarProfile}) {
   const { isOpen, onOpen, onClose } = useDisclosure()

   const user = JSON.parse(localStorage.getItem('user'))

   const btnRef = React.useRef()
   useEffect(() => {
      onOpen()

   }, [isModalOpen])

   const handleClose = () => {
      onClose()
      handleChangeIsSidebarProfile(false)
   }
   return (
      <>
         <Drawer
         isOpen={isOpen}
         placement="left"
         size="410px"
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
                  Profile
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
                  <img src={user.photo} className="sidebarprofile__photo" />
                  <h3 className="sidebarprofile__name">{user.name}</h3>
                  <div className="sidebarprofile__line"></div>

                  <div className="sidebarprofile__detail">
                     <p className="title">About and phone number</p>
                     <p className="item">{user.email}</p>
                     <p className="item">{user.phoneNumber}</p>
                  </div>
               </DrawerBody>
            </DrawerContent>
         </DrawerOverlay>
         </Drawer>
      </>
   )
}

export default SidebarProfile
