import "./experiments.css";
import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Experiments() {
  const { id } = useParams();
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/problems/${id}/problems`
      );
      setExperiments(res.data);
    } catch (err) {
      console.error("Error fetching experiments:", err);
      setError("Failed to load experiments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiments();
  }, [id]);

  if (loading) return <p>Loading experiments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="subject-page">
      <h2>Subject {id} Problems</h2>
      <p>Practice and master the problems for this subject.</p>

      <div className="experiment-list">
        {experiments.map((exp) => (
          <div key={exp.id} className="experiment-card">
            <h3>{exp.title}</h3>
            <p>Level: {exp.level}</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${exp.progress}%` }}
              ></div>
            </div>
            <NavLink
              to={`/dashboard/subject/${id}/editor/${exp.id}`}
              className="continue-btn"
            >
              Continue
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Experiments;
