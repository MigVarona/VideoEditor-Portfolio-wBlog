// post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    author: String,
    date: { type: Date, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String,
    tags: [String], 
    content2: String,
    videoUrl: String
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
