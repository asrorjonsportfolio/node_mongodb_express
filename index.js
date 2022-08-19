const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const port = process.env.PORT

app.use('/', require('./routers/router'))

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