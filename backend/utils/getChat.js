const { SECRET_JWT_HASH } = require("../constants/details");
const jwt = require("jsonwebtoken");
const DatabaseError = require("../models/databaseError");
const mongoose = require("mongoose");
const User = require("../models/users");

const decodeHeader = (socketHeader) => {
  let userID;
  const accessToken = socketHeader.split("; ")[1].slice(13);
  // decode userID stored in jwt
  jwt.verify(accessToken, SECRET_JWT_HASH, (err, data) => {
    if (err) {
      throw new DatabaseError(err.message);
    }
    userID = data.userID;
  });
  return userID;
};

const getChatLogsOverview = async (userID) => {
  let chatData;

  try {
    [chatData] = await User.aggregate([
      // find existing user in database and retrieve relevant information
      { $match: { _id: mongoose.Types.ObjectId(userID) } },
      {
        $project: { chatLogs: 1, username: 1, profilePicURL: 1 },
      },
      { $unwind: "$chatLogs" },
      // search recipient to obtain recipient profile pic
      {
        $lookup: {
          from: "users",
          let: { recipientID: "$chatLogs.recipientID" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_id", "$$recipientID"] } },
            },
            { $project: { profilePicURL: 1 } },
          ],
          as: "chatLogs.recipientID",
        },
      },
      {
        // left join to data in the chats collection
        $lookup: {
          from: "chats",
          let: { chatID: "$chatLogs.chat" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$chatID"] } } },
            {
              $facet: {
                // finds the latest chat message in each chat
                latestMessage: [
                  {
                    $project: {
                      messages: {
                        $slice: ["$messages", -1],
                      },
                    },
                  },
                ],
                // counts number of unread msgs in each chat
                newMessageCount: [
                  {
                    $project: {
                      newMsgCount: {
                        $size: {
                          $filter: {
                            input: "$messages",
                            as: "message",
                            cond: { $eq: ["message.read", false] },
                          },
                        },
                      },
                    },
                  },
                ],
              },
              // possible areas to explore -> how to include 2 variables in projects
            },
          ],
          as: "chatLogs.chat",
        },
      },
      // formating to remove redundant arrays
      { $unwind: "$chatLogs.recipientID" },
      { $unwind: "$chatLogs.chat" },
      { $unwind: "$chatLogs.chat.latestMessage" },
      { $unwind: "$chatLogs.chat.newMessageCount" },
      { $unwind: "$chatLogs.chat.latestMessage.messages" },
      {
        $group: {
          _id: "$_id",
          chatLogs: { $push: "$chatLogs" },
          username: { $first: "$username" },
          profilePicURL: { $first: "$profilePicURL" },
        },
      },
    ]);
  } catch (err) {
    throw new DatabaseError(err.message);
  }

  return chatData;
};

const getChatLogSpecific = async (userID, recipientID, page = 1) => {
  // limit on how many messages are loaded at once
  const messagesToLoad = 10;
  let existingUserData;
  let chatData = {};

  try {
    // find user and recipient profile
    existingUserData = await User.findById(userID, {
      chatLogs: 1,
      profilePicURL: 1,
    }).populate({
      path: "chatLogs",
      populate: { path: "recipientID", model: User, select: "profilePicURL" },
    });
  } catch (err) {
    throw new DatabaseError(err.message);
  }

  chatData.userProfilePic = existingUserData.profilePicURL;

  // finds the correct chatlog based on the recipient requested
  const correctRecipient = existingUserData.chatLogs.find(
    (chatlog) => chatlog.recipientID._id == recipientID
  );
  chatData.recipientProfilePic = correctRecipient.recipientID.profilePicURL;

  // index are negative to retrieve latest messages
  let startingIndex = -1 * page * messagesToLoad;
  const endingIndex = -1 * (page - 1) * messagesToLoad;
  if (existingUserData) {
    let chatLogs; //

    try {
      // searches and loads entire chat log into memory
      chatLogs = (await Chat.findById(correctRecipient.chat)).toObject();
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    // returns all remaining documents if number of documents left is less than messagesToLoad
    if (endingIndex === 0) {
      // pass by value because the original copy still has to be saved
      chatData.messages = JSON.parse(JSON.stringify(chatLogs.messages))
        .slice(startingIndex)
        .reverse();
      chatData.lastPage = true;
    } else {
      chatData.messages = JSON.parse(JSON.stringify(chatLogs.messages))
        .slice(startingIndex, endingIndex)
        .reverse();
    }

    const messageList = chatData.messages;
    for (index = 0; index < messageList.length; index++) {
      const message = messageList[index];
      // curates message so a bool representing sender instead of a userID is sent to the frontend
      if (message.senderID == userID) {
        message.sentBySelf = true;
      }
      delete message.senderID;

      // if new message + not the first message, mark the previous msg
      if (!message.read && index - 1 !== 0) {
        messageList[index - 1].latestReadMessage = true;
      }
    }

    const numberOfMessages = chatLogs.messages.length;

    if (startingIndex < -1 * numberOfMessages) {
      startingIndex = -1 * numberOfMessages;
    }

    // all messages that were loaded to the frontend are saved to the backend as read
    for (i = startingIndex; i < endingIndex; i++) {
      let currentMessage = chatLogs.messages[numberOfMessages + i];
      if (currentMessage.senderID != userID) {
        currentMessage.read = true;
      }
    }

    try {
      await Chat.findByIdAndUpdate(correctRecipient.chat, chatLogs);
    } catch (err) {
      return next(new DatabaseError(err.message));
    }

    return chatData;
  }
};

exports.decodeHeader = decodeHeader;
exports.getChatLogsOverview = getChatLogsOverview;
exports.getChatLogSpecific = getChatLogSpecific;
