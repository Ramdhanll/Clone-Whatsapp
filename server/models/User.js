const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   phoneNumber: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   photo: {
      type: String,
      default: 'https://res.cloudinary.com/dzehd6loy/image/upload/v1597651172/noimahe_doplgp.png'
   },
   resetToken: String,
   expireToken: Date
})

const User = mongoose.model('User', userSchema)
module.exports = User