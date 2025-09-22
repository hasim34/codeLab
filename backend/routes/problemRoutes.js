const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problems');

router.get('/subject/:subjectId/problem/:problemId', problemsController.getProblemDetails);
// router.get("/:id/problems", getProblemsBySubject);

module.exports = router ;
