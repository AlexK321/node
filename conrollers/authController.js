const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateJWT = (id, roles) => {
  const payload = { id, roles };

  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new Error("Валидационная ошибка");
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        throw new Error("Пользователь уже существует");
      } else {
        const hashPass = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ value: "USER" });
        const user = new User({
          username,
          password: hashPass,
          role: [userRole.value],
        });
        await user.save();

        res.json({ message: "ОК" });
      }
    } catch (error) {
      res.status(400).json({ message: "Error" + error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Такого пользователя не существует");
      }
      const isValidatePassword = bcrypt.compareSync(password, user.password);
      if (!isValidatePassword) {
        throw new Error("Неправильный пароль");
      }
      const token = generateJWT(user._id, user.role);

      return res.json({ token: token });
    } catch (error) {
      res.status(400).json({ message: "Error" + error.message });
    }
  }

  async getUsers(req, res) {
    try {
      // костыли для начального наполнения БД
      // const user = new Role();
      // const admin = new Role({value: 'ADMIN'})
      // await user.save();
      // await admin.save();
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: "Error" });
    }
  }
}

module.exports = new authController();
