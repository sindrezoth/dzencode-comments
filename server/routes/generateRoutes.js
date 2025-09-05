const express = require("express");
const router = express.Router();
const { 
  generateUsers,
  generateComments,
  generateUsersAndComments 
} = require("../controllers/generateController");

router
  .get("/users/:count", generateUsers)
  .get("/comments/:count", generateComments)
  .post("/all", generateUsersAndComments);

module.exports = router;
