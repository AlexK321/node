const Router = require("express");
const authController = require("./authController");
const router = new Router();

router.post("/registrations", authController.registration);

router.post("/login", authController.login);

router.get("/users", authController.getUsers);

router.get("/", (req, res) => {
  res.send("This is main page");
});

router.get("/user/:id", (req, res) => {
  res.send("This is second page for " + req.params.id);
});

router.get("/html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/json", (req, res) => {
  res.json({ test: "test" });
});

module.exports = router;
