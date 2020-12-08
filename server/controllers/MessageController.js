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

      // get id unsaved
      // Message.find({$or : [
      //             { from: req.body.userFrom, to: {$nin: idSaved }},
      //             { from: {$nin: idSaved}, to: req.body.userFrom},
      //          ]})
      //          .sort("createdAt")
      //          .select(`_id from to`)
      //          .exec((err, doc) => {
      //             if(err) res.status(500).send('server error')

      //             const getId = doc.map(item => JSON.stringify(item.from) === JSON.stringify(req.body.userFrom) ? item.to.toString() : item.from.toString())
      //                               .filter(item => JSON.stringify(item) !== JSON.stringify(req.body.userFrom))

      //             const temp = Array.from(new Set(getId))
                  
      //             res.send(temp)
      //          })

      const queryUnsaved = Message.find({$or : [
                  { from: req.body.userFrom, to: {$nin: idSaved }},
                  { from: {$nin: idSaved}, to: req.body.userFrom},
               ]})
               .sort("createdAt")
               .select(`_id read from to text`)
               .populate(`from to`, `_id photo name phoneNumber email`)
               .then(result => result)

      Promise.all([contacts, queryUnsaved])
      .then( async ([contacts, messages]) => {
         let results = []
         const listUnsaved = []

         // mencari id unsaved
         const idListUnsaved = messages.map(message => {
            console.log(message)
            if(JSON.stringify(req.body.userFrom) === JSON.stringify(message.from._id)) return message.to._id.toString()
            return message.from._id.toString()
         })

         // remove duplicated idInsaved
         const filterIdListUnsaved = idListUnsaved.filter((item, i) => idListUnsaved.indexOf(item) === i)
         
         // filter message by contact
         filterIdListUnsaved.forEach(id => {
            listUnsaved.push(new Promise(resolve => {
               const filterMessage = messages.filter(message => message.from._id == id || message.to._id == id)
               filterMessage.sort((a, b) => a.createdAt - b.createdAt)
               console.log(filterMessage)
               resolve(filterMessage)
            }))
         })

         res.send(await Promise.all(listUnsaved))

         /**
          * NEXT
          * hitung unread, lastMessage, to, unsaved: true
          * fetch user by to
          * jogres data
          * jogres data lagi ke contactsaved
          */

         
      //    // messages.map(message => {
      //    //    results.push(new Promise(resolve => {
      //    //       const data = {}
      //    //       data.unsaved = true
      //    //       const userTo = messages.find(item => {
      //    //          if(JSON.stringify(item.from) === JSON.stringify(req.body.userFrom)) return item
      //    //       })
      //    //       if(userTo !== undefined) data.to = userTo.to
               
      //    //       if(messages.length > 0) {
      //    //          let unread = messages.filter(item => {
      //    //             return item.read === false && JSON.stringify(item.from) !== JSON.stringify(req.body.userFrom)
      //    //          })
      //    //          if(unread.length > 0) data.to = unread[0].from

      //    //          data.unread = unread.length
      //    //          data.lastMessage = messages[messages.length - 1].text
      //    //          resolve(data)
      //    //       }
      //    //       resolve(data)
      //    //    }))
      //    // })

      //    /**
      //     * "contacts": [
      //       {
      //          "to": "5fae8ca5600004258c3490cd",
      //          "unread": 0,
      //          "lastMessage": "uban",
      //          "contact": {
      //          "onChat": true,
      //          "_id": "5fce106529863e36d0525bfd",
      //          "userTo": {
      //             "photo": "https://res.cloudinary.com/dzehd6loy/image/upload/v1597651172/noimahe_doplgp.png",
      //             "_id": "5fae8ca5600004258c3490cd",
      //             "name": "uban",
      //             "email": "uban@gmail.com",
      //             "phoneNumber": "2133221166"
      //          },
      //          "userFrom": "5fad3903b8ab4924f831aed2",
      //          "createdAt": "2020-12-07T11:22:13.192Z",
      //          "updatedAt": "2020-12-07T17:07:33.146Z",
      //          "__v": 0
      //          }
      //       },
      //     */
      //    // messages.map(message => {
      //    //    results.push(new Promise(resolve => {
      //    //       message.then(item => {
      //    //          console.log(item)
      //    //          const data = {}

      //    //          const userTo = item.find(item => {
      //    //             if(JSON.stringify(item.from) === JSON.stringify(req.body.userFrom)) return item
      //    //          })
      //    //          if(userTo !== undefined) data.to = userTo.to
                  
      //    //          if(item.length > 0) {
      //    //             let unread = item.filter(item => {
      //    //                return item.read === false && JSON.stringify(item.from) !== JSON.stringify(req.body.userFrom)
      //    //             })
      //    //             if(unread.length > 0) data.to = unread[0].from

      //    //             data.unread = unread.length
      //    //             data.lastMessage = item[item.length - 1].text
      //    //             resolve(data)
      //    //          }
      //    //          resolve(data)
      //    //       })
      //    //    }))
      //    // })
         
      //    /**
      //     * Terakhir : berhasil fetch api unsaved (kayanya)
      //     */


         // res.send(await Promise.all(results))
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