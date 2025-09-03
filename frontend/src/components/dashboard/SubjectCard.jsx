import "./subjectcard.css";
import { NavLink } from "react-router-dom";

function SubjectCard({id, title, description, completed, total}){
    const percentage = Math.round((completed / total) * 100);

    return (
        <div className="subject-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="progress-bar">
                <div className="progress-fill" style={{width: `${percentage}%`}}></div>
            </div>
            <p>{completed}/{total} completed ({percentage}%)</p>
            <NavLink to={`/dashboard/subject/${id}`} className="open-btn">Open Subject</NavLink>
        </div>
    );
}

export default SubjectCard;