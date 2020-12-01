const express = require('express')
const router = express.Router()
const {pusher} = require('../helpers/Pusher')

router.post("/auth", (req, res) => {
   const socketId = req.body.socket_id;
   const channel = req.body.channel_name;
   const auth = pusher.authenticate(socketId, channel);
   res.send(auth);
})

module.exports = router
