const ContactSaved = require('../models/ContactSaved');
const Message = require('../models/Message')


const messageNew = (req, res) => {
   const dbMessage = new Message(req.body)
   dbMessage.save((err, data) => {
      if (err) return res.status(500).send(err);
      res.status(201).send(data)
   })
   
}

// --------------------------------------------------------------------------------------------
const send = (req, res) => {
   const messages = new Message(req.body)
   messages.save((err, message) => {
      if(err) return res.status(400).json({ success: false, err})
      res.status(200).json({ success: true, message})
   })
}

const sync = (req, res) => {
   Message.find({$or: [
      { from: req.body.from, to: req.body.to},
      { from: req.body.to, to: req.body.from},
   ]})
   .sort('createdAt')
   .exec((err, messages) => {
      if(err) res.status(500).json({ success: false, err})
      res.status(200).json({ success: true, messages})
   })
   
}

const syncOnChat = async (req, res) => {
   ContactSaved.find(req.body)
      .populate("userTo", "_id photo name phoneNumber email")
      .exec((err, contacts) => {
         // return res.send(contacts)
         // const mapContacts = contacts.map((contact, index) => 
         //    Message.find({$or: [
         //       { from: contact.userFrom, to: contact.userTo},
         //       { from: contact.userTo, to: contact.userFrom},
         //    ]})
         //    .sort('createdAt')
         //    .select(`_id read from to text`)
         // )
   
         Promise.all([contacts, contacts.map((contact, index) => 
            Message.find({$or: [
               { from: contact.userFrom, to: contact.userTo},
               { from: contact.userTo, to: contact.userFrom},
            ]})
            .sort('createdAt')
            .select(`_id read from to text`)
            .then(result => result)
            .then(result => result)
         )])
         .then(async([contacts, messages]) => {
            // return res.send(messages)
               let result = []
               messages.map((value) => {
                  result.push(new Promise((resolve) => {
                     value.then(result => {
                        const data = {}
                        const userTo = result.find(item => {
                           if(JSON.stringify(item.from) === JSON.stringify(req.body.userFrom)) return item
                        })

                        if(result.length > 0) {
                           let unread = result.filter(item => {
                              return item.read === false && JSON.stringify(item.from) !== JSON.stringify(req.body.userFrom)
                           })
                           data.to = userTo.to
                           data.unread = unread.length
                           data.lastMessage = result[result.length - 1].text
                           resolve(data)
                        }
                        resolve(data)
                     })
                  }))
               })
               // tunggu sampai result mendapatkan value
               const tempResult = await Promise.all(result)
               // filter value tempResult yang kosong
               const newArr = tempResult.filter(item => {
                  if(Object.entries(item).length !== 0) {
                     return item
                  }
               })
               .map(function(res){
                  let contact = contacts.find((contact, i) => {
                     if(JSON.stringify(contact.userTo._id) === JSON.stringify(res.to)) {
                        contacts.splice(i, 1) // setelah mendapatkan lalu hapus data pada contacts
                        return contact
                     } 
                  })
                  
                  return {
                     ...res,
                     contact
                  }               
               })

               // sisa dari contacts di push ke newArr
               contacts.map(contact => newArr.push({contact: contact}))

               res.status(200).json({ success: true, contacts: newArr})
         })
      })
}

module.exports = {
   messageNew,
   send,
   sync,
   syncOnChat
}