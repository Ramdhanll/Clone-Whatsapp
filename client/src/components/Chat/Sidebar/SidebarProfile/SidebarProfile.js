import React, { useContext, useEffect, useState } from 'react'
import './SidebarProfile.css'
import axios from 'axios'

import { Button, Input, useDisclosure ,
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   IconButton,
   useToast,
} from '@chakra-ui/core'
import {AiFillCamera} from 'react-icons/ai'
import { UserContext } from '../../../../context/UserContext';

function SidebarProfile({isModalOpen, handleChangeIsSidebarProfile}) {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const user = JSON.parse(localStorage.getItem('user'))
   const [url, setUrl] = useState('')
   const btnRef = React.useRef()
   const { state, dispatch } = useContext(UserContext)
   const toast = useToast()
   useEffect(() => {
      onOpen()
   }, [isModalOpen])

   const handleClose = () => {
      onClose()
      handleChangeIsSidebarProfile(false)
   }

   // update profile
   useEffect(() => {
      if(url) {
         const data = {
            _id: user._id,
            url: url
         }
         console.log(data)
         axios.put('/user/image', data,  {
            headers : {
               'Authorization' : `Bearer ${localStorage.getItem("token")}`,
            }
         })
         .then((result) => {
            dispatch({type: "UPDATE_PHOTO", payload: result.data.user.photo})
            toast({
               title: "Photo Changed.",
               description: "Photo changed successfully.",
               status: "success",
               duration: 9000,
               isClosable: true,
               position: "top-right"
            })
         }).catch((err) => {
            console.log(err)
         });
      }
   }, [url])

   const handleImage = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.click()


      input.addEventListener('change', (e) => {
         const data = new FormData()
         const fr = new FileReader()
         fr.readAsDataURL(e.target.files[0])
         fr.onload = (e) => {
            data.append("file", e.target.result)
            data.append('upload_preset', 'wa-clone') // upload to cloudinary
            data.append("cloud_name", "dzehd6loy")
            axios.post("https://api.cloudinary.com/v1_1/dzehd6loy/image/upload", data)
            .then((result) => {
               setUrl(result.data.url)
            }).catch((err) => {
               console.log(err)
            });
            }
         })
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
                  <div className="sidebarprofile__overlay" onClick={() => handleImage()}>
                     <IconButton as={AiFillCamera} 
                           variant="ghost"
                           isRound="true"
                           size="xs"
                           color="#fff"
                           _hover={{ cursor:'pointer' ,color: "#A0AEC0"}}
                           _active={{ backgroundColor: '#283C45'}}
                        />
                        ADD PROFILE <br/> PHOTO
                  </div>
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
