import { useEffect, useState } from "react";
import "./editor.css";
import axios from "axios";
import { getLanguageId } from "../../utils/languages";
import {useLocation} from "react-router-dom";
import {useLoader} from "../../context/LoaderContext";

export default function CodeEditor() {
  const {loading, showLoader, hideLoader} = useLoader();
  const location = useLocation();
  const { subjectId, problemId} = location.state || {};
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
    } finally{
      hideLoader();
    }
  };

  const handleSubmit = async () => {
    if (!subjectId || !setProbelmData) {
      setTestOutput("Error: Subject ID or Problem Id missing!");
      return;
    }
    showLoader();
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
    } finally{
      hideLoader();
    }
  };

  if(!problemData){
    return <div>Loading problem...</div>;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="problem-header">
          <h2>{problemData.title}</h2>
          <span className="{`difficulty-badge ${problemData.difficulty}`}"> {problemData.difficulty} </span>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p>{problemData.description}</p>

          {problemData.examples && problemData.examples.map( (example, index) => {
            <div key={index}>
              <h4>Example {index+1}</h4>
              <p>Input {example.input}</p>
              {example.target && <p>Target: {example.target}</p>}
              <p>Output: {example.output}</p>
              {example.explanation && <p>Explanation: {example.explanation}</p>}
            </div>
          })}

          <h4>Constraints:</h4>
          <ul> {problemData.constraints.map( (constraint, index) => {
            <li key={index}>{constraint}</li>
          })}</ul>
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

        <textarea
          id="code-editor"
          className="code-editor"
          value={code}
          onChange={ (e) => setCode(e.target.value)}
          placeholder={`Write your ${language} code here...`}
        />

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
