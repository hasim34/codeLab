// import { NavLink, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Breadcrumbs() {
//   const location = useLocation();
//   const { id, experimentId } = useParams();

//   const [subjectName, setSubjectName] = useState("");
//   const [problemTitle, setProblemTitle] = useState("");

//   useEffect(() => {
//     if (id) {
//       axios.get(`${import.meta.env.VITE_API_URL}/subjects`)
//         .then(res => {
//           const subject = res.data.find(s => s.id === parseInt(id));
//           if (subject) setSubjectName(subject.title);
//         })
//         .catch(err => console.error("Error fetching subject:", err));
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id && experimentId) {
//       axios.get(`${import.meta.env.VITE_API_URL}/subjects/${id}/problems`)
//         .then(res => {
//           const problem = res.data.find(p => p.id === parseInt(experimentId));
//           if (problem) setProblemTitle(problem.title);
//         })
//         .catch(err => console.error("Error fetching problem:", err));
//     }
//   }, [id, experimentId]);

//   const pathnames = location.pathname.split("/").filter(x => x);

//   return (
//     <nav className="breadcrumbs">
//       <NavLink to="/dashboard">Dashboard</NavLink>

//       {id && (
//         <>
//           <span> &gt; </span>
//           <NavLink to={`/dashboard/subject/${id}`}>{subjectName}</NavLink>
//         </>
//       )}

//       {experimentId && (
//         <>
//           <span> &gt; </span>
//           <span>{problemTitle}</span>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Breadcrumbs;




// import { NavLink, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Breadcrumbs() {
//   const { id, experimentId } = useParams();

//   const [subjectName, setSubjectName] = useState("");
//   const [problemTitle, setProblemTitle] = useState("");

//   // Get subject name
//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`${import.meta.env.VITE_API_URL}/subjects/${id}`)
//         .then((res) => {
//           setSubjectName(res.data.title); // assuming API returns single subject
//         })
//         .catch((err) => console.error("Error fetching subject:", err));
//     }
//   }, [id]);

//   // Get problem title
//   useEffect(() => {
//     if (id && experimentId) {
//       axios
//         .get(`${import.meta.env.VITE_API_URL}/subjects/${id}/problems/${experimentId}`)
//         .then((res) => {
//           setProblemTitle(res.data.title); // single problem API
//         })
//         .catch((err) => console.error("Error fetching problem:", err));
//     }
//   }, [id, experimentId]);

//   return (
//     <nav className="breadcrumbs">
//       <NavLink to="/dashboard">Dashboard</NavLink>

//       {id && (
//         <>
//           <span> &gt; </span>
//           <NavLink to={`/dashboard/subject/${id}`}>{subjectName || "Subject"}</NavLink>
//         </>
//       )}

//       {experimentId && (
//         <>
//           <span> &gt; </span>
//           <span>{problemTitle || "Problem"}</span>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Breadcrumbs;





import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Breadcrumbs() {
  const { id, experimentId } = useParams();

  const [subjectName, setSubjectName] = useState("");
  const [problemTitle, setProblemTitle] = useState("");

  // Get subject name from all subjects
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/subjects`)
      .then((res) => {
        if (id) {
          const subject = res.data.find((s) => s.id === parseInt(id));
          if (subject) setSubjectName(subject.title);
        }
      })
      .catch((err) => console.error("Error fetching subjects:", err));
  }, [id]);

  // Get problem title from all problems of the subject
  useEffect(() => {
    if (id && experimentId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/subjects/${id}/problems`)
        .then((res) => {
          const problem = res.data.find(
            (p) => p.id === parseInt(experimentId)
          );
          if (problem) setProblemTitle(problem.title);
        })
        .catch((err) => console.error("Error fetching problems:", err));
    }
  }, [id, experimentId]);

  return (
    <nav className="breadcrumbs">
      <NavLink to="/dashboard">Dashboard</NavLink>

      {id && (
        <>
          <span> &gt; </span>
          <NavLink to={`/dashboard/subject/${id}`}>{subjectName || "Subject"}</NavLink>
        </>
      )}

      {experimentId && (
        <>
          <span> &gt; </span>
          <span>{problemTitle || "Problem"}</span>
        </>
      )}
    </nav>
  );
}

export default Breadcrumbs;
