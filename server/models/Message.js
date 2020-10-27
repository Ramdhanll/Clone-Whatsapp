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

const Messages = mongoose.model('Messages', messageSchema)

module.exports = {Messages}