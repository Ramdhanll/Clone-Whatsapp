const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/MessageController')


router.post('/new', MessageController.messageNew)
router.get('/sync', MessageController.sync)

module.exports = router