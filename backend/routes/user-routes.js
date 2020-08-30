const router = require("express").Router();
const userController = require("../controllers/user-controller");
const fileUpload = require("../utils/fileUpload");

const checkAuth = require("../utils/checkAuth");

// endpoints that deal with logging in
router.post("/signup", userController.addNewUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

// endpoints that deal with validating unique fields
router.post("/validate/email", userController.validateField);
router.post("/validate/username", userController.validateField);

// endpoints that deal with accessing user info
// works without logging in (viewing someone else's profile)
router.get("/username/:username", userController.getUserbyName);
// only works if user is already logged in (for update and chat)
router.get("/id", checkAuth, userController.getAuthorizedUser);

// endpoints that deal with updating user data
// updates user details including profile picture
router.patch(
  "/update/details",
  checkAuth,
  fileUpload.single("image"),
  userController.updateProfileDetails
);
// updates inventory
router.patch("/update/inventory", checkAuth, userController.updateInventory);
router.patch("/update/wishlist", checkAuth, userController.updateWishlist);
router.patch("/update/password", userController.updatePassword);

module.exports = router;
