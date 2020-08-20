const router = require("express").Router();
const userController = require("../controllers/user-controller");
const fileUpload = require("../utils/fileUpload");

const checkAuth = require("../utils/checkAuth");

router.post("/signup", userController.addNewUser);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

// get user info based on username. Used for info accessible without logging in
router.get("/username/:username", userController.getUserbyName);

// only works if user is already logged in (for update and chat)
router.get("/id", checkAuth, userController.getAuthorizedUser);

// checks email is unique
router.post("/validate/email", userController.validateField);

// checks username is unique
router.post("/validate/username", userController.validateField);

// updates user details including profile picture
router.patch(
  "/update/details",
  checkAuth,
  fileUpload.single("image"),
  userController.updateProfileDetails
);

// updates inventory
router.patch("/update/inventory", checkAuth, userController.updateInventory);

// updates wishlist
router.patch("/update/wishlist", checkAuth, userController.updateWishlist);

module.exports = router;
