const chatController = require("../controllers/chat-controller");
const router = require("express").Router();

// send a new message
router.post("/add", chatController.sendNewMessage);

// gets latest message to each recipient
router.get("/overview/:userID", chatController.getChatLogsOverview);

router.patch("/specific", chatController.getSpecificChat);

module.exports = router;
