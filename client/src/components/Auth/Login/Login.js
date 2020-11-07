import React, { useState, useContext } from 'react'
import './Login.css'
import { Formik, Field } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import {
   InputGroup,
   Input,
   InputLeftAddon,
   Button,
   FormControl,
   FormLabel,
   FormErrorMessage,
   Alert,
   AlertIcon,
   AlertTitle,
   AlertDescription,
   CloseButton,
} from "@chakra-ui/core";

// helpers
import axios from '../../../helpers/axios'
import {UserContext} from '../../../context/UserContext'

function Login(props) {
   const history = useHistory()
   const { state, dispatch } = useContext(UserContext)
   const [displayMessage, setDisplayMessage] = useState(false)
   const [message, setMessage] = useState({})

   console.log('state', state)
   const initialValues = {
      phoneNumber: '',
      password: ''
   }

   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

   const validationSchema = Yup.object().shape({
      phoneNumber: Yup.string()
                  .matches(phoneRegExp, 'Phone number is not valid')
                  .required('Phone number is required'),
      password: Yup.string()
               .min(6, 'Password must be at least 6 characters')
               .required('Password is required')
   })

   const onSubmit = (values, { setSubmitting }) => {         
         axios.post('/auth/login', values)
         .then((result) => {
            console.log(result)
            localStorage.setItem("token", result.data.token)
            localStorage.setItem("user", JSON.stringify(result.data.user))
            dispatch({type: "USER", payload:result.data.user})
            setSubmitting(false);
            history.push('/')
         }).catch((err) => {
            setSubmitting(false);
            setMessage({ status: 'error', title: 'Login Failed!', message: err.response.data.message})
            setDisplayMessage(true)
         });
   }
   
   const handleMessage = ({status, title, message}) => (
      <Alert status={status} position="absolute" width="100%">
         <AlertIcon />
         <AlertTitle mr={2}>{title}</AlertTitle>
         <AlertDescription>{message}</AlertDescription>
         <CloseButton position="absolute" right="8px" top="8px" onClick={() => setDisplayMessage(false)} />
      </Alert>
   )

   return (
      <div className="login">
         {
            displayMessage === true &&
            handleMessage(message)
         }
         <div className="login__header"></div>
         <div className="login__body">
            <div className="login__left">
               <h1>To use WhatssApp Clone on Your Computer:</h1>
               <ol>
                  <li>Remember your number phone and password</li>
                  <li>Fill in all login form</li>
                  <li>Happy Chatting!</li>
               </ol>
            </div>
            <div className="login__right">
               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
               >
                  {props => (
                     <div className="login__form">
                        <form onSubmit={props.handleSubmit}>
                           <Field name="phoneNumber">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" isInvalid={form.errors.phoneNumber && form.touched.phoneNumber && form.errors.phoneNumber}>
                                    <FormLabel fontSize='1em' htmlFor="phoneNumber">Phone Number</FormLabel>
                                    <InputGroup>
                                    <InputLeftAddon children="+62" />
                                       <Input
                                          type="tel" 
                                          roundedLeft="0"
                                          {...field}
                                          id="phoneNumber" />
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                                 </FormControl>
                              )}
                           </Field>
                           <Field name="password">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" marginTop="15px" isInvalid={form.errors.password && form.touched.password && form.errors.password}>
                                    <FormLabel fontSize='1em' htmlFor="password">Password</FormLabel>
                                    <Input
                                       {...field}
                                       type="password"
                                       id="password" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                 </FormControl>
                              )}
                           </Field>
                           <Button
                              mt={4}
                              variantColor="teal"
                              isLoading={props.isSubmitting}
                              type="submit"
                           >
                              Submit
                           </Button>
                        </form>
                     </div>
                  )}
               </Formik>

               <Link to="/register" className="login__link">Create a Account</Link>
            </div>
         </div>
      </div>
   )
}

export default Login
