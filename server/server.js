const express = require('express')
const config = require('./config/key')
const mongoose = require('mongoose')
const { pusher } = require('./helpers/Pusher')
const cors = require('cors')

// app config
const app = express()
const PORT = process.env.PORT || 9000

// middleware
app.use(express.json())
app.use(cors())

// route
app.get('/', (req, res) => {
   res.send('server is running on')
})
app.use('/api/v1/message', require('./routes/message'))


// DB Config
mongoose.connect(config.mongoURI, 
   {
      useCreateIndex: true,
      useNewUrlParser: true, 
      useUnifiedTopology: true,
   }).then((result) => {
      console.log('Connected!')
      const messageCollection = result.connection.collection('messages')
      const changeSteram = messageCollection.watch()
      changeSteram.on('change', (change) => {
         console.log(change)

         if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted', {
               name: messageDetails.name,
               message: messageDetails.message
            })
         }
      })
   }).catch((err) => {
      console.log('Failed Connect')
   });



app.listen(PORT, () => {
   console.log(`Server listening on: ${PORT}`)
})