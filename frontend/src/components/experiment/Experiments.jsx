import "./experiments.css";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import ProblemModal from "./ProblemModal.jsx";

function Experiments() {
  const { id } = useParams();
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null); // {id, title, level, description, examples, signature, samples, hidden}
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/"); 
    return;
  }
  try {
    const decoded = jwtDecode(token);
    setIsAdmin(decoded.role === "admin"); 
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("token"); 
    navigate("/"); 
  }
  fetchExperiments(); 
}, [id, navigate]); 

  const fetchExperiments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/problems/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setExperiments(res.data);
    } catch (err) {
      console.error("Error fetching experiments:", err);
      setError("Failed to load experiments");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProblem(null); // New problem
    setShowModal(true);
  };

  const handleEdit = async (problemId) => {
    try {
      // Fetch detailed data
      const token = localStorage.getItem("token");
      const detailRes = await axios.get(`${import.meta.env.VITE_API_URL}/problems/subject/${id}/problem/${problemId}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const { description, examples, signature, samples, hidden } = detailRes.data;
      const exp = experiments.find(e => e.id === problemId);
      setEditingProblem({ id: problemId, title: exp.title, level: exp.level, description, examples, signature, samples, hidden });
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching problem details:", err);
    }
  };

  const handleDelete = async (problemId) => {
    if (window.confirm("Are you sure you want to delete this experiment?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${import.meta.env.VITE_API_URL}/problems/${id}/${problemId}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        fetchExperiments();
      } catch (err) {
        console.error("Error deleting experiment:", err);
      }
    }
  };

  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        title: data.title,
        level: data.difficulty,
        description: data.description,
        examples: data.examples,
        signature: data.signature,
        samples: data.visibleTests,
        hidden: data.hiddenTests
      };
      if (editingProblem) {
        // Edit
        await axios.put(`${import.meta.env.VITE_API_URL}/problems/${id}/${editingProblem.id}`, payload, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
      } else {
        // Add
        await axios.post(`${import.meta.env.VITE_API_URL}/problems/${id}`, payload, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
      }
      fetchExperiments();
      setShowModal(false);
      setEditingProblem(null);
    } catch (err) {
      console.error("Error saving experiment:", err);
    }
  };

  if (loading) return <p>Loading experiments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="subject-page">
      <div className="subject-admin-button">
      <h2>Subject {id} Problems</h2>
      {isAdmin && (
        <button onClick={handleAdd} className="add-experiment-btn">
          + Add Experiment
        </button>
      )}</div>
      <p>Practice and master the problems for this subject.</p>

      <div className="experiment-list">
        {experiments.map((exp) => (
          <div key={exp.id} className="experiment-card">
            <h3>{exp.title}</h3>
            <p>Level: {exp.level}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${exp.progress}%` }}></div>
            </div>
            <NavLink to={`/dashboard/subject/${id}/editor/${exp.id}`} className="continue-btn" state={{ subjectId: id, problemId: exp.id }}>
              Continue
            </NavLink>
            {isAdmin && (
              <div className="admin-actions">
                <button onClick={() => handleEdit(exp.id)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(exp.id)} className="delete-btn">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <ProblemModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          initialData={editingProblem}
          subjectId={id}
        />
      )}
    </div>
  );
}

export default Experiments;