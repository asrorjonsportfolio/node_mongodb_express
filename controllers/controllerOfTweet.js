const mongodb = require('mongodb')
const database = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check} = require("./check");
require('dotenv').config()

module.exports = {
    getuserstweets: async function (req, res, next) {
        const {username} = req.params
        let db = database.getDb(process.env.DB)

        let user = await db
            .collection('users')
            .findOne({username})
        if (user) {
            let usersid
            usersid = user._id.toString()
            const mytweets = await db
                .collection('tweets')
                .find({usersid})
                .toArray()
            res.status(201).send(mytweets)
            next()
        } else {
            res.status(401).send("this user doesn't exist")
            next()
        }
    },
    getcomments: async function (req, res, next) {
        const {tweetsid} = req.body
        let db = database.getDb(process.env.DB)

        const tweetscomments = await db
            .collection('comments')
            .find({tweetsid})
            .toArray()
        res.status(201).send(tweetscomments)
        next()
    },
    addtweet: async function (req, res) {
        const {newtweet} = req.body
        const {username, usersid, token} = req.cookies
        if (check(username, usersid, token)) {
            let db = database.getDb(process.env.DB)
            await db
                .collection('tweets')
                .insertOne({
                    usersid,
                    tweet: newtweet,
                    data: Date.now()
                })
            res.status(201).send('tweet has been added')
        } else res.status(201).send('check false')
    },
    addcomment: async function (req, res, next) {
        const {tweetsid} = req.params
        const {comment} = req.body
        const {token, usersid, username} = req.cookies
        if (check(username, usersid, token)) {
            let db = database.getDb(process.env.DB)
            await db
                .collection('comments')
                .insertOne({
                    comment,
                    usersid,
                    tweetsid,
                    data: Date.now()
                })
            res.status(201).send('comment has been added')
            next()
        }
    },
    liketweet: function (req, res) {

    },
    likecomment: function (req, res) {

    }
}