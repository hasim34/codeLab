const express = require("express");

const { getAllProblems, getProblemsBySubject } = require("../controllers/problemController");

const router = express.Router();

router.get("/", getAllProblems);
router.get("/:subjectId", getProblemsBySubject);

module.exports = router;

