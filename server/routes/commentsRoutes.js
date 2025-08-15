const express = require("express");
const router = express.Router();
const {
  getComments,
  getComment,
  postComment
} = require('../controllers/commentsController');


router
  .get("/", getComments)
  .get("/:commentId", getComment)
  .post("/", postComment);

module.exports = router;
