const {MongoClient} = require("mongodb");
require("dotenv").config();
const url = process.env.URL;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db) {
                _db = db.db(process.env.DB);
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
};