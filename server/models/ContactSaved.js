const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const ContactSavedSchema = mongoose.Schema({
   userTo: {
      type: ObjectId,
      ref: "User"
   },
   UserFrom: {
      type: ObjectId,
      ref: "User"
   }
}, { timestamps: true})

const ContactSaved = mongoose.model("ContactSaved", ContactSavedSchema)

module.exports = ContactSaved