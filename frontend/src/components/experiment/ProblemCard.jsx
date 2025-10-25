import React from "react";
import "./problemcard.css";

const ProblemCard = ({ problem }) => {
  return (
    <div className="problem-card">
      <div className="problem-header">
        <h3>{problem.title}</h3>
        <span className={`level ${problem.level.toLowerCase()}`}>{problem.level}</span>
      </div>
      <p>{problem.description}</p>
      <div className="tags">
        {problem.tags.map((tag, idx) => (
          <span key={idx} className="tag">{tag}</span>
        ))}
      </div>
      <div className="problem-footer">
        <span>{problem.time}</span>
        <progress value={problem.progress} max="100"></progress>
        <button>{problem.progress === 100 ? "Review" : "Continue"}</button>
      </div>
    </div>
  );
};

export default ProblemCard;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./problemcard.css";

// const ProblemCard = ({ problem }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="problem-card">
//       <div className="problem-header">
//         <h3>{problem.title}</h3>
//         <span className={`level ${problem.level.toLowerCase()}`}>
//           {problem.level}
//         </span>
//       </div>

//       <p>{problem.description}</p>

//       <div className="tags">
//         {problem.tags.map((tag, idx) => (
//           <span key={idx} className="tag">{tag}</span>
//         ))}
//       </div>

//       <div className="problem-footer">
//         <span>{problem.time}</span>
//         <progress value={problem.progress} max="100"></progress>
//         <button
//           onClick={() => navigate(`/problem/${problem.id}`)}
//         >
//           {problem.progress === 100 ? "Review" : "Continue"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProblemCard;
