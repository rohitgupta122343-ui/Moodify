
const express = require('express')
const router = express.Router()
const songController = require('../controller/songController')
const upload = require('../middleware/uploadMiddleware')


router.post('/',upload.single('song'),songController.uploadController)

router.get('/',songController.getSong)

module.exports = router