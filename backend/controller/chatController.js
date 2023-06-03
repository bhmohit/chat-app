const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    res.status(400);
    throw new Error("Did not include userID");
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userID } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email picture",
  });
  console.log(isChat);
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      sender: "sender",
      isGroupChat: false,
      users: [userID, req.user._id],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = (await Chat.find({ _id: createdChat._id })).populate(
        "users",
        "-password"
      );
      res.send(fullChat);
    } catch (e) {}
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  
  let isChat = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  }).populate("users", "-password");

  res.send(isChat);
});

module.exports = {accessChat, fetchChat};
