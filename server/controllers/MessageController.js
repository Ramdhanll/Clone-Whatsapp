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
      // update `value read` pesan yang dikirim pengirim menjadi `true`
      Message.updateMany({from: req.body.to, to: req.body.from, read: false}, {read: true})
      .then(() => {
         // filter pesan yang mempunyai message.from = id pengirim dan message.readnya = true
         messages.filter(message => JSON.stringify(message.from) === JSON.stringify(req.body.to) && message.read === false)
         .map(message => message.read = true)
         
         res.status(200).json({ success: true, messages})
      })
      
   })
   
}

const syncOnChat = async (req, res) => {
   ContactSaved.find(req.body)
      .populate("userTo", "_id photo name phoneNumber email")
      .exec((err, contacts) => {
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
               let result = []
               messages.map((value) => {
                  // push data pada variable result
                  result.push(new Promise((resolve) => {
                     value.then(item => {
                        const data = {}
                        const userTo = item.find(item => {
                           if(JSON.stringify(item.from) === JSON.stringify(req.body.userFrom)) return item
                        })

                        if(userTo !== undefined) data.to = userTo.to
                        if(item.length > 0) {
                           let unread = item.filter(item => {
                              return item.read === false && JSON.stringify(item.from) !== JSON.stringify(req.body.userFrom)
                           })
                           if(unread.length > 0) data.to = unread[0].from

                           data.unread = unread.length
                           data.lastMessage = item[item.length - 1].text
                           resolve(data)
                        }
                        resolve(data)
                     })
                  }))

                  value.then(result => {
                     result.read = true
                  })
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

               // readChat('halooo')
               res.status(200).json({ success: true, contacts: newArr})
         })
      })
}

module.exports = {
   messageNew,
   send,
   sync,
   syncOnChat,
}