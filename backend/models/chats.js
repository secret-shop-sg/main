const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  // 2 users who are chatting
  messages: [
    {
      _id: false,
      timeSent: { type: Date, required: true },
      senderID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
      read: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
