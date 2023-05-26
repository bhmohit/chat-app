
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mohitbhagchandani29:Muskaanmohit29@chat.v5dqujw.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;

