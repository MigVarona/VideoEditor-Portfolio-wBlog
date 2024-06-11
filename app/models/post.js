const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    author: String,
    date: { type: Date, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String, // Primer campo de imagen
    secondImageUrl: String, // Segundo campo de imagen
    tags: [String], 
    content2: String,
    videoUrl: String,
    content3: String

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
