const express = require("express");
const router = express.Router();
const executionController = require('../controllers/executionController');

router.post('/execute', executionController.executeCode);
router.post('/submit', executionController.submitSolution);

module.exports = router;