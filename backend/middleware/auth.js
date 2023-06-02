const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const middle = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "someth");
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      res.status(401);
      throw new Error("Not auth");
    }
  }

  else {
    res.status(401)
    throw new Error("not found")
  }
});

module.exports = middle;
