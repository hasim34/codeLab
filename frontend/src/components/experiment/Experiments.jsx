// import "./experiments.css";
// import { useParams, NavLink } from "react-router-dom";

// function Experiments() {
//   const { id } = useParams();

//   const experiments = [
//     { id: 1, title: "Two Sum Problem", level: "Easy", progress: 100 },
//     { id: 2, title: "Reverse Linked List", level: "Medium", progress: 60 },
//   ];

//   return (
//     <div className="subject-page">
//       <h2>Data Structures & Algorithms </h2>
//       <p>Master fundamental data structures and algorithms.</p>

//       <div className="experiment-list">
//         {experiments.map((exp) => (
//           <div key={exp.id} className="experiment-card">
//             <h3>{exp.title}</h3>
//             <p>Level: {exp.level}</p>
//             <div className="progress-bar">
//               <div
//                 className="progress-fill"
//                 style={{ width: `${exp.progress}%` }}
//               ></div>
//             </div>
//             <NavLink
//               to={`/dashboard/subject/${id}/editor/${exp.id}`}
//               className="continue-btn"
//             >
//               Continue
//             </NavLink>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Experiments;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProblemCard from "./ProblemCard";
import "./experiments.css";


function Experiments() {
  const { id } = useParams();
  const [problems, setProblems] = useState([]);
  const [subjectTitle, setSubjectTitle] = useState("Loading...");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/problems/${id}`
        );

        // 🔹 Check API format
        if (Array.isArray(res.data)) {
          setProblems(res.data);
          setSubjectTitle("Data Structures & Algorithms Lab"); // default
        } else {
          setProblems(res.data.problems || []);
          setSubjectTitle(res.data.subjectTitle || "Subject");
        }
      } catch (err) {
        console.error("Error fetching problems:", err);
      }
    };
    fetchProblems();
  }, [id]);

  // ✅ Safely calculate progress
  const solvedCount = problems ? problems.filter(p => p.progress === 100).length : 0;

  return (
    <div className="experiments">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <span>›</span>
        <span>{subjectTitle}</span>

      </div>

      <h2>{subjectTitle}</h2>
      <p>Master fundamental data structures and algorithms through hands-on programming</p>

      {/* Progress */}
      <div className="subject-progress">
        <span>
          Progress: {solvedCount}/{problems?.length || 0}
        </span>
        <progress value={solvedCount} max={problems?.length || 1}></progress>
      </div>

      {/* Problems list */}
      {(!problems || problems.length === 0) ? (
        <p>No problems found for this subject</p>
      ) : (
        problems.map((prob) => <ProblemCard key={prob.id} problem={prob} />)
      )}
    </div>
  );
}
export default Experiments;
