const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.post("/signup", userController.addNewUser);

router.post("/login", userController.login);

router.get("/id/:userID", userController.getUser);

router.post("/validate/email", userController.validateField);

router.post("/validate/username", userController.validateField);

module.exports = router;
