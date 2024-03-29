const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String, default: "./user.png" },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (ePassword) {
  return await bcrypt.compare(ePassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
