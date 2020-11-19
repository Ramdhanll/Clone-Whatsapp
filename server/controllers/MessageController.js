const {Messages} = require('../models/Message')


const messageNew = (req, res) => {
   const dbMessage = new Messages(req.body)
   dbMessage.save((err, data) => {
      if (err) return res.status(500).send(err);
      res.status(201).send(data)
   })
   
}

const syncc = (req, res) => {
   Messages.find((err, data) => {
      if (err) res.status(500).send(err)
      res.status(200).send(data)
   })
}

// --------------------------------------------------------------------------------------------
const send = (req, res) => {
   const messages = new Messages(req.body)
   messages.save((err, result) => {
      if(err) return res.status(400).json({ success: false, err})
      res.status(200).json({ success: true, result})
   })
}

const sync = (req, res) => {
   // Messages.find(req.body, (err, messages) => {
   //    if(err) res.status(500).json({ success: false, err})
   //    res.status(200).json({ success: true, messages})
   // })
   Messages.find({$or: [
      { from: req.body.from, to: req.body.to},
      { from: req.body.to, to: req.body.from},
   ]})
   .sort('createdAt')
   .exec((err, messages) => {
      if(err) res.status(500).json({ success: false, err})
      res.status(200).json({ success: true, messages})
   })
   
}

module.exports = {
   messageNew,
   send,
   sync
}