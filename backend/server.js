const {chats} = require("./data/data")
const express = require("express");
const connectDB = require("./config/db")
const app = express();
const router = require("./routes/userRoutes") 

//app.use(express.json())
connectDB();
app.use("/api/user", router)

app.listen(3030, () => {
    console.log("Helo")
})