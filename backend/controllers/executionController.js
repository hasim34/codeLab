const Judge0Service = require("../utils/judge0");
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const getProblemData = async (problemId, subjectId) => {
  try {
    const filePath = path.join(
      __dirname,
      "../json/testcases",
      `subject${subjectId}`,
      `problem${problemId}.json`
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Problem data not found for problem ${problemId} in subject ${subjectId}`
      );
    }

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log("Error reading problem data: ", err);
    throw new Error("Failed to load problem data");
  }
};

const executeCode = async (req, res) => {
  try {
    const { sourceCode, languageId, problemId, subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({ error: "Subject ID is required" });
    }

    const problemData = await getProblemData(problemId, subjectId);

    if (!problemData.samples || problemData.samples.length === 0) {
      return res
        .status(400)
        .json({ error: "No test cases found for this problem" });
    }

    const testCase = problemData.samples[0];
    
    const result = await Judge0Service.submitCode(
      sourceCode,
      languageId,
      testCase.input
    );

    const isCorrect =
      result.stdout && result.stdout.trim() === testCase.output.trim();

    const response = {
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      time: result.time || "0.00",
      memory: result.memory || 0,
      status: result.status?.description || "Unknown",
      passed: isCorrect,
    };
    res.json(response);
  } catch (err) {
    console.log("Code execution error: ", err);
    res.status(500).json({ error: err.message });
  }
};

const submitSolution = async (req, res) => {
  try {
    const { sourceCode, languageId, problemId, subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({ error: "subjectid is required" });
    }

    const problemData = await getProblemData(problemId, subjectId);

    const allTestCases = [...problemData.samples, ...problemData.hidden];

    if (allTestCases.length === 0) {
      return res
        .status(400)
        .json({ error: "no test cases found for this problem" });
    }

    let passedTests = 0;
    const testResults = [];

    for (const testCase of allTestCases) {
      const result = await Judge0Service.submitCode(
        sourceCode,
        languageId,
        testCase.input
      );
      const isCorrect =
        result.stdout && result.stdout.trim() === testCase.output.trim();

      if (isCorrect) passedTests++;

      testResults.push({
        input: testCase.input,
        expected: testCase.output,
        output: result.stdout || "",
        passed: isCorrect,
        time: result.time || "0.00",
        memory: result.memory || 0,
      });
    }
    const status = passedTests === allTestCases.length? 'Accepted' : 'Wrong Answer';
    res.json({status, passedTests, totalTests: allTestCases.length, testResults: testResults.slice(0, problemData.samples.length) });

  } catch (err) {
    console.error("Submission error: ", err);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProblemData, executeCode, submitSolution };
