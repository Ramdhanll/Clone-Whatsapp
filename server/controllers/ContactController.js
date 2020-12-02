const ContactSaved = require('../models/ContactSaved')
const Message = require('../models/Message')
const User = require('../models/User')

const contactSaved = (req, res) => {
   const contactSaved = new ContactSaved(req.body)

   contactSaved.save((err, doc) => {
      if(err) return res.status(400).json({ success: false, err})
      contactSaved.populate("userTo", "_id photo name phoneNumber email", (err, contactSaved) => {
         let result = {
            userTo: contactSaved.userTo,
            _id: contactSaved._id
         }
         res.status(200).json({ success: true, result})
      })
   })
}

const getContactSaved = (req, res) => {
   ContactSaved.find(req.body)
   .select("_id userTo onChat")
   .populate("userTo", "_id photo name phoneNumber email")
   .exec((err, contacts) => { 
      if(err) res.status(400).json({ success: false, err})
      res.status(200).json({ success: true, contacts})
   })
}

const searchContact = (req, res) => {
   let userPattern = new RegExp(req.body.query)

   User.find( {$or: [
      {name : {$regex : userPattern, $options: 'i'}},
      {phoneNumber : {$regex : userPattern, $options: 'i'}}
   ]})
   .select("_id name phoneNumber photo")
   .then((contacts) => {
      res.status(200).json({ success: true, contacts})
   }).catch((err) => {
      res.status(400).json({ success: false, err})
   });
}

const onChatTrue = (req, res)  => {
   ContactSaved.findByIdAndUpdate(req.body, {
      onChat: true
   }, {
      new: true
   })
   .select("_id userTo onChat")
   .populate("userTo", "_id photo name phoneNumber email")
   .exec((err, contacts) => {
      if(err) res.status(400).json({ success: false, err})
      res.status(200).json({ success: true, contacts})
   })
}

const deleteChat = (req, res)  => {
   ContactSaved.findByIdAndUpdate(req.body, {
      onChat: false
   }, {
      new: true
   })
   .select("_id userTo onChat")
   .populate("userTo", "_id photo name phoneNumber email")
   .exec((err, contacts) => {
      if(err) res.status(400).json({ success: false, err})
      res.status(200).json({ success: true, contacts})
   })
}


module.exports = {
   contactSaved,
   getContactSaved,
   searchContact,
   onChatTrue,
   deleteChat
}