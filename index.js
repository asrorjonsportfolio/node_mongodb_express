const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const db = require('./db')
require('dotenv').config()
const port = process.env.PORT

//app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.get('/', (req, res) => {
    res.send('main page')
})
app.use('/tweet', require('./routers/routerOfTweet'))
app.use('/auth', require('./routers/routerOfAuth'))

async function start() {
    db.connectToServer(function (err) {
        if (err) console.error(err);
    });
    app.listen(port, () => {
        // perform a database connection when server starts
        console.log(`Server is running on port: ${port}`);
    });
    return "It's working";
}

start().then(result => console.log(result));