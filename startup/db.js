const mongoose = require('mongoose');
const db = process.env.MONGO_URL || 'mongodb://localhost:27017/stickearn'
var crudderScore = require("../api/schema/scoreDefinition").mdbScore

module.exports = function(req, res, next) {
    mongoose.connect(db,{useNewUrlParser: true,useFindAndModify: false,useCreateIndex: true}, function(err, db) {
        if (err) {
            res.status(400).send({'status':false})
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            req.crudder = crudderScore
            next()
            console.log('Connected to Server successfully!');
        }
    });
};

