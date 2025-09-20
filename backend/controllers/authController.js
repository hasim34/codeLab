// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { findUserByEmail, createUser, findUserById } = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, roll_number, email, phone, password } = req.body;
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(name, roll_number, email, phone, hashedPassword);

    const token = generateToken(userId);
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.user_id);
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    res.json({ message: "Login success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getProfile };
