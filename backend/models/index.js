const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define the User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("student", "teacher", "investor"),
    defaultValue: "student",
  },
});

// Define the Post model (for future social features)
const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

// Relationships
User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User);

// Export all models
module.exports = { sequelize, User, Post };
