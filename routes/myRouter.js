const Router = require("express");
const router = new Router();

router.get("/", (req, res) => {
  res.send("This is main page");
});

router.get("/user/:id", (req, res) => {
  res.send("This is second page for " + req.params.id);
});

router.get("/html", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname.replace('\\routes', "/testIndex.html")); // '\\' - это экранироанный обычный \
  // тоже самое, должно работать.  текущий путь  от него вернуться на уровень назад и добавить имя фаила
  // res.sendFile(path.resolve(__dirname, '..', '/testIndex.html'));
  
});

router.get("/json", (req, res) => {
  res.json({ test: "test" });
});

module.exports = router;
