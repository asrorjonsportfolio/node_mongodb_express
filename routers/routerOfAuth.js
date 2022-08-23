const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllerOfAuth')

router.route('/signout')
    .get((req, res) => {
        res.send('sign out page')
    })
    .post(controller.signout)

router.route('/signin')
    .get((req, res) => {
        res.send('sign in page')
    })
    .post(controller.signin)

module.exports = router