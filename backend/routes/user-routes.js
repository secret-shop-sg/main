const express = require("express");
const userController = require("../controllers/user-controller");
const fileUpload = require("../utils/fileUpload");

const router = express.Router();

router.post("/signup", userController.addNewUser);

router.post("/login", userController.login);

// get user info based on user ID
router.get("/id/:userID", userController.getUserbyID);

// get user info based on username
router.get("/username/:username", userController.getUserbyName);

// checks email is unique
router.post("/validate/email", userController.validateField);

// checks username is unique
router.post("/validate/username", userController.validateField);

// updates user details including profile picture
router.patch(
  "/update/details/:userID",
  fileUpload.single("image"),
  userController.updateProfileDetails
);

// updates inventory
router.patch("/update/inventory/:userID", userController.updateInventory);

// updates wishlist
router.patch("/update/wishlist/:userID", userController.updateWishlist);

module.exports = router;
