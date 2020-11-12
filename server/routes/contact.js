const express = require('express')
const router = express.Router()
const ContactController = require('../controllers/ContactController')
const requireLogin = require('../middleware/requireLogin')

router.post('/search', requireLogin, ContactController.searchContact)

module.exports = router