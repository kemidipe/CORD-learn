const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize, User, Post } = require("./models");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to C.O.R.D API — Connecting Opportunities, Resources & Dreams!");
});

// ✅ Register new users
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create a post (for social feed or ideas)
app.post("/api/posts", async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const post = await Post.create({ UserId: userId, title, content });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server and sync database
const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));
