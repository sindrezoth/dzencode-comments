const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  getRandomUser,
} = require("../controllers/usersController");

router
  .get("/", getUsers)
  .get("/random", getRandomUser)
  .get("/:userId", getUser);

module.exports = router;
