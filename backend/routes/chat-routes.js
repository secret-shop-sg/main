const chatController = require("../controllers/chat-controller");
const router = require("express").Router();
const checkAuth = require("../utils/checkAuth");

// send a new message
router.post("/add", checkAuth.auth, chatController.sendNewMessage);

// gets latest message to each recipient
router.get("/overview", chatController.getChatLogsOverview);

// get entire chat log with another user
router.patch("/specific", chatController.getSpecificChat);

module.exports = router;
