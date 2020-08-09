const Conversation = require("../models/conversation");
const mongoose = require("mongoose");
const DatabaseError = require("../models/databaseError");
const User = require("../models/users");

// todo: differentiate between a new message on an existing conversation or a new cnoversation
const sendNewMessage = async (req, res, next) => {
  const { sender, recipient, content } = req.body;
  let user;

  try {
    user = await User.findbyID(sender);
  } catch (err) {
    return next(new DatabaseError(err.message));
  } // todo: add an erorr when user is not found by ID. Although very unlikely because users have to first be logged in

  if (user) {
    //const existingChat = user.chatlogs.find(chatElement=>chatElement.recipient === recipient);
    const newConversation = Conversation({
      members: [sender, recipient],
      messages: [{ timeSent: new Date(), sender, content }],
    });

    const newChatLog = { recipient, conversation: newConversation };

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await newConversation.save({ session });
      user.chatlogs.push(newChatLog);
      await user.save({ sesstion });
      await session.commitTransaction();
    } catch (err) {
      return next(new DatabaseError(err.message));
    }
  }
};

exports.sendNewMessage = sendNewMessage;
