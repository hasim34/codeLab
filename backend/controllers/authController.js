
// // backend/controllers/authController.js
// const generateToken = require("../utils/generateToken");


//  const { findUserByrollNumber, createUser, findUserById } = require("../models/userModel");

// const registerUser = async (req, res) => {
//   const { name, roll_number, rollNumber, phone, password } = req.body;
//   try {
//     const existing = await findUserByrollNumber(rollNumber);
//     if (existing) return res.status(400).json({ message: "rollNumber already exists" });

//     // store password directly (NO HASHING)
//     const userId = await createUser(name, roll_number, rollNumber, phone, password);

//     const token = generateToken(userId);
//     res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

//     res.status(201).json({ message: "User registered" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const loginUser = async (req, res) => {
//   const { rollNumber, password } = req.body;
//   try {
//     const user = await findUserByrollNumber(rollNumber);
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     // direct string comparison instead of bcrypt
//     if (user.password !== password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user.user_id);
//     res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

//     res.json({ message: "Login success" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const logoutUser = (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out" });
// };

// const getProfile = async (req, res) => {
//   try {
//     const user = await findUserById(req.user);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { registerUser, loginUser, logoutUser, getProfile };







const generateToken = require("../utils/generateToken");
const { findUserByrollNumber } = require("../models/userModel");

// ✅ Login Controller
const loginUser = async (req, res) => {
  const { rollNumber, password } = req.body;

  try {
    const user = await findUserByrollNumber(rollNumber);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // password check (plain text for now)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT generate
    const token = generateToken(user.user_id);
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    res.json({ message: "Login success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Logout Controller
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

module.exports = { loginUser, logoutUser };
