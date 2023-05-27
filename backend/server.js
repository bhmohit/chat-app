const {chats} = require("./data/data")
const express = require("express");
const connectDB = require("./config/db")
const app = express();
const userRouter = require("./routes/userRoutes") 
const cors = require("cors")
connectDB();

app.use(cors())
app.use(express.json())
app.use("/api/user", userRouter)

app.listen(3030, () => {
    console.log("Helo")
})