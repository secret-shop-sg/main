const { SECRET_JWT_HASH } = require("../constants/details");
const jwt = require("jsonwebtoken");
const DatabaseError = require("../models/databaseError");
const mongoose = require("mongoose");
const User = require("../models/users");
const Chat = require("../models/chats");

// TODO: FIX error statements for whole page. next is not defined
const decodeHeader = (socketHeader) => {
  const startingPos = socketHeader.indexOf("access_token=");
  if (startingPos === -1) {
    // returns false if there are no access token included in connection request
    return false;
  }
  // shortens the string to the beginning of the jwt
  socketHeader = socketHeader.slice(startingPos + 13);
  const endingPos = socketHeader.indexOf(";");
  let accessToken;
  if (endingPos === -1) {
    accessToken = socketHeader;
  } else accessToken = socketHeader.substring(0, endingPos);

  let userID;
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
        $project: { chatLogs: 1 },
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
            { $project: { profilePicURL: 1, username: 1 } },
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
        },
      },
    ]);
  } catch (err) {
    throw new DatabaseError(err.message);
  }
  const chats = chatData.chatLogs;

  // loops through senderID to determine who sent the msg + number of new msgs
  for (index = 0; index < chats.length; index++) {
    // reformatting documents collected from mongodb so frontend has an easier time
    const chat = chats[index];

    chat.recipientProfilePic = chat.recipientID.profilePicURL;
    chat.recipient = chat.recipientID.username;
    chat.recipientID = chat.recipientID._id;

    chat.latestMessage = chat.chat.latestMessage.messages;

    chat.newMessageCount = chat.chat.newMessageCount.newMsgCount;
    delete chat.chat;

    // checks if user is the one who send the message
    const latestMessage = chat.latestMessage;
    if (latestMessage.senderID == userID) {
      latestMessage.sentBySelf = true;
    } else latestMessage.sentBySelf = false;
    delete latestMessage.senderID;
  }

  return chats;
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
  if (existingUserData.chatLogs.length !== 0) {
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
        console.log(err.message);
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
        throw new DatabaseError(err.message);
      }
    }
  }
  return chatData;
};

const saveNewMessage = async (userID, recipientID, content) => {
  let sender;
  let recipient;
  let newChat;

  const newMessage = {
    timeSent: new Date(),
    senderID: userID,
    content,
    read: false,
  };

  try {
    sender = await User.findById(userID);
    recipient = await User.findById(recipientID);
  } catch (err) {
    throw new DatabaseError(err.message);
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
        recipient.chatLogs.push({ recipientID: userID, chat: newChat._id });
        await recipient.save({ session });
        await session.commitTransaction();
      } catch (err) {
        throw new DatabaseError(err.message);
      }
    }
  }

  return newMessage;
};

exports.decodeHeader = decodeHeader;
exports.getChatLogsOverview = getChatLogsOverview;
exports.getChatLogSpecific = getChatLogSpecific;
exports.saveNewMessage = saveNewMessage;
