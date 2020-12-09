const { get } = require('mongoose');
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

const test = (req, res) => {
   ContactSaved.find(req.body)
   .populate("userTo", "_id photo name phoneNumber email")
   .exec((err, contacts) => {
      const idSaved = contacts.map(contact => contact.userTo._id)
      const queryContactUnsaved = Message.find({$or : [
                  { from: req.body.userFrom, to: {$nin: idSaved }},
                  { from: {$nin: idSaved}, to: req.body.userFrom},
               ]})
               .sort("createdAt")
               .select(`_id read from to text`)
               .populate(`from to`, `_id photo name phoneNumber email`)
               .then(result => result)
      const queryContactSaved = contacts.map((contact) => 
         Message.find({$or: [
            { from: contact.userFrom, to: contact.userTo},
            { from: contact.userTo, to: contact.userFrom},
            // { from: contact.userFrom}
         ]})
         .sort('createdAt')
         .select(`_id read from to text`)
         .then(result => result)
      )
      Promise.all([contacts, queryContactSaved, queryContactUnsaved])
      .then( async ([contacts, saved, unsaved]) => {
         let results = []
         let result = []
         const listUnsaved = []
         // SAVED CODE
         saved.map((value) => {
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


         // UNSAVED CODE
         // mencari id unsaved
         const idListUnsaved = unsaved.map(message => {
            if(JSON.stringify(req.body.userFrom) === JSON.stringify(message.from._id)) return message.to._id.toString()
            return message.from._id.toString()
         })

         // remove duplicated idInsaved
         const filterIdListUnsaved = idListUnsaved.filter((item, i) => idListUnsaved.indexOf(item) === i)
         
         // filter message by contact
         filterIdListUnsaved.forEach(id => {
            listUnsaved.push(new Promise(resolve => {
               const filterMessage = unsaved.filter(message => message.from._id == id || message.to._id == id)
               filterMessage.sort((a, b) => a.createdAt - b.createdAt)
               resolve(filterMessage)
            }))
         })

         const resultsUnsaved = []
         // hitung unread, lastMessage, to, unsaved: true
         Promise.all(listUnsaved).then( async value => {
            value.map(items => {
               resultsUnsaved.push(new Promise(resolve => {
                  const data = {}
                  const userTo = items.find(item => item.from._id == req.body.userFrom)
                  if(userTo !== undefined) data.to = userTo.to._id
                  
                  const unread = items.filter(item => item.read == false && item.from._id != req.body.userFrom )
                  if(unread.length > 0) data.to = unread[0].from._id
                  data.unread = unread.length
                  data.lastMessage = items[items.length - 1].text
                  if(userTo !== undefined) {
                     data.contact = {}
                     data.contact.onChat = true
                     data.contact.unsaved = true
                     data.contact.userTo = userTo.to
                  } else if(unread.length > 0) {
                     data.contact = {}
                     data.contact.onChat = true
                     data.contact.unsaved = true
                     data.contact.userTo = unread[0].from
                  }
                  resolve(data)
               }))
            })

            // Merge array saved & unsaved
            results = newArr.concat(await Promise.all(resultsUnsaved))
            
            res.status(200).json({success: true, contacts: results})
         })

         
         
         /**
          * NEXT
          * hitung unread, lastMessage, to, unsaved: true
          * fetch user by to
          * jogres data
          * jogres data lagi ke contactsaved
          */
      })


   })
}

const syncOnChat = async (req, res) => {
   ContactSaved.find(req.body)
      .populate("userTo", "_id photo name phoneNumber email")
      .exec((err, contacts) => {
         Promise.all([contacts, contacts.map((contact) => 
            Message.find({$or: [
               { from: contact.userFrom, to: contact.userTo},
               { from: contact.userTo, to: contact.userFrom},
               // { from: contact.userFrom}
            ]})
            .sort('createdAt')
            .select(`_id read from to text`)
            .then(result => result)
         )])
         .then( async([contacts, messages]) => {
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
   test
}