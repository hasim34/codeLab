import React, { useState, useEffect } from "react";
import "./problemModal.css"; 

function ProblemModal({ onClose, onSave, initialData = null, subjectId }) {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [examples, setExamples] = useState([]); // [{input, target, output, explanation}]
  const [signature, setSignature] = useState({ functionName: "solve", parameters: [], returnType: "List[int]" });
  const [visibleTests, setVisibleTests] = useState([]); // [{input, output}]
  const [hiddenTests, setHiddenTests] = useState([]); // [{input, output}]

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDifficulty(initialData.level || "Easy");
      setDescription(initialData.description || "");
      setExamples(initialData.examples || []);
      setSignature(initialData.signature || { functionName: "solve", parameters: [], returnType: "List[int]" });
      setVisibleTests(initialData.samples || []);
      setHiddenTests(initialData.hidden || []);
    }
  }, [initialData]);

  const addExample = () => setExamples([...examples, { input: "", target: "", output: "", explanation: "" }]);
  const updateExample = (index, field, value) => {
    const updated = [...examples];
    updated[index][field] = value;
    setExamples(updated);
  };
  const removeExample = (index) => setExamples(examples.filter((_, i) => i !== index));

  const addParameter = () => {
    const updated = { ...signature, parameters: [...signature.parameters, { name: "", type: "" }] };
    setSignature(updated);
  };
  const updateParameter = (index, field, value) => {
    const params = [...signature.parameters];
    params[index][field] = value;
    setSignature({ ...signature, parameters: params });
  };
  const removeParameter = (index) => {
    const params = signature.parameters.filter((_, i) => i !== index);
    setSignature({ ...signature, parameters: params });
  };

  const addVisibleTest = () => setVisibleTests([...visibleTests, { input: "", output: "" }]);
  const updateVisibleTest = (index, field, value) => {
    const updated = [...visibleTests];
    updated[index][field] = value;
    setVisibleTests(updated);
  };
  const removeVisibleTest = (index) => setVisibleTests(visibleTests.filter((_, i) => i !== index));

  const addHiddenTest = () => setHiddenTests([...hiddenTests, { input: "", output: "" }]);
  const updateHiddenTest = (index, field, value) => {
    const updated = [...hiddenTests];
    updated[index][field] = value;
    setHiddenTests(updated);
  };
  const removeHiddenTest = (index) => setHiddenTests(hiddenTests.filter((_, i) => i !== index));

  const handleSave = () => {
    onSave({
      title,
      difficulty,
      description,
      examples,
      signature,
      visibleTests,
      hiddenTests
    });
  };

  const renderBasicInfo = () => (
    <div className="tab-content">
      <div className="input-group">
        <label>Problem Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Two Sum Problem" />
      </div>
      <div className="input-row">
        <div className="input-group half">
          <label>Difficulty *</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div className="input-group half">
          <label>Subject *</label>
          <select disabled>
            <option>Subject {subjectId}</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label>Problem Description (Markdown) *</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Given an array of integers `nums` and an integer `target`, return indices..." />
        <small>Supports markdown formatting. Use backticks for code.</small>
      </div>
    </div>
  );

  const renderExamples = () => (
    <div className="tab-content">
      <label>Problem Examples (Visible to students)</label>
      <button onClick={addExample} className="add-btn">+ Add Example</button>
      {examples.map((ex, index) => (
        <div key={index} className="example-section">
          <div className="input-row">
            <div className="input-group">
              <label>Input</label>
              <input value={ex.input} onChange={(e) => updateExample(index, "input", e.target.value)} placeholder="[2,7,11,15]" />
            </div>
            <div className="input-group">
              <label>Target</label>
              <input value={ex.target} onChange={(e) => updateExample(index, "target", e.target.value)} placeholder="9" />
            </div>
          </div>
          <div className="input-group">
            <label>Output</label>
            <input value={ex.output} onChange={(e) => updateExample(index, "output", e.target.value)} placeholder="[0,1]" />
          </div>
          <div className="input-group">
            <label>Explanation</label>
            <textarea value={ex.explanation} onChange={(e) => updateExample(index, "explanation", e.target.value)} placeholder="Because nums[0] + nums[1] == 9..." />
          </div>
          <button onClick={() => removeExample(index)} className="remove-btn">Remove</button>
        </div>
      ))}
    </div>
  );

  const renderSignature = () => (
    <div className="tab-content">
      <label>Define Function Signature Interface for the Problem</label>
      <div className="input-group">
        <label>Function Name *</label>
        <input value={signature.functionName} onChange={(e) => setSignature({ ...signature, functionName: e.target.value })} placeholder="solve" />
      </div>
      <div className="parameters-section">
        <label>Parameters</label>
        {signature.parameters.map((param, index) => (
          <div key={index} className="param-row">
            <input value={param.name} onChange={(e) => updateParameter(index, "name", e.target.value)} placeholder="nums" />
            <input value={param.type} onChange={(e) => updateParameter(index, "type", e.target.value)} placeholder="List[int]" />
            <button onClick={() => removeParameter(index)} className="remove-btn">Remove</button>
          </div>
        ))}
        <button onClick={addParameter} className="add-btn">+ Add Parameter</button>
      </div>
      <div className="input-group">
        <label>Return Type *</label>
        <input value={signature.returnType} onChange={(e) => setSignature({ ...signature, returnType: e.target.value })} placeholder="List[int]" />
      </div>
    </div>
  );

  const renderTestCases = () => (
    <div className="tab-content">
      <div className="test-section">
        <label>Sample Test Cases (Visible)</label>
        <label>Students can see these test cases</label>
        <button onClick={addVisibleTest} className="add-btn">+ Add Sample</button>
        {visibleTests.map((test, index) => (
          <div key={index} className="test-row">
            <div className="input-group">
              <label>Input</label>
              <input value={test.input} onChange={(e) => updateVisibleTest(index, "input", e.target.value)} placeholder="[2,7,11,15]\n9" />
            </div>
            <div className="input-group">
              <label>Expected Output</label>
              <input value={test.output} onChange={(e) => updateVisibleTest(index, "output", e.target.value)} placeholder="[0,1]" />
            </div>
            <button onClick={() => removeVisibleTest(index)} className="remove-btn">Remove</button>
          </div>
        ))}
      </div>
      <div className="test-section">
        <label>Hidden Test Cases</label>
        <label>These test cases are hidden from students</label>
        <button onClick={addHiddenTest} className="add-btn">+ Add Hidden</button>
        {hiddenTests.map((test, index) => (
          <div key={index} className="test-row">
            <div className="input-group">
              <label>Input</label>
              <input value={test.input} onChange={(e) => updateHiddenTest(index, "input", e.target.value)} placeholder="[3,3]\n6" />
            </div>
            <div className="input-group">
              <label>Expected Output</label>
              <input value={test.output} onChange={(e) => updateHiddenTest(index, "output", e.target.value)} placeholder="[0,1]" />
            </div>
            <button onClick={() => removeHiddenTest(index)} className="remove-btn">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = ["Basic Info", "Examples", "Signature", "Test Cases"];
  const tabRenderers = {
    "Basic Info": renderBasicInfo,
    "Examples": renderExamples,
    "Signature": renderSignature,
    "Test Cases": renderTestCases
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{initialData ? "Edit Experiment" : "Add New Experiment"}</h2>
        </div>
        <div className="tabs">
          {tabs.map((tab) => (
            <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content-wrapper">
          {tabRenderers[activeTab]()}
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave} disabled={!title}>
            {initialData ? "Save Changes" : "Create Experiment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProblemModal;