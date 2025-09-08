import "./dashboard.css";
import "./SubjectCard.jsx";
import SubjectCard from "./SubjectCard.jsx";

function Dashboard() {
  const subjects = [
    {
      id: 1,
      title: "Data Structures & Algorithms Lab",
      description: "Learn fundamental data structures and algorithms.",
      completed: 8,
      total: 15,
    },
    {
      id: 2,
      title: "Database Management Lab",
      description: "Design and implement databases using SQL and NoSQL.",
      completed: 6,
      total: 12,
    },
  ];

  const fetchSubject = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/subjects`);
    } catch (err) {
      console.error("Error fetching subjects: ",err);
    }
  };

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
