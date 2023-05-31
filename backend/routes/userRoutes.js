const express = require("express");

const router = express.Router();

const { registerUser, authUser, searchUser} = require("../controller/userController");
const middle = require("../middleware/auth");

router.post("/", registerUser);
router.get("/", middle, searchUser);
router.post("/login", authUser);

module.exports = router;
