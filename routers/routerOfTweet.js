const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllerOfTweet')

router.get('/mytweets', controller.getmytweets)

router.post('/addtweet', controller.addnewtweet)

router.post('/:tweetid', controller.addnewcomment)

module.exports = router