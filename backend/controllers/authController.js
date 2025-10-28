const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const SECRET_KEY = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  const { name, email, phone, roll_number, password } = req.body;
  if (!name || !email || !phone || !roll_number || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      `INSERT INTO users (name, email, phone, roll_number, password, role, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, 'student', NOW(), NOW())`,
      [name, email, phone, roll_number, hashedPassword]
    );
    res.status(201).json({ message: "User registered", userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { roll_number, password } = req.body;
  if (!roll_number || !password) {
    return res.status(400).json({ message: "Roll number and password required" });
  }
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE roll_number = ?", [roll_number]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};



// const generateToken = require("../utils/generateToken");
// const { findUserByrollNumber } = require("../models/userModel");

// // ✅ Login Controller
// const loginUser = async (req, res) => {
//   const { rollNumber, password } = req.body;

//   try {
//     const user = await findUserByrollNumber(rollNumber);
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // password check (plain text for now)
//     if (user.password !== password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // JWT generate
//     const token = generateToken(user.user_id);
//     res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

//     res.json({ message: "Login success" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Logout Controller
// const logoutUser = (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out" });
// };

// module.exports = { loginUser, logoutUser };
