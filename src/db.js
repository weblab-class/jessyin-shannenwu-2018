const mongoose = require('mongoose');

// setup mongoDB connection
const mongoURL = process.env.MLAB_URL;
const options = {
    useMongoClient: true
};
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
    console.log('database connected');
});
module.exports = db;
