import React, { useState, useEffect } from "react";
import "./AddSubjectModal.css";

function AddSubjectModal({ onClose, onSave, initialData = { title: "", code: "", description: "" } }) {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [description, setDescription] = useState("");

  // Update state when initialData changes
  useEffect(() => {
    setSubjectName(initialData.title || "");
    setSubjectCode(initialData.code || "");
    setDescription(initialData.description || "");
  }, []);

  const handleSave = () => {
    if (subjectName && subjectCode) {
      onSave({ title: subjectName, code: subjectCode, description });
      // Only clear fields if it's a new subject (not editing)
      if (!initialData.title) {
        setSubjectName("");
        setSubjectCode("");
        setDescription("");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add New Subject</h2>
          <p className="modal-subtitle">
            Create a new subject for the CodeLab platform
          </p>
        </div>

        <div className="input-row">
          <div className="input-group half-width">
            <label>Subject Name *</label>
            <input
              className="input-sub"
              type="text"
              placeholder="e.g., Data Structures Lab"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
            <small>Full name of the subject</small>
          </div>

          <div className="input-group half-width">
            <label>Subject Code *</label>
            <input
              className="input-sub"
              type="text"
              placeholder="e.g., CS201"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
            <small>Unique identifier code</small>
          </div>
        </div>

        <div className="input-group">
          <label>Description (Optional)</label>
          <textarea
            placeholder="Brief description of the subject..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <small>Supports markdown formatting</small>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="create-btn" onClick={handleSave}>
            {initialData.title ? "Save Changes" : "Create Subject"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubjectModal;