const path = require("path");
const fs = require("fs").promises;

const experimentsFile = path.join(__dirname, "../json/experiment.json");
const testcasesDir = path.join(__dirname, "../json/testcases");

const getProblemsBySubject = async (req, res) => {
  try {
    const subjectId = parseInt(req.params.id); 
    const data = await fs.readFile(experimentsFile, "utf-8");
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
const addProblem = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { title, level, description, examples, signature, samples, hidden } = req.body;
    // Add to experiments.json
    const expData = await fs.readFile(experimentsFile, "utf8");
    const experiments = JSON.parse(expData);
    const newId = experiments.length > 0 ? Math.max(...experiments.map(e => e.id)) + 1 : 1;
    const newExp = { id: newId, subjectId: parseInt(subjectId), title, level, progress: 0 };
    experiments.push(newExp);
    await fs.writeFile(experimentsFile, JSON.stringify(experiments, null, 2));

    // Create detailed file
    const subjectDir = path.join(testcasesDir, `subject${subjectId}`);
    await fs.mkdir(subjectDir, { recursive: true });
    const problemFile = path.join(subjectDir, `problem${newId}.json`);
    const detailData = {
      problem_id: newId,
      subject_id: parseInt(subjectId),
      title,
      description,
      difficulty: level.toLowerCase(),
      examples,
      signature,
      samples, // visible
      hidden
    };
    await fs.writeFile(problemFile, JSON.stringify(detailData, null, 2));

    res.status(201).json(newExp);
  } catch (err) {
    res.status(500).json({ message: "Error adding problem" });
  }
};

const updateProblem = async (req, res) => {
  try {
    const { subjectId, problemId } = req.params;
    const { title, level, description, examples, signature, samples, hidden } = req.body;
    // Update experiments.json
    const expData = await fs.readFile(experimentsFile, "utf8");
    let experiments = JSON.parse(expData);
    const expIndex = experiments.findIndex(e => e.id === parseInt(problemId) && e.subjectId === parseInt(subjectId));
    if (expIndex === -1) return res.status(404).json({ message: "Problem not found" });
    experiments[expIndex] = { ...experiments[expIndex], title, level };
    await fs.writeFile(experimentsFile, JSON.stringify(experiments, null, 2));

    // Update detailed file
    const subjectDir = path.join(testcasesDir, `subject${subjectId}`);
    const problemFile = path.join(subjectDir, `problem${problemId}.json`);
    const detailData = await fs.readFile(problemFile, "utf8");
    let details = JSON.parse(detailData);
    details = { ...details, title, description, difficulty: level.toLowerCase(), examples, signature, samples, hidden };
    await fs.writeFile(problemFile, JSON.stringify(details, null, 2));

    res.json(experiments[expIndex]);
  } catch (err) {
    res.status(500).json({ message: "Error updating problem" });
  }
};

const deleteProblem = async (req, res) => {
  try {
    const { subjectId, problemId } = req.params;
    // Remove from experiments.json
    const expData = await fs.readFile(experimentsFile, "utf8");
    let experiments = JSON.parse(expData);
    const expIndex = experiments.findIndex(e => e.id === parseInt(problemId) && e.subjectId === parseInt(subjectId));
    if (expIndex === -1) return res.status(404).json({ message: "Problem not found" });
    experiments.splice(expIndex, 1);
    await fs.writeFile(experimentsFile, JSON.stringify(experiments, null, 2));

    // Delete detailed file
    const subjectDir = path.join(testcasesDir, `subject${subjectId}`);
    const problemFile = path.join(subjectDir, `problem${problemId}.json`);
    await fs.unlink(problemFile).catch(() => {}); // Ignore if not found

    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting problem" });
  }
};

const getProblemDetail = async (req, res) => {
  try {
    const { subjectId, problemId } = req.params;
    const subjectDir = path.join(testcasesDir, `subject${subjectId}`);
    const problemFile = path.join(subjectDir, `problem${problemId}.json`);
    const data = await fs.readFile(problemFile, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(404).json({ message: "Problem details not found" });
  }
};

module.exports = { getProblemsBySubject, addProblem, updateProblem, deleteProblem, getProblemDetail };

