const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
   message: {
      type: String
   },
   name: {
      type: String
   },
   received: {
      type: Boolean
   },
   timestamp: {
      type: String
   }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = {Message}