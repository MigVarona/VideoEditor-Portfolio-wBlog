const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    date: Date,
    category: String,
    imageUrl: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

