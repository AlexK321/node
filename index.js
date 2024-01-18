require("dotenv").config();
const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const myRouter = require("./routes/myRouter");
const staticRouter = require("./routes/staticRouter");

const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors()); // разрешить отправлять запросы из браузера
app.use(express.json()); // for parsing application/json from request body
app.use(fileupload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/", myRouter); // подключаем роутер authRouter с учетом пути /
app.use("/auth", authRouter); // подключаем роутер authRouter с учетом пути /auth
app.use("/", staticRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://alex:${process.env.DB_PASSWORD}@cluster0.vdbqqid.mongodb.net/?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
