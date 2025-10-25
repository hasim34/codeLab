const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey123";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Header illa na reject
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Header format → "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // token la irukra { id, email, role } save pannidum
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

module.exports = verifyToken;
