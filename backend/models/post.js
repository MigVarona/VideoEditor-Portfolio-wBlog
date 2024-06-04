const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    date: Date,
    category: String,
    content: String,
    imageUrl: String,
    tags: [String], 
    content2: String,
    videoUrl: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
