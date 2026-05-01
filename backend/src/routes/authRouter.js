
const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const isLoggedIn = require('../middleware/isLoggedIn')

router.post('/register',authController.registerController)
router.post('/login',authController.loginController)
router.get('/get-me',isLoggedIn,authController.getMe)
router.get('/logout',isLoggedIn,authController.logoutController)


module.exports = router