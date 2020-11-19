const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const messageSchema = mongoose.Schema({
   // BARU
   from: {
      type: ObjectId,
      ref: "User"
   },
   to: {
      type: ObjectId,
      ref: "User"
   },
   text: {
      type: String
   },
   read: {
      type: Boolean,
      default: false
   }

   // LAMA
   // message: {
   //    type: String
   // },
   // name: {
   //    type: String
   // },
   // received: {
   //    type: Boolean
   // },
   // timestamp: {
   //    type: String
   // }
}, { timestamps: true })

const Messages = mongoose.model('Message', messageSchema)

module.exports = {Messages}