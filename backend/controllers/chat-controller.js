const mongoose = require("mongoose");
const DatabaseError = require("../models/databaseError");
const User = require("../models/users");
const Chat = require("../models/chats");

// todo: differentiate between a new message on an existing chat or a new chat
const sendNewMessage = async (req, res, next) => {
  const { senderID, recipientID, content } = req.body;
  let sender;
  let recipient;
  let newChat;

  try {
    sender = await User.findById(senderID);
    recipient = await User.findById(recipientID);
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  // todo: add an erorr when user/sender is not found by ID. Although very unlikely because users have to first be logged in
  if (sender && recipient) {
    // checks if the current message is the first message between the pair
    const existingChatLog = sender.chatLogs.find(
      (chatElement) => chatElement.recipientID == recipientID
    );

    if (existingChatLog) {
      // if this is not the first message sent between the pair
      const existingChat = await Chat.findById(existingChatLog.chat);
      existingChat.messages.push({
        timeSent: new Date(),
        senderID,
        content,
      });
      try {
        await existingChat.save();
      } catch (err) {
        return next(new DatabaseError(err.message));
      }
    } else {
      newChat = Chat({
        messages: [{ timeSent: new Date(), senderID, content }],
      });

      try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newChat.save({ session });
        sender.chatLogs.push({ recipientID, chat: newChat._id });
        await sender.save({ session });
        recipient.chatLogs.push({ recipientID: senderID, chat: newChat._id });
        await recipient.save({ session });
        await session.commitTransaction();
      } catch (err) {
        return next(new DatabaseError(err.message));
      }
    }
    res.json({ ok: "ok" });
  }
};

const getChatLogsOverview = async (req, res, next) => {
  const userID = req.params.userID;
  let matchedChats = [];

  // todo: add error handling in the event that id sent is not 24 chars
  if (userID.match(/^[0-9a-fA-F]{24}$/)) {
    let existingChatLogs;

    try {
      // find all existing chatLogs of this particular user
      existingChatLogs = await User.findById(userID, {
        chatLogs: 1,
      });
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    try {
      for (existingChatLog of existingChatLogs.chatLogs) {
        // collecting data from recipient
        const recipient = await User.findById(existingChatLog.recipientID, {
          username: 1,
          profilePicURL: 1,
        });

        // collecting data for latest message
        let [latestMessage] = await Chat.aggregate([
          {
            $match: {
              _id: existingChatLog.chat,
            },
          },
          { $limit: 1 },
          {
            $project: {
              messages: {
                $slice: ["$messages", -1],
              },
            },
          },
        ]);

        if (latestMessage.messages[0].senderID == userID) {
          latestMessage.messages[0].sentBySelf = true;
        } else latestMessage.messages[0].sentBySelf = false;

        delete latestMessage.messages[0].senderID;

        matchedChats.push({ recipient, latestMessage });
      }
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
  }

  res.json({ matchedChats });
};

const getSpecificChat = async (req, res, next) => {
  const { userID, recipientID } = req.body;
  const messagesToLoad = -20;
  let userChatLogs;
  let matchedChatLog;

  try {
    userChatLogs = await User.findById(userID, { chatLogs: 1 });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  if (userChatLogs) {
    const chat = userChatLogs.chatLogs.find(
      (chatLog) => (chatLog.recipientID = recipientID)
    );

    [matchedChatLog] = await Chat.aggregate([
      {
        $match: {
          _id: chat.chat,
        },
      },
      { $limit: 1 },
      {
        $project: {
          messages: {
            $slice: ["$messages", messagesToLoad],
          },
        },
      },
    ]);

    for (message of matchedChatLog.messages) {
      if (message.senderID == userID) {
        message.sentBySelf = true;
      } else message.sentBySelf = false;

      delete message.senderID;
    }

    res.json({ matchedChatLog });
  }
};

exports.getChatLogsOverview = getChatLogsOverview;
exports.getSpecificChat = getSpecificChat;
exports.sendNewMessage = sendNewMessage;
