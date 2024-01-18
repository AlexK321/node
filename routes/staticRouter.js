const Router = require("express");
const staticController = require("../conrollers/staticController");
const router = new Router();

router.post("/upload", staticController.upload);

router.get("/static/:filename", staticController.getFile);

module.exports = router;
