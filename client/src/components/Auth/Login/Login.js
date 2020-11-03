import React from 'react'
import './Login.css'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import {
   Input,
   Button,
   FormControl,
   FormLabel,
   FormErrorMessage,
   FormHelperText,
   } from "@chakra-ui/core";

function Login(props) {
   const initialValues = {
      email: '',
      password: ''
   }

   const validationSchema = Yup.object().shape({
      email: Yup.string()
               .email('Email is invalid!')
               .required('Email is required!'),
      password: Yup.string()
               .min(6, 'Password must be at least 6 characters')
               .required('Password is required')
   })

   const onSubmit = (values, { setSubmitting }) => {         
         console.log('click!')
         setTimeout(() => {
         alert(JSON.stringify(values, null, 2));
         setSubmitting(false);
         }, 400);
   }
   

   return (
      <div className="login">
         <div className="login__header"></div>
         <div className="login__body">
            <div className="login__left">
               <h1>To use WhatssApp Clone on Your Computer:</h1>
               <ol>
                  <li>Remember your number and password</li>
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
                           <Field name="email">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" isInvalid={form.errors.email && form.touched.email && form.errors.email}>
                                    <FormLabel fontSize='1em' htmlFor="email">Email</FormLabel>
                                    <Input
                                       {...field}
                                       id="email" 
                                       placeholder="email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                 </FormControl>
                              )}
                           </Field>
                           <Field name="password">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" marginTop="15px" isInvalid={form.errors.password && form.touched.password && form.errors.password}>
                                    <FormLabel fontSize='1em' htmlFor="password">password</FormLabel>
                                    <Input
                                       {...field}
                                       type="password"
                                       id="password" 
                                       placeholder="password" />
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
            </div>
            
         </div>
      </div>
   )
}

export default Login
