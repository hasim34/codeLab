import "./dashboard.css";
import "./SubjectCard.jsx";
import SubjectCard from "./SubjectCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);

  const fetchSubject = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/subjects`);
      setSubjects(res.data);
    } catch (err) {
      console.error("Error fetching subjects: ",err);
    }
  };

  useEffect( () => {
    fetchSubject();
  }, [])

  return (
    <div className="dashboard">
      <h2>Welcome back, Name! 👋</h2>
      <p>Continue your coding journey...</p>

      <div className="subjects-grid">
        {subjects.map((sub) => (
          <SubjectCard
            id={sub.id}
            key={sub.id}
            title={sub.title}
            description={sub.description}
            completed={sub.completed}
            total={sub.total}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
