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

  const newMessage = {
    timeSent: new Date(),
    senderID,
    content,
    read: false,
  };

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
      existingChat.messages.push(newMessage);

      try {
        await existingChat.save();
      } catch (err) {
        return next(new DatabaseError(err.message));
      }
    } else {
      // if it is a completely new message
      newChat = Chat({ messages: [newMessage] });

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
    res.json({ messageSaved: true });
  }
};

const getChatLogsOverview = async (req, res, next) => {
  const userID = req.params.userID;
  let matchedChats = [];

  // todo: add error handling in the event that id sent is not 24 chars
  if (userID.match(/^[0-9a-fA-F]{24}$/)) {
    let existingUserData;

    try {
      // find all existing chatLogs of this particular user
      existingUserData = await User.findById(userID, {
        chatLogs: 1,
      });
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    try {
      for (existingChatLog of existingUserData.chatLogs) {
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
  const page = req.body.page || 1;
  // limit on how many messages are loaded at once
  const messagesToLoad = 10;
  let existingUserData;
  let chatData = {};

  try {
    existingUserData = await User.findById(userID, {
      chatLogs: 1,
      profilePicURL: 1,
    }).populate({
      path: "chatLogs",
      populate: { path: "recipientID", model: User, select: "profilePicURL" },
    });
  } catch (err) {
    return next(new DatabaseError(err.message));
  }

  chatData.userProfilePic = existingUserData.profilePicURL;

  // finds the correct chatlog based on the recipient requested
  const correctRecipient = existingUserData.chatLogs.find(
    (chatlog) => chatlog.recipientID._id == recipientID
  );
  chatData.recipientProfilePic = correctRecipient.recipientID.profilePicURL;

  // index are negative to retrieve latest messages
  const startingIndex = -1 * page * messagesToLoad;
  const endingIndex = -1 * (page - 1) * messagesToLoad;
  if (existingUserData) {
    let chatLogs;

    try {
      // searches and loads entire chat log into memory
      chatLogs = (await Chat.findById(correctRecipient.chat)).toObject();
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    // returns all remaining documents if number of documents left is less than messagesToLoad
    if (endingIndex === 0) {
      chatData.messages = chatLogs.messages.slice(startingIndex).reverse();
    } else {
      chatData.messages = chatLogs.messages
        .slice(startingIndex, endingIndex)
        .reverse();
    }

    // curates message so a bool representing sender instead of a userID is sent to the frontend
    for (message of chatData.messages) {
      if (message.senderID == userID) {
        message.sentBySelf = true;
      }
      delete message.senderID;
    }

    // all messages that were loaded to the frontend is saved to the backend as read
    for (i = startingIndex; i < endingIndex; i++) {
      if (chatLogs.message.senderID != userID) {
        chatLogs.messages[-1 * i].read = true;
      }
    }

    try {
      await chatLogs.save();
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    res.json({ chatData });
  }
};

exports.getChatLogsOverview = getChatLogsOverview;
exports.getSpecificChat = getSpecificChat;
exports.sendNewMessage = sendNewMessage;
