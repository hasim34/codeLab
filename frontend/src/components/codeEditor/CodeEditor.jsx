import React, { useState } from "react";
import "./editor.css";

export default function CodeEditor() {
  const [language, setLanguage] = useState("Python");

  const handleRun = () => {
    console.log("Run clicked!");
    alert("run clicked");
  };

  const handleSubmit = () => {
    console.log("Submit clicked!");
    alert("submit button clicked");
  };

  return (
    <div className="container">
    
      <div className="sidebar">
        <div className="problem-header">
          <h2>Two Sum Problem</h2>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p>
            Given an array of integers nums and an integer target, return indices
            of the two numbers such that they add up to target...
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
            <button className="run-btn" onClick={handleRun}>Run</button>
            <button className="run-btn" onClick={handleSubmit}>Submit</button>
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