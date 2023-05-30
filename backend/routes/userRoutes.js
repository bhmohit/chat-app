const express = require("express");

const router = express.Router();

const { registerUser, authUser, searchUser} = require("../controller/userController");

router.post("/", registerUser);
router.get("/", searchUser);
router.post("/login", authUser);

module.exports = router;
