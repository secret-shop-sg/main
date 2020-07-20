const express = require("express");
const userController = require("../controllers/user-controller");
const { check } = require("express-validator");

const router = express.Router();

router.post("/signup", userController.addNewUser);

//router.post("/login", userController.login);

router.get("/id/:userID", userController.getUser);

module.exports = router;
