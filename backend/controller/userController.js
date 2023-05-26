const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {generateToken} = require("../config/token")

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
      token: generateToken(newUser._id)
    });
  } else {
    res.status(400);
    throw new Error("Could not create user");
  }
});

module.exports = { registerUser };
