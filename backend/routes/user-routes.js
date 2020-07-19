const express = require("express");
const userController = require("../controllers/user-controller");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  check("title").not().isEmpty(),
  userController.addNewUser
);

router.get("/id/:userID", userController.getUser);

module.exports = router;
