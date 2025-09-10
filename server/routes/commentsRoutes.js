const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getPosts,
  getComments,
  getCommentWithReplies,
  getRandomCommentWithReplies,
  postComment,
} = require("../controllers/commentsController");
const fileProcessingMiddleware = require("../middleware/fileProcessingMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024,
    files: 1,
    fields: 3,
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/gif", "text/plain"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only GIF, PNG, or JPG images and TXT files are allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router
  .get("/", getComments)
  .get("/random", getRandomCommentWithReplies)
  .get("/:commentId", getCommentWithReplies)
  .post(
    "/",
    authMiddleware,
    upload.single("file"),
    fileProcessingMiddleware,
    postComment,
  );

module.exports = router;
