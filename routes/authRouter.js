const Router = require("express");
const authController = require("../conrollers/authController");
const autnMiddleware = require("../middleWare/autn");
const authMiddleware = require("../middleWare/auth");
const {check} = require("express-validator");
const router = new Router();

router.post(
    "/registrations", 
    [check('username', 'Поле не должно быть пустым').notEmpty(), check('password', 'От 4 до 10 символов').isLength({min: 4, max: 10})], 
    authController.registration
);

router.post("/login", authController.login);

router.get("/users", autnMiddleware(['ADMIN']), authController.getUsers);

module.exports = router;
