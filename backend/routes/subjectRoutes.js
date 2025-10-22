
const express = require("express");
const { getAllSubjects } = require("../controllers/subjectController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",getAllSubjects);

module.exports = router;