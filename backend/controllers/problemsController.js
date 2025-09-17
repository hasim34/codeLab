const path = require("path");
const fs = require("fs");
const getProblemsBySubject = async (req, res) => {
  try {
    const subjectId = parseInt(req.params.id); 
    const filePath = path.join(__dirname, "../json/experiment.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const problems = JSON.parse(data);

    const subjectProblems = problems.filter((p) => p.subjectId === subjectId);

    if (subjectProblems.length === 0) {
      return res.status(404).json({ message: "No problems found for this subject" });
    }

    res.status(200).json(subjectProblems);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch problems",
      error: err.message,
    });
  }
};

module.exports = { getProblemsBySubject };

