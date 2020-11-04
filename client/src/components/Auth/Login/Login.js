import React from 'react'
import './Login.css'
import { Formik, Field } from 'formik'
import { Link } from 'react-router-dom'
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
      numberPhone: '',
      password: ''
   }

   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

   const validationSchema = Yup.object().shape({
      numberPhone: Yup.string()
                  .matches(phoneRegExp, 'Phone number is not valid')
                  .required('Phone number is required'),
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
                           <Field name="numberPhone">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" isInvalid={form.errors.numberPhone && form.touched.numberPhone && form.errors.numberPhone}>
                                    <FormLabel fontSize='1em' htmlFor="numberPhone">Phone Number</FormLabel>
                                    <Input
                                       {...field}
                                       id="numberPhone" />
                                    <FormErrorMessage>{form.errors.numberPhone}</FormErrorMessage>
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
