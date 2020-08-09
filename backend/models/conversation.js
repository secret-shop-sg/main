const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  // 2 users who are chatting
  members: {
    user1: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    user2: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  messages: [
    {
      timeSent: { type: Date, required: true },
      sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
      recipient: { type: mongoose.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Conversation", conversationSchema);
