const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey123";

// 👉 Register
router.post("/register", async (req, res) => {
  const { name, roll_number, email, phone, password } = req.body;

  if (!name || !roll_number || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users 
      (name, roll_number, email, phone, password,created_at, updated_at) 
      VALUES (?, ?, ?, ?,  ?, NOW(), NOW())`,
      [name, roll_number, email, phone, hashedPassword]
    );

    res.json({ message: "User registered successfully", userId: result.insertId });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "DB error" });
  }
});

// 👉 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password required" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ JWT Generate (send id, email)
    const token = jwt.sign(
      { id: user.user_id, email: user.email},
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Response without password
    const { password: pwd, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword, message: "Login successful" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "DB error" });
  }
});

module.exports = router;
