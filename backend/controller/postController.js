const Post = require('../models/post');
const fs = require('fs');
const path = require('path');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const currentDate = Date.now();
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      date: currentDate,
      category: req.body.category,
      content: req.body.content,
      imageUrl: req.files['imageFile'][0].path,
      secondImageUrl: req.files['imageFile2'][0].path,
      tags: req.body.tags,
      content2: req.body.content2,
      videoUrl: req.body.videoUrl
    });

    const newPost = await post.save();

    const newPageContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${newPost.title}</title>
        <style>
          body {
            background-color: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            padding: 50px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        </style>
      </head>
      <body>
        <h1>${newPost.title}</h1>
        <h2>Category: ${newPost.category}</h2>
        <img src="/${newPost.imageUrl}" alt="${newPost.title}">
        <img src="/${newPost.secondImageUrl}" alt="${newPost.title}">
        <p>${newPost.content}</p>
        <p>${newPost.content2}</p>
        <video controls>
          <source src="${newPost.videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </body>
      </html>
    `;

    const newPagePath = path.join(__dirname, '..', 'public', 'posts', `${newPost._id}.html`);
    fs.writeFileSync(newPagePath, newPageContent);

    // Enviar una respuesta con un objeto que incluye la propiedad 'success'
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }

    if (req.body.title != null) {
      post.title = req.body.title;
    }
    if (req.body.description != null) {
      post.description = req.body.description;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }

    await post.remove();
    res.json({ message: 'Deleted post' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostTitleById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
    res.json({ title: post.title });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
