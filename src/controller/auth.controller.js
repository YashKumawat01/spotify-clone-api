const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register API
async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;
  //if role is not in body ten default role is user

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({ message: "User Already Exist" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id, // unnique data
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Create Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

// Login API
async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid Cedentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Logged in Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

// Logout  API

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged Out",
  });
}

module.exports = { registerUser, loginUser, logoutUser };
