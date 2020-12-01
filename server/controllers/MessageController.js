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
   let result = []
   ContactSaved.find(req.body)
      .exec((err, contacts) => {
            Promise.all(contacts.map((contact, index) => 
               Message.find({$or: [
                  { from: contact.userFrom, to: contact.userTo},
                  { from: contact.userTo, to: contact.userFrom},
               ]})
               .sort('createdAt')
               .select(`_id read from to text`)
            ))
            .then((value) => {
               console.log(value)
               for(let i = 0; i < value.length; i++) {
                  let data = {}
                  let unread = value[i].filter(item => {
                     return item.read === false && item.from !== req.body.userFrom
                  })
                  data.to = unread[0].to
                  data.count = unread.length,
                  data.lastMessage = value[i][value[i].length - 1].text

                  result.push(data)
               }
               res.send(result)
            })
            
            })
            // console.log('result', typeof result)
            // res.send('success')
            /**
             * Promise.all(map((contact, index) => // { dihapus
                  Message.find....
               ).then(() => console.log(result));
             */

             /**
              * Kamu masih coding secara sync, padahal code nya async
               Harusnya result map nya berupa hasil find itu
               Yg mana adalah promise
               Lalu baru promise all si array hasil map nya ini
              */
            
            // if(contacts.length === index + 1) console.log('hasil', result)

   // Message.find({$or: [
   //    { from: req.body.from, to: req.body.to},
   //    { from: req.body.to, to: req.body.from},
   // ]})
   // .sort('createdAt')
   // .exec((err, messages) => {
   //    if(err) res.status(500).json({ success: false, err})
   //    res.status(200).json({ success: true, messages})
   // })
   
}

module.exports = {
   messageNew,
   send,
   sync,
   syncOnChat
}