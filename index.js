require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const authRouter = require("./authRouter");

const PORT = process.env.PORT || 7000;
const app = express();
app.use(express.json()); // for parsing application/json from request body
app.use("/auth", authRouter); // подключаем роутер authRouter с учетом пути /auth

const start = async () => {
  try {
    // await sequelize.authenticate();
    // await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
