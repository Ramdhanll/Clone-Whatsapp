import React, { useState } from 'react'
import './Register.css'
import { Formik, Field } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import {
   InputGroup,
   Input,
   InputLeftAddon,
   Button,
   FormControl,
   FormLabel,
   FormErrorMessage,
   FormHelperText,
   Alert,
   AlertIcon,
   AlertTitle,
   AlertDescription,
   CloseButton
   } from "@chakra-ui/core";

function Register(props) {
   const history = useHistory()
   const [displayMessage, setDisplayMessage] = useState(false)
   const [message, setMessage] = useState({})
   const initialValues = {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordConfirmation : ''
   }

   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
   const validationSchema = Yup.object().shape({
      name:Yup.string()
               .required('Name is required!')
               .test('alphabets', 'Name must only contain alphabets', (value) => {
                  return /^[A-Za-z]+$/.test(value);
               }),
      email: Yup.string()
               .email('Email is invalid!')
               .required('Email is required!'),
      phoneNumber: Yup.string()
               .matches(phoneRegExp, 'Phone number is not valid')
               .required('Phone number is required'),
      password: Yup.string()
               .min(6, 'Password must be at least 6 characters')
               .required('Password is required'),
      passwordConfirmation: Yup.string()
               .oneOf([Yup.ref('password'), null], 'Passwords must match')
   })

   const onSubmit = (values, { setSubmitting }) => {         
      axios.post('/auth/register', values)
         .then((result) => {
            setSubmitting(false)
            if(result.data.success){
               setSubmitting(false);
               setMessage({status : 'success', title:'Success Register!', message: result.data.message})
               setDisplayMessage(true)
               setTimeout(() => {
                  history.push('/login')
               },2000)
            }
         })
         .catch((err) => {
               setSubmitting(false)
               setDisplayMessage(true)
               setMessage({status : 'error', title:'Failed Register!', message: err.response.data.message})
         })
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
      <div className="register">
         {
            displayMessage === true &&
            handleMessage(message)
         }
         <div className="register__header"></div>
         <div className="register__body">
            <div className="register__left">
               <h1>To use WhatssApp Clone on Your Computer:</h1>
               <ol>
                  <li>Remember your name, email, number and password</li>
                  <li>Fill in all register form</li>
                  <li>Happy Chatting!</li>
               </ol>
            </div>
            <div className="register__right">
               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
               >
                  {props => (
                     <div className="register__form">
                        <form onSubmit={props.handleSubmit}>
                           <Field name="name">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" isInvalid={form.errors.name && form.touched.name && form.errors.name}>
                                    <FormLabel fontSize='1em' htmlFor="name" mb={1}>Name</FormLabel>
                                    <Input
                                       {...field}
                                       id="name" />
                                    <FormErrorMessage mb={3}>{form.errors.name}</FormErrorMessage>
                                 </FormControl>
                              )}
                           </Field>
                           <Field name="email">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" isInvalid={form.errors.email && form.touched.email && form.errors.email}>
                                    <FormLabel fontSize='1em' htmlFor="email" mb={1} mt={2}>Email</FormLabel>
                                    <Input
                                       {...field}
                                       id="email" />
                                    <FormErrorMessage mb={3}>{form.errors.email}</FormErrorMessage>
                                 </FormControl>
                              )}
                           </Field>
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
                                    <FormLabel fontSize='1em' htmlFor="password" mb={1} mt={1}>password</FormLabel>
                                    <Input
                                       {...field}
                                       type="password"
                                       id="password"
                                       autoComplete="true" />
                                    <FormErrorMessage mb={3}>{form.errors.password}</FormErrorMessage>
                                 </FormControl>
                              )}
                           </Field>
                           <Field name="passwordConfirmation">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" marginTop="15px" isInvalid={form.errors.passwordConfirmation && form.touched.passwordConfirmation && form.errors.passwordConfirmation}>
                                    <FormLabel fontSize='1em' htmlFor="passwordConfirmation" mb={1} mt={1}>Password Confirmation</FormLabel>
                                    <Input
                                       {...field}
                                       type="password"
                                       id="passwordConfirmation"
                                       autoComplete="true" />
                                    <FormErrorMessage mb={3}>{form.errors.passwordConfirmation}</FormErrorMessage>
                                 </FormControl>
                              )}
                           </Field>
                           <Button
                              mt={4}
                              variantColor="teal"
                              isLoading={props.isSubmitting}
                              type="submit"
                           >
                              Register
                           </Button>
                        </form>
                     </div>
                  )}
               </Formik>

               <Link to="/login" className="register__link">Sign in</Link>
            </div>
         </div>
      </div>
   )
}

export default Register
