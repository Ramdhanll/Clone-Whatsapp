const ContactSaved = require('../models/ContactSaved')
const User = require('../models/User')

const contactSaved = (req, res) => {
   const contactSaved = new ContactSaved(req.body)

   contactSaved.save((err, doc) => {
      if(err) return res.status(400).json({ success: true, err})
      return res.status(200).json({ success: true })
   })
}

const searchContact = (req, res) => {
   let userPattern = new RegExp(req.body.query)

   User.find( {$or: [
      {name : {$regex : userPattern, $options: 'i'}},
      {phoneNumber : {$regex : userPattern, $options: 'i'}}
   ]})
   .select("_id name phoneNumber")
   .then((contacts) => {
      res.status(200).json({ success: true, contacts})
   }).catch((err) => {
      res.status(400).json({ success: false, err})
   });
}



module.exports = {
   contactSaved,
   searchContact
}