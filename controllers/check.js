const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = {
    check: function (username, id, token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        //console.log(decoded.username === username && decoded.usersid === id)
        return decoded.username === username && decoded.usersid === id;
    }
}