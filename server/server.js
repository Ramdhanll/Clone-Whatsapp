const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
const config = require('./config/key')

app.get('/', (req, res) => {
   res.send('server is running on')
})


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, 
   {
      useCreateIndex: true,
      useNewUrlParser: true, 
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('MongoDB connected!')
   }).catch((err) => {
      console.log('Error', err)
   });




app.listen(PORT, () => {
   console.log(`Server listening on: ${PORT}`)
})