const express = require("express");
const middle = require("../middleware/auth");
const { accessChat, fetchChat } = require("../controller/chatController");
const router = express.Router();

//new chat
router.post("/", middle, accessChat);
router.get("/", middle, fetchChat);
/* router.post("/group", middle, createGroup)
router.put("/rename", middle, renameGroup)
router.put("/remove", middle, removeFromGroup)
router.put("/add", middle, addToGroup)
*/

module.exports = router;
