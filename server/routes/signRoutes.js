const express = require("express");
const router = express.Router();

const {
  signInController,
  signUpController,
  logoutController,
} = require("../controllers/signController");

router
  .post("/signin", signInController)
  .post("/signup", signUpController)
  .get("/logout", logoutController);

module.exports = router;
