import React from 'react'
import './Register.css'
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

function Register(props) {
   const initialValues = {
      name: '',
      email: '',
      numberPhone: '',
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
      numberPhone: Yup.string()
               .matches(phoneRegExp, 'Phone number is not valid')
               .required('Phone number is required'),
      password: Yup.string()
               .min(6, 'Password must be at least 6 characters')
               .required('Password is required'),
      passwordConfirmation: Yup.string()
               .oneOf([Yup.ref('password'), null], 'Passwords must match')
   })

   const onSubmit = (values, { setSubmitting }) => {         
         console.log('click!')
         setTimeout(() => {
         alert(JSON.stringify(values, null, 2));
         setSubmitting(false);
         }, 400);
   }
   

   return (
      <div className="register">
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
                           <Field name="numberPhone">
                              {
                              ({ field, form }) => (
                                 <FormControl w="100%" isInvalid={form.errors.numberPhone && form.touched.numberPhone && form.errors.numberPhone}>
                                    <FormLabel fontSize='1em' htmlFor="numberPhone" mb={1} mt={3}>Phone Number</FormLabel>
                                    <Input
                                       {...field}
                                       id="numberPhone" />
                                    <FormErrorMessage mb={3}>{form.errors.numberPhone}</FormErrorMessage>
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
                                       id="password" />
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
                                       id="passwordConfirmation" />
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
