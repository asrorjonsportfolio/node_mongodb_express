const mongodb = require('mongodb')
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    getmytweets: function (req, res) {
        const {textoftweet, data, username} = req.body
        const {token} = req.cookie
    },
    addnewtweet: function (req, res) {

    },
    addnewcomment: function (req, res) {

    },
    likeontweet: function (req, res) {

    },
    likeoncomment: function (req, res) {

    }
}