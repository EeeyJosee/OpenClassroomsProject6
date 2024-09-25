const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageURL: { type: String },
    heat: { type: Number },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: String },
    // an array
    usersDisliked: { type: String }
    // an array
});

module.exports = mongoose.model('Sauce', sauceSchema);

