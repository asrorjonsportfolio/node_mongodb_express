const mongodb = require('mongodb')
const database = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    signout: async function (req, res) {
        let {
            fullname,
            username,
            password,
            mail,
            phone
        } = req.body
        console.log(req.body)
        console.log(password)
        console.log(fullname)
        let db = database.getDb(process.env.DB)

        let existmail = await db
            .collection('users')
            .findOne({mail})
        let existusername = await db
            .collection('users')
            .findOne({username})

        if (existmail && existusername) res.send('mail and username already exist')
        else if (existmail) res.send('mail already exists')
        else if (existusername) res.send('username already exists')

        password = await bcrypt.hash(password, 5)
        await db
            .collection('users')
            .insertOne({
                fullname,
                username,
                password,
                mail,
                phone
            })
        res
            .status(201)
            .send({message: "user has been created"})
    },

    signin: async function (req, res) {
        const {
            username,
            password
        } = req.body
        let db = database.getDb(process.env.DB)

        const existuser = await db
            .collection('users')
            .findOne({username})
        if (existuser) {
            const ispasswordvalid = await bcrypt.compare(password, existuser.password)
            if (ispasswordvalid) {
                const token = jwt.sign(
                    {
                        username: existuser.username,
                        usersid: existuser._id.toString()
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    })
                res
                    .status(201)
                    .cookie('token', token, {
                        path: '/',
                        expires: new Date(Date.now() + 60 * 60 * 1000),
                        httpOnly: true
                    })
                    .cookie('usersid', existuser._id.toString(), {
                        path: '/',
                        expires: new Date(Date.now() + 60 * 60 * 1000),
                        httpOnly: true,
                    })
                    .cookie('username', existuser.username, {
                        path: '/',
                        expires: new Date(Date.now() + 60 * 60 * 1000),
                        httpOnly: true
                    })
                    .send({
                        userdata: {
                            usersid: existuser._id.toString(),
                            fullname: existuser.fullname,
                            username: existuser.username,
                            mail: existuser.mail,
                            phone: existuser.phone,
                            token
                        }
                    })
            } else res.send("password is not valid")
        } else res.send("username hasn't been found")
    }
}
