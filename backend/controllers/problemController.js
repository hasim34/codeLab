const path = require("path");
const fs = require("fs");

const getAllProblems = (req, res) => {
  try {
    const filePath = path.join(__dirname, "../json/problems.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const problems = JSON.parse(data);
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ message: "Error reading problems file" });
  }
};

const getProblemsBySubject = (req, res) => {
  try {
    const { subjectId } = req.params;
    const filePath = path.join(__dirname, "../json/problems.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const problems = JSON.parse(data);

    const filtered = problems.filter(
      (problem) => problem.subjectId == subjectId
    );

    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error fetching problems" });
  }
};

module.exports = { getAllProblems, getProblemsBySubject };


// const fs = require("fs");

// const getProblems = () => {
//   const data = fs.readFileSync("./problems.json", "utf-8");
//   return JSON.parse(data);
// };

// const getAllProblems = (req, res) => {
//   res.json(getProblems());
// };

// const getProblemsBySubject = (req, res) => {
//   const problems = getProblems();
//   const subjectId = parseInt(req.params.subjectId);
//   const filtered = problems.filter(p => p.subjectId === subjectId);
//   res.json(filtered);
// };

// const getProblemById = (req, res) => {
//   const problems = getProblems();
//   const problem = problems.find(p => p.id === parseInt(req.params.id));
//   if (!problem) return res.status(404).json({ message: "Problem not found" });
//   res.json(problem);
// };

// module.exports = { getAllProblems, getProblemsBySubject, getProblemById };
