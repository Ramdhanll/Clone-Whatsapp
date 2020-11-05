const User = require('../models/User')
const crypto = require('crypto') // digunakan untuk membuat randomBytes untuk reset password
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/key')

const register = (req, res) => {
   const { name, email, phoneNumber, password } = req.body

   if(!name) return res.status(422).json({ success: false, message: 'the name field is required!'})
   if(!email) return res.status(422).json({ success: false, message: 'the email field is required!'})
   if(!phoneNumber) return res.status(422).json({ success: false, message: 'the phone number field is required!'})
   if(!password) return res.status(422).json({ success: false, message: 'the password field is required!'})

   User.find({
      $or: [{ phoneNumber: phoneNumber}, { email: email }]
   })
      .then((result) => {
         if(result.length > 0){
            const data = result[0]
            if(data.email === email) return res.status(422).json({success: false, message: 'user already exist with that email'})
            if(data.phoneNumber === parseInt(phoneNumber)) return res.status(422).json({success: false, message: 'user already exist with that phone number'})
            return res.status(500).send('something wrong')
         } else {
            const user = new User({
               name, email, phoneNumber, password
            })
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(user.password, salt, (err, hash) => {
                  if(err) throw err
                  user.password = hash
                  user.save()
                  .then((result) => {
                     res.status(200).json({ success: true, mesage: 'saved successfully'})
                  }).catch((err) => {
                     res.status(422).json("saved failed")
                  });
               })
            })
         }
      })
      .catch((err) => {
         console.log(err)
      });
      
}

module.exports = {
   register
}