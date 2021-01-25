const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');

const apiKeySchema = new mongoose.Schema ({
    user: String,
    apikey: String
});

apiKeySchema.pre('save', function(next) {
    const user = this;
    user.apikey =uuidv4();
    next();
});

const Apikey = mongoose.model('ApiKey', apiKeySchema);
module.exports = Apikey