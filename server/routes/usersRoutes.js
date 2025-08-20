const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  postUser,
} = require("../controllers/usersController");

router
  .get("/", getUsers)
  .get("/:userId", getUser)
  .get("/random", getUser)
  .post("/", postUser);

module.exports = router;
