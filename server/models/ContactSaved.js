const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const ContactSavedSchema = mongoose.Schema({
   userTo: {
      type: ObjectId,
      ref: "User"
   },
   userFrom: {
      type: ObjectId,
      ref: "User"
   },
   onChat: {
      type: Boolean,
      default: false
   }
}, { timestamps: true})

const ContactSaved = mongoose.model("ContactSaved", ContactSavedSchema)

module.exports = ContactSaved