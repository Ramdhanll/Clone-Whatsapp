const jwt = require('jsonwebtoken')
const { JWT_SECRET} = require('../config/key')
const User = require('../models/User')

module.exports = (req, res, next) => {
   const {authorization} = req.headers

   if(!authorization) return res.status(422).json({ succes: false, message: 'you must be logged in'})

   const token = authorization.replace(`Bearer `, "")
   jwt.verify(token, JWT_SECRET, (err, payload) => {
      if(err) return res.status(422).json({ success: false, message: 'your token is expired!'})

      const {_id} = payload
         User.findById(_id)
            .then((result) => {
               req.user = result
               next()
            })
   })
}