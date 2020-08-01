const express = require("express");
const userController = require("../controllers/user-controller");
const fileUpload = require("../utils/fileUpload");

const router = express.Router();

router.post("/signup", userController.addNewUser);

router.post("/login", userController.login);

router.get("/id/:userID", userController.getUser);

router.post("/validate/email", userController.validateField);

router.post("/validate/username", userController.validateField);

router.patch(
  "/update/:userID",
  fileUpload.single("image"),
  userController.updateProfile
);

module.exports = router;
