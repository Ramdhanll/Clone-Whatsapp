const express = require('express')
const config = require('./config/key')
const mongoose = require('mongoose')
const { pusher } = require('./helpers/Pusher')
const cors = require('cors')
const User = require('./models/User')

// app config
const app = express()
const PORT = process.env.PORT || 9000

// middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   next()
})

// route
app.get('/', (req, res) => {
   res.send('server is running on')
})
app.use('/api/v1/message', require('./routes/message'))
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/contact', require('./routes/contact'))
app.use('/api/v1/pusher', require('./routes/pusher'))


// DB Config
mongoose.connect(config.mongoURI, 
   {
      useCreateIndex: true,
      useNewUrlParser: true, 
      useUnifiedTopology: true,
   }).then((result) => {
      console.log('DB Connected!')
      const messageCollection = result.connection.collection('messages')
      const changeSteram = messageCollection.watch()
      changeSteram.on('change', (change) => {
         if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            User.findById(messageDetails.from)
            .exec((err, doc) => {
               pusher.trigger(`private-${messageDetails.to}`, 'inserted', {
                  contact: doc,
                  message: messageDetails
               })
            })
         }
      })
   }).catch((err) => {
      console.log('Failed Connect', err)
   });



app.listen(PORT, () => {
   console.log(`Server listening on: ${PORT}`)
})