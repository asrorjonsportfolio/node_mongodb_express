const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllerOfTweet')

router.get('/:username/userstweets', controller.getuserstweets)

router.post('/addtweet', controller.addtweet)

router.post('/:tweetsid/addcomment', controller.addcomment)

module.exports = router