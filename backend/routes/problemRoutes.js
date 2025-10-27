const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problems');
const {getProblemsBySubject, addProblem, updateProblem, deleteProblem} = require('../controllers/problemsController');

// Admin middleware (reuse from subjects)
// const checkAdmin = (req, res, next) => {
//   // ... (JWT decode and isAdmin check)
//   next();
// };

router.get('/subject/:subjectId/problem/:problemId', problemsController.getProblemDetails);
router.get("/:id/problems", getProblemsBySubject);

router.post("/:subjectId", addProblem);
router.put("/:subjectId/:problemId", updateProblem);
router.delete("/:subjectId/:problemId", deleteProblem);

module.exports = router ;
