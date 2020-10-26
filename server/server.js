const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
const config = require('./config/key')
const bodyParser = require('body-parser')

// middleware
app.use(express.json())

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
   .then(() => { console.log('MongoDB connected!')})
   .catch((err) => { console.log('Error', err) });

app.use('/api/v1/message', require('./routes/message'))



app.listen(PORT, () => {
   console.log(`Server listening on: ${PORT}`)
})