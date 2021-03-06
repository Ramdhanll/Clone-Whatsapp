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
                     res.status(200).json({ success: true, message: 'Registration is successfully'})
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

const login = (req, res) => {
   const { phoneNumber, password} = req.body

   if(!phoneNumber) return res.status(422).json({ success: false, message: 'the field phone number is required!'})
   if(!password) return res.status(422).json({ success: false, message: 'the field password is required!'})

   User.findOne({ phoneNumber: phoneNumber})
   .then((result) => {
      if(!result) return res.status(422).json({ success: false, message: 'Invalid phone number!'})
      bcrypt.compare(password, result.password, (err, isMatch) => {
         if(err) res.status(422).json({ success: false, message: 'Invalid password'})
         if(isMatch) {
            const token = jwt.sign({ _id: result._id}, JWT_SECRET)
            const { _id, name, email, phoneNumber, photo} = result
            res.status(200).json({ success: true, token: token, user: { _id, name, email, phoneNumber, photo}})
         } else {
            res.status(422).json({ success: false, message: 'Invalid password'})
         }
      })
   }).catch((err) => {
      return res.status(500).json({ success: false, message: 'server down!'})
   });
}

module.exports = {
   register,
   login
}