const path = require("path");
const { v4: uuidv4 } = require("uuid");

class staticController {
  async upload(req, res) {
    try {
      //по сохранять в БД id и по нему искать фаил, но пока как есть. И добавить вложенности.
      const img = req.files.file;
      const fileId = uuidv4();
      const fileName = fileId + ".jpg";
      img?.mv(path.resolve(__dirname, "..", "static", fileName));

      return res.json({ img: fileName });
    } catch (error) {
      res.status(400).json({ message: "Error" + error.message });
    }
  }

  // отправлять запрос в виде http://localhost:5000/static/7342704f-f800-469e-b8a2-a3494cf0ef68.jpg
  async getFile(req, res) {
    try {
      const fileName = req.params.filename;

      return res.sendFile(path.resolve(__dirname, "..", "static", fileName));
    } catch (error) {
      res.status(400).json({ message: "Error" + error.message });
    }
  }
}

module.exports = new staticController();
