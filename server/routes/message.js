const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/MessageController')
const requireLogin = require('../middleware/requireLogin')

router.post('/new', MessageController.messageNew)
router.get('/syncc', MessageController.sync)
router.post('/send', requireLogin, MessageController.send)
router.post('/sync', requireLogin, MessageController.sync)
module.exports = router