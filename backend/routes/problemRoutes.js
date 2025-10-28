// const express = require("express");
// const router = express.Router();
// const { getProblemsBySubject, addProblem, updateProblem, deleteProblem, getProblemDetail } = require("../controllers/problemsController");
// const { protect, admin } = require("../middleware/authMiddleware");

// router.get("/:subjectId/problems", getProblemsBySubject);
// router.get("/:subjectId/:problemId", getProblemDetail);
// router.post("/:subjectId", protect, admin, addProblem);
// router.put("/:subjectId/:problemId", protect, admin, updateProblem);
// router.delete("/:subjectId/:problemId", protect, admin, deleteProblem);

// module.exports = router;

const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problems');
const {getProblemsBySubject, addProblem, updateProblem, deleteProblem} = require('../controllers/problemsController');
const { protect, admin } = require("../middleware/authMiddleware");

router.get('/subject/:subjectId/problem/:problemId', problemsController.getProblemDetails);
router.get("/:id", getProblemsBySubject);

router.post("/:subjectId", protect,admin,addProblem);
router.put("/:subjectId/:problemId", protect,admin,updateProblem);
router.delete("/:subjectId/:problemId", protect,admin,deleteProblem);

module.exports = router ;
