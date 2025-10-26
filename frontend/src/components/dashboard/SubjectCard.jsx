import "./subjectcard.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import AddSubjectModal from "./AddSubjectModal.jsx";

function SubjectCard({ id, title, code, description, isAdmin, onEdit, onDelete }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setShowAddModal(true);
  };

  const handleDeleteConfirm = (confirm) => {
    setShowDeleteConfirm(false);
    if (confirm) {
      onDelete(id);
    }
  };

  return (
    <div className="subject-card">
      <h3>{title} - {code}</h3>
      <div className="content-row">
        <p className="description">{description}</p>
        <NavLink to={`/dashboard/subject/${id}`} className="open-btn">
          Open Subject
        </NavLink>
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button onClick={handleEdit} className="edit-btn">
            Edit
          </button>
          <button onClick={() => setShowDeleteConfirm(true)} className="delete-btn">
            Delete
          </button>
        </div>
      )}
      {showAddModal && (
        <AddSubjectModal
          onClose={() => setShowAddModal(false)}
          onSave={(data) => onEdit(id, data)}
          initialData={{ title, code, description }}
        />
      )}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm">
            <p>Are you sure you want to delete this subject?</p>
            <div className="confirm-buttons">
              <button onClick={() => handleDeleteConfirm(false)} className="cancel-btn">
                No
              </button>
              <button onClick={() => handleDeleteConfirm(true)} className="confirm-btn">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectCard;