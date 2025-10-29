import "./dashboard.css";
import SubjectCard from "./SubjectCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AddSubjectModal from "./AddSubjectModal.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
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
    fetchSubjects(); 
  }, [navigate]);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/subjects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(res.data.subjects);
      // setUserName(res.data.name || "User");
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const handleAddSubject = async (subjectData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/subjects`, subjectData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubjects();
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding subject:", err);
    }
  };

  const handleEditSubject = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_API_URL}/subjects/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubjects();
    } catch (err) {
      console.error("Error editing subject:", err);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubjects();
    } catch (err) {
      console.error("Error deleting subject:", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome back, {userName || "User"}! 👋</h2><div className="admin-addsubbutton">
      <p>Continue your coding journey...</p>
      {isAdmin && (
        <button onClick={() => setShowAddModal(true)} className="add-subject-btn">
          Add Subject
        </button>
      )}</div>
      <div className="subjects-grid">
        {subjects.map((sub) => (
          <SubjectCard
            key={sub.id}
            id={sub.id}
            title={sub.title}
            code={sub.code}
            description={sub.description}
            isAdmin={isAdmin}
            onEdit={handleEditSubject}
            onDelete={handleDeleteSubject}
          />
        ))}
      </div>
      {showAddModal && (
        <AddSubjectModal onClose={() => setShowAddModal(false)} onSave={handleAddSubject} />
      )}
    </div>
  );
}

export default Dashboard;