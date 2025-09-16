const express = require("express");
const { getProblemsBySubject } = require("../controllers/problemsController");
const router = express.Router();
router.get("/:id/problems", getProblemsBySubject);
module.exports = router;
