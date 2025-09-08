const express = require("express");
const { getAllSubjects } = require("../controllers/subjectController");

const router = express.Router();

router.get("/",getAllSubjects);

module.exports = router;