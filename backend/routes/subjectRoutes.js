
const express = require("express");
const { getAllSubjects, addSubject, editSubject, deleteSubject } = require("../controllers/subjectController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",getAllSubjects);
router.post("/",  addSubject);
router.put("/:id",  editSubject);
router.delete("/:id",  deleteSubject);

module.exports = router;