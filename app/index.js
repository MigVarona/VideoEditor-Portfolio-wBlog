const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const cookieParser = require("cookie-parser"); 
const User = require("./models/user");
const postController = require("./controller/postController");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self' http://localhost:* https://localhost:* data:; " +
    "font-src 'self' data: https://cdnjs.cloudflare.com https://assets.website-files.com/; " +
    "img-src 'self' data: https://assets-global.website-files.com https://localhost:*; " +
    "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://d3e54v103j8qbb.cloudfront.net https://assets-global.website-files.com; " +
    "frame-src 'self' https://www.youtube.com https://*.youtube.com; " + 
    "frame-ancestors 'self'; " + 
    "object-src 'none'; " + 
    "base-uri 'self'; " + 
    "form-action 'self'; " + 
    "manifest-src 'self'; " + 
    "block-all-mixed-content; " + 
    "upgrade-insecure-requests; " 
  );
  next();
});

app.use(cookieParser());

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uploadsDir = path.join(__dirname, 'uploads');
const postsDir = path.join(__dirname, 'public', 'posts');
[uploadsDir, postsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/posts', express.static(path.join(__dirname, 'public', 'posts')));
app.post("/api/posts/page", postController.createPost);
app.post("/api/posts", upload.fields([{ name: 'imageFile', maxCount: 1 }, { name: 'imageFile2', maxCount: 1 }]), postController.createPost);
app.get("/api/posts", postController.getPosts);
app.get("/api/posts/:id", postController.getPostById);
app.put("/api/posts/:id", postController.updatePost);
app.delete("/api/posts/:id", postController.deletePost);
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token is required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL, 
    subject: `Nuevo mensaje de ${name}`,
    text: `Mensaje: ${message}\n\nDe: ${name} (${email})`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'Correo enviado correctamente' });
  });
});


app.post('/send-test-email', (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Correo de prueba',
    text: 'Este es un correo de prueba para verificar el envío de correos.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'Correo de prueba enviado correctamente', info });
  });
});


app.post("/upload", upload.single("file"), (req, res) => {
  res.send('File uploaded successfully');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
