const express = require('express')
const requireLogin = require('../middleware/requireLogin')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.put('/image', requireLogin, UserController.changeImage)

module.exports = router
