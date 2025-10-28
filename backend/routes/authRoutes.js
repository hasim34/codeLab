// const express = require("express");
// const { loginUser, logoutUser } = require("../controllers/authController");

// const router = express.Router();

// // only login + logout
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);

// module.exports = router;

const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

module.exports = router;