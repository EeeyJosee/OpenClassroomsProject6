const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const credentialSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

credentialSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Credential', credentialSchema);