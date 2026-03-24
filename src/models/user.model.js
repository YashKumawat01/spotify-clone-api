const mongoose = require("mongoose");

const userSchem = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username Required"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "artist"],
    default: "user",
  },
});

const userModel = mongoose.model("user", userSchem);

module.exports = userModel;
