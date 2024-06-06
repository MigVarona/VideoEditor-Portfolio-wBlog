// postController.js

const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    // Consultar las publicaciones y ordenarlas por fecha de publicación descendente
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
      // Obtener la fecha actual del servidor
      const currentDate = Date.now();

      // Crear un nuevo objeto Post con los datos recibidos y la fecha actual
      const post = new Post({
          title: req.body.title,
          description: req.body.description,
          author: req.body.author,
          date: currentDate, // Utilizar la fecha actual
          category: req.body.category,
          content: req.body.content,
          imageUrl: req.files['imageFile'][0].path, // Obtener la ruta de la primera imagen subida
          secondImageUrl: req.files['imageFile2'][0].path, // Obtener la ruta de la segunda imagen subida
          tags: req.body.tags,
          content2: req.body.content2,
          videoUrl: req.body.videoUrl
      });

      // Guardar el nuevo post en la base de datos
      const newPost = await post.save();

      // Enviar una respuesta con el nuevo post creado
      res.status(201).json(newPost);
  } catch (error) {
      // Si ocurre un error, enviar una respuesta de error con el mensaje de error
      console.error("Error creating post:", error);
      res.status(400).json({ message: error.message });
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
