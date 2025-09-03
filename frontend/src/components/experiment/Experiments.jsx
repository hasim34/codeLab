import "./experiments.css";
import { useParams, NavLink } from "react-router-dom";

function Experiments() {
  const { id } = useParams();

  const experiments = [
    { id: 1, title: "Two Sum Problem", level: "Easy", progress: 100 },
    { id: 2, title: "Reverse Linked List", level: "Medium", progress: 60 },
  ];

  return (
    <div className="subject-page">
      <h2>Data Structures & Algorithms </h2>
      <p>Master fundamental data structures and algorithms.</p>

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
