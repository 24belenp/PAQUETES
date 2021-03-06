const mongoose = require('mongoose');
const DB_URL = (process.env.MONGO_URL || 'mongodb://db/test');

const dbConnect = function() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    return mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
   // return mongoose.connect("mongodb+srv://bel_package:fis2021@cluster0.m9znp.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = dbConnect;

