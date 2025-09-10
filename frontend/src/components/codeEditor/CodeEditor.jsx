import React, { useEffect, useState } from "react";
import "./editor.css";
import axios from "axios";
import { getLanguageId } from "../utils/languages";

export default function CodeEditor() {
  const [language, setLanguage] = useState("Python");
  const [problemData, setProbelmData] = useState(null);
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  useEffect(() => {
    const fetchProblemDetails = async () => {
      if (!subjectId || !problemId) return;

      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/problems/subject/${subjectId}/problem/${problemId}`
        );
        setProbelmData(res.data);
        setCode(`#Write your ${language} code for: ${res.data.title}\n`);
      } catch (err) {
        console.error("Error fetching problem details: ", err);
      }
    };
    fetchProblemDetails();
  }, [subjectId, problemId, language]);

  const handleRun = async () => {
    if (!subjectId || !problemId) {
      setConsoleOutput("Error: Subject ID or Problem ID missing");
      return;
    }
    setConsoleOutput("Running code...");

    try {
      const languageId = getLanguageId(language);
      const res = await axios.post(
        `${import.meta.VITE_API_URL}/execution/execute`,
        {
          sourceCode: code,
          languageId: languageId,
          subjectId: subjectId,
          problemId: problemId,
        }
      );
      setConsoleOutput(
        `Output: ${res.data.stdout || ""}\n` +
          `Error: ${res.data.stderr || "None"}\n` +
          `Time: ${res.data.time}s\n` +
          `Memory: ${res.data.memory}KB\n` +
          `Status: ${res.data.status.description}\n` +
          `Passed: ${res.data.passed ? "Yes" : "No"}`
      );
    } catch (err) {
      console.error("Execution error: ", err);
      setConsoleOutput(
        `Error: ${err.response?.data?.error || "Failed to execute code"}`
      );
    }
  };

  const handleSubmit = async () => {
    if (!subjectId || !setProbelmData) {
      setTestOutput("Error: Subject ID or Problem Id missing!");
      return;
    }
    setTestOutput("Submitting solution...");

    try {
      const languageId = getLanguageId(language);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/execution/submit`,
        {
          sourceCode: code,
          languageId: languageId,
          problemId: problemId,
          subjectId: subjectId,
        }
      );

      setTestOutput(
        `Status: ${res.data.status}\n` +
          `Passed Tests: ${res.data.passedTests}/${res.data.totalTests}\n\n` +
          `Test Results: ${res.data.testResults
            .map(
              (test, index) =>
                `Test ${index + 1}: ${test.passed ? "PASS" : "FAIL"}\n` +
                `Input: ${test.input}\n` +
                `Expected: ${test.expected}\n` +
                `Output: ${test.output}\n` +
                `Time: ${test.time}s\n` +
                `Memory: ${test.memory}KB\n`
            )
            .join("\n")}`
      );
    } catch (err) {
      console.error("Error submitting solution: ", err);
      setTestOutput(
        `Error: ${err.response?.data?.error || "Failed to submit solution"}`
      );
    }
  };

  if(!problemData){
    return <div>Loading problem...</div>;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="problem-header">
          <h2>Two Sum Problem</h2>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p>
            Given an array of integers nums and an integer target, return
            indices of the two numbers such that they add up to target...
          </p>

          <h4>Example 1:</h4>
          <p>Input: nums = [2,7,11,15], target = 9</p>
          <p>Output: [0,1]</p>

          <h4>Example 2:</h4>
          <p>Input: nums = [3,3], target = 6</p>
          <p>Output: [0,1]</p>

          <h4>Constraints:</h4>
          <p>output should be two indices,target should be one number</p>
        </div>
      </div>

      <div className="code-section">
        <div className="code-header">
          <select
            className="language-dropdown"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="Python">Python</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
          </select>
          <div className="buttons-group">
            <button className="run-btn" onClick={handleRun}>
              Run
            </button>
            <button className="run-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>

        <textarea
          id="code-editor"
          className="code-editor"
          defaultValue={`# Write your ${language} code here\n`}
        />

        <div className="outputs-container">
          <div className="console-output">
            <h4>Console Output</h4>
            <textarea className="console-textarea" readOnly defaultValue={""} />
          </div>
          <div className="testcase-output">
            <h4>Test Case Output</h4>
            <textarea className="console-textarea" readOnly defaultValue={""} />
          </div>
        </div>
      </div>
    </div>
  );
}
