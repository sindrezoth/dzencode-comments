const express = require("express");
const router = express.Router();
const { generateUsers } = require("../controllers/usersController");
const { generateComments } = require("../controllers/commentsController");

router.get("/users/:count", generateUsers).get("/comments/:count", generateComments);

module.exports = router;
