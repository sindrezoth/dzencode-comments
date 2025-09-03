const fs = require("node:fs/promises");
const path = require("path");
const express = require("express");
const router = express.Router();

router
  .get("/imgs/:filename", async (req, res) => {
    const { filename } = req.params;
    try {
      const filePath = path.join(__dirname, "..", "files", "imgs", filename);
      await fs.stat(filePath);

      if (/.gif$/.test(filename)) {
        res.setHeader("Content-Type", "image/gif");
      } else if (/.png$/.test(filename)) {
        res.setHeader("Content-Type", "image/png");
      } else if (/.jpg$/.test(filename)) {
        res.setHeader("Content-Type", "image/jpeg");
      }

      res.sendFile(filePath);
      return;
    } catch (err) {
      console.log(err);
      if (err.code === "ENOENT") {
        res.status(404).json({ message: "Image doesn't exist" });
        return;
      }
    }

  })
  .get("/txts/:filename", async (req, res) => {
    const { filename } = req.params;
    try {
      const filePath = path.join(__dirname, "..", "files", "txts", filename);
      await fs.access(filePath);

      res.setHeader("Content-Type", "text/plain");
      res.sendFile(filePath);
    } catch (err) {
      console.log(err);
      if (err.code === "ENOENT") {
        res.status(404).json({ message: "Image doesn't exist" });
        return;
      }
    }
  });

module.exports = router;
