import React, { useEffect } from 'react'

import { Button, Input, useDisclosure ,
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
} from '@chakra-ui/core'

function SidebarProfileFriend({isModalOpen, handleChangeIsSidebarProfileFriend}) {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef = React.useRef()

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
               <DrawerCloseButton />
               <DrawerHeader>Create your account</DrawerHeader>

               <DrawerBody>
               <Input placeholder="Type here..." />
               </DrawerBody>

               <DrawerFooter>
               <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
               </Button>
               <Button color="blue">Save</Button>
               </DrawerFooter>
            </DrawerContent>
         </DrawerOverlay>
         </Drawer>
      </>
   )
}

export default SidebarProfileFriend
