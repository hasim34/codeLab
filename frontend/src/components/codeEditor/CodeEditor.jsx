import { useEffect, useState } from "react";
import "./editor.css";
import axios from "axios";
import { getLanguageId } from "../../utils/languages";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import AceEditor from "react-ace";

// Import Ace modes for the 5 languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp"; // For C and C++
import "ace-builds/src-noconflict/theme-monokai"; // Dark theme base

export default function CodeEditor() {
  const { showLoader, hideLoader } = useLoader();
  const location = useLocation();
  const { subjectId, problemId } = location.state || {};
  const [language, setLanguage] = useState("Python");
  const [problemData, setProblemData] = useState(null);
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [testOutput, setTestOutput] = useState("");

  // Map languages to Ace modes
  const languageToMode = {
    Python: "python",
    JavaScript: "javascript",
    Java: "java",
    "C++": "c_cpp",
    C: "c_cpp",
  };

  function generateStarterCode(language, signature) {
    const funcName = (signature && signature.functionName) || "solve";
    const params =
      (signature && signature.parameters?.map((p) => p.name).join(", ")) || "";

    switch (language) {
      case "Python":
        return `def ${funcName}(${params}):\n    # Write your code here\n    pass\n`;
      case "JavaScript":
        return `function ${funcName}(${params}) {\n  // Write your code here\n}\n`;
      case "C++":
        return `#include <bits/stdc++.h>\nusing namespace std;\n\nint ${funcName}(${params}) {\n    // Write your code here\n}\n`;
      case "Java":
        return `class Solution {\n    public static void ${funcName}(${params}) {\n        // Write your code here\n    }\n}\n`;
      case "C":
        return `#include <stdio.h>\n\nvoid ${funcName}(${params}) {\n    // Write your code here\n}\n`;
      default:
        return "// Language not supported yet\n";
    }
  }

  // Handle Ctrl+Enter for Run
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleRun();
    }
  };

  useEffect(() => {
    const fetchProblemDetails = async () => {
      if (!subjectId || !problemId) {
        setConsoleOutput("Error: Subject ID or Problem ID missing");
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/problems/subject/${subjectId}/problem/${problemId}`
        );
        setProblemData(res.data);
        setCode(generateStarterCode(language, res.data.signature || {}));
      } catch (err) {
        console.error("Error fetching problem details: ", err);
        setConsoleOutput("Error loading problem details");
      }
    };
    fetchProblemDetails();
  }, [subjectId, problemId, language]);

  const handleRun = async () => {
    if (!subjectId || !problemId) {
      setConsoleOutput("Error: Subject ID or Problem ID missing");
      return;
    }
    showLoader();
    setConsoleOutput("Running code...");
    setTestOutput("");
    console.log("Run API URL:", import.meta.env.VITE_API_URL);
    console.log("Run Request Body:", { sourceCode: code, languageId: getLanguageId(language), subjectId, problemId });
    try {
      const languageId = getLanguageId(language);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/execution/execute`,
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
    } finally {
      hideLoader();
    }
  };

  const handleSubmit = async () => {
    if (!subjectId || !problemId) {
      setTestOutput("Error: Subject ID or Problem Id missing!");
      return;
    }
    showLoader();
    setTestOutput("Submitting solution...");
    console.log("Submit API URL:", import.meta.env.VITE_API_URL);
    console.log("Submit Request Body:", { sourceCode: code, languageId: getLanguageId(language), problemId, subjectId });
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
    } finally {
      hideLoader();
    }
  };

  if (!problemData) {
    return <div>Loading problem...</div>;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="problem-header">
          <h2>{problemData.title}</h2>
          <span className={`difficulty-badge ${problemData.difficulty}`}>
            {problemData.difficulty}
          </span>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p>{problemData.description}</p>
          {problemData.examples?.map((example, index) => (
            <div key={index}>
              <h4>Example {index + 1}</h4>
              <p>Input: {example.input}</p>
              {example.target && <p>Target: {example.target}</p>}
              <p>Output: {example.output}</p>
              {example.explanation && <p>Explanation: {example.explanation}</p>}
            </div>
          ))}
          <h4>Constraints:</h4>
          <ul>
            {problemData.constraints?.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
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
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
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

        <div onKeyDown={handleKeyDown} tabIndex={0} style={{ height: "600px" }}>
          <AceEditor
            mode={languageToMode[language]}
            theme="monokai"
            onChange={(value) => setCode(value)}
            value={code}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="100%"
            setOptions={{
              enableBasicAutocompletion: false, // Disabled
              enableLiveAutocompletion: false,  // Disabled
              enableSnippets: false,            // Disabled
              tabSize: 4,                      // Indent size
              useSoftTabs: true,               // Spaces for tabs
              showGutter: true,                // Line numbers
              showPrintMargin: false,          // No vertical ruler
              wrapEnabled: true,               // Word wrap
              fontSize: 14,
              fontFamily: "monospace",
              autoIndent: true,                // Auto-indent on Enter
              enableAutoIndent: true,          // Ensure indentation
              highlightActiveLine: true,       // Highlight current line
              showLineNumbers: true,           // Line numbers
            }}
          />
        </div>

        <div className="outputs-container">
          <div className="console-output">
            <h4>Console Output</h4>
            <textarea className="console-textarea" readOnly value={consoleOutput} />
          </div>
          <div className="testcase-output">
            <h4>Test Case Output</h4>
            <textarea className="console-textarea" readOnly value={testOutput} />
          </div>
        </div>
      </div>
    </div>
  );
}