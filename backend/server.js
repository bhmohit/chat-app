const {chats} = require("./data/data")
const express = require("express");
const connectDB = require("./config/db")
const app = express();
const cors = require("cors")
const userRouter = require("./routes/userRoutes") 
const chatRouter = require("./routes/chatRoutes")

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.listen(3030, () => {
    console.log("Helo")
})