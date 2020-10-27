const {Messages} = require('../models/Message')


const messageNew = (req, res) => {
   const dbMessage = new Messages(req.body)
   dbMessage.save((err, data) => {
      if (err) return res.status(500).send(err);
      res.status(201).send(data)
   })
   
}

const sync = (req, res) => {
   Message.find((err, data) => {
      if (err) res.status(500).send(err)
      res.status(200).send(data)
   })
}

module.exports = {
   messageNew,
   sync
}