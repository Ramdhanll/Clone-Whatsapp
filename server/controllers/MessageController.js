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
         const mapContacts = contacts.map((contact, index) => 
            Message.find({$or: [
               { from: contact.userFrom, to: contact.userTo},
               { from: contact.userTo, to: contact.userFrom},
            ]})
            .sort('createdAt')
            .select(`_id read from to text`)
         )
   
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
         .then(async (value) => {
               let result = []
               value[1].map((value) => {
                  result.push(new Promise((resolve) => {
                     value.then(result => {
                        const data = {}
                        if(result.length > 0) {
                           let unread = result.filter(item => {
                              return item.read === false && item.from !== req.body.userFrom
                           })
                           data.to = unread[0].to
                           data.unread = unread.length
                           data.lastMessage = unread[unread.length - 1].text
                           resolve(data)
                        }
                        resolve(data)
                     })
                  }))
               })
               const tempResult = await Promise.all(result)
               const newArr = tempResult.filter(item => {
                  if(Object.entries(item).length !== 0) {
                     return item
                  }
               }).map(function(res){
                  let contacts = value[0].find((contact, i) => {
                     console.log(JSON.stringify(contact.userTo._id))
                     if(JSON.stringify(contact.userTo._id) === JSON.stringify(res.to)) {
                        console.log('ada')
                        value[0].splice(i, 1)
                        return contact
                     } 
                  })
                  // 5fc3b34a2745a4227c078d4b 5fc3b34a2745a4227c078d4b
                  
                  return {
                     ...res,
                     contacts
                  }               
               })
               newArr.push(...value[0])

               // let asd = value[0].find(contact => contact.userTo == '5fad3825b8ab4924f831aed1')

               res.send(newArr)
         })
      })
}

module.exports = {
   messageNew,
   send,
   sync,
   syncOnChat
}