const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/token");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password, picture } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter All Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    picture,
  });

  if (newUser) {
    res.status(200);
    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      picture: newUser.picture,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Could not create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists && (await userExists.matchPassword(password))) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      picture: userExists.picture,
      token: generateToken(userExists._id),
    });
  } else {
    res.status(400);
    throw new Error("Could not login");
  }
});

const searchUser = asyncHandler(async (req, res) => {
  const usr = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const user = await User.find(usr);
  res.send(user);
});

module.exports = { registerUser, authUser, searchUser };
