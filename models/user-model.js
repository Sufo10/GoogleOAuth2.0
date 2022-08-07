const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String
});

module.exports = model('User', userSchema);

