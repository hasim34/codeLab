// const express = require("express");
// const { getAllSubjects, addSubject, editSubject, deleteSubject } = require("../controllers/subjectController");
// const { protect, admin } = require("../middleware/authMiddleware");
// const router = express.Router();

// router.get("/", getAllSubjects);
// router.post("/", protect, admin, addSubject);
// router.put("/:id", protect, admin, editSubject);
// router.delete("/:id", protect, admin, deleteSubject);

// module.exports = router;


const express = require("express");
const { getAllSubjects, addSubject, editSubject, deleteSubject } = require("../controllers/subjectController");
const {protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllSubjects);
router.post("/",  protect, admin,addSubject);
router.put("/:id", protect, admin,editSubject);
router.delete("/:id", protect, admin, deleteSubject);

module.exports = router;