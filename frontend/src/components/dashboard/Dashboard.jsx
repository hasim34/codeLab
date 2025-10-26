import "./dashboard.css";
import SubjectCard from "./SubjectCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
// import jwtDecode from "jwt-decode"; // Add this library
import AddSubjectModal from "./AddSubjectModal.jsx"; // Create this component (see below)

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch user role from JWT on mount
  useEffect(() => {
    // const token = localStorage.getItem("token"); // Adjust based on storage method
    // if (token) {
    //   // const decodedToken = jwtDecode(token);
    //   // setIsAdmin(decodedToken.isAdmin || false);
    //   setIsAdmin(true);
    // }
    setIsAdmin(true);

    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/subjects`, {
        withCredentials: true,
      });
      setSubjects(res.data);
    } catch (err) {
      console.error("Error fetching subjects: ", err);
    }
  };

  const handleAddSubject = async (subjectData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/subjects`, subjectData, {
        withCredentials: true,
      });
      fetchSubjects(); // Refresh subjects list
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding subject: ", err);
    }
  };

  const handleEditSubject = async (id, updatedData) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/subjects/${id}`, updatedData, {
        withCredentials: true,
      });
      fetchSubjects(); // Refresh subjects list
    } catch (err) {
      console.error("Error editing subject: ", err);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/subjects/${id}`, {
        withCredentials: true,
      });
      fetchSubjects(); // Refresh subjects list
    } catch (err) {
      console.error("Error deleting subject: ", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome back, Name! 👋</h2>
      <p>Continue your coding journey...</p>

      {isAdmin && (
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            backgroundColor: "#3b82f6",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Add Subject
        </button>
      )}

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