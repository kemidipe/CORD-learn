
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully ✅");
  } catch (error) {
    console.error("Database connection failed ❌:", error);
  }
};

module.exports = { sequelize, connectDB };
