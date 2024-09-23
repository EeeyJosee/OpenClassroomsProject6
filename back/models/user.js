const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true }
});