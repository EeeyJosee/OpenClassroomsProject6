const mongoose = require('mongoose');

const requiredStringType = { type: String, required: true };

const sauceSchema = mongoose.Schema({
    userId: requiredStringType,
    name: requiredStringType,
    manufacturer: requiredStringType,
    description: requiredStringType,
    mainPepper: requiredStringType,
    imageUrl: requiredStringType,
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true }
});

module.exports = mongoose.model('Sauce', sauceSchema);

