const router = require("express").Router();
const userController = require("../controllers/user-controller");
const fileUpload = require("../utils/fileUpload");

const checkAuth = require("../utils/checkAuth");

// endpoints that deal with logging in
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

// endpoints that deal with validating unique fields
router.post("/validate/email", userController.validateField);
router.post("/validate/username", userController.validateField);

// endpoints that deal with accessing user info
// works without logging in (viewing someone else's profile)
router.get("/username/:username", userController.getUserbyName);
// only works if user is already logged in (for update and chat)
router.get("/id", checkAuth.auth, userController.getAuthorizedUser);

// endpoints that deal with updating user data
router.patch(
  "/update/details",
  checkAuth.auth,
  fileUpload.single("image"),
  userController.updateProfileDetails
);
router.patch(
  "/update/inventory",
  checkAuth.auth,
  userController.updateInventory
);
router.patch("/update/wishlist", checkAuth.auth, userController.updateWishlist);
router.patch("/update/password", checkAuth.auth, userController.updatePassword);

// endpoints that deal with bookmarks
router.post("/bookmark/add", checkAuth.auth, userController.addNewBookmark);

module.exports = router;
