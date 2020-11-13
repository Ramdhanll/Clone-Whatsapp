const express = require('express')
const router = express.Router()
const ContactController = require('../controllers/ContactController')
const requireLogin = require('../middleware/requireLogin')

router.post('/search', requireLogin, ContactController.searchContact)
router.post('/saved', requireLogin, ContactController.contactSaved)
router.post('/get', requireLogin, ContactController.getContactSaved)

module.exports = router