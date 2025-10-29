const path = require("path");
const fs = require("fs").promises;
const db = require("../config/db");

const subjectsFilePath = path.join(__dirname, "../json/subjects.json");

const getAllSubjects = async (req, res) => {
  try {
    // const userId = req.user.user_id;  
    // const [user] = await db.query("SELECT name FROM users WHERE id = ?", [userId]);
    // const userName = user?.name || "User";

    const data = await fs.readFile(subjectsFilePath, "utf-8");
    const subjects = JSON.parse(data);

    res.status(200).json({subjects});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subjects", error: err });
  }
};

const addSubject = async (req, res) => {
  try {
    const { title, code, description } = req.body;
    const data = await fs.readFile(subjectsFilePath, "utf8");
    const subjects = JSON.parse(data);
    const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    const newSubject = { id: newId, title, code, description, completed: 0, total: 0 };
    subjects.push(newSubject);
    await fs.writeFile(subjectsFilePath, JSON.stringify(subjects, null, 2));
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(500).json({ message: "Error adding subject" });
  }
};

const editSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, code, description } = req.body;
    const data = await fs.readFile(subjectsFilePath, "utf8");
    let subjects = JSON.parse(data);
    const subjectIndex = subjects.findIndex(s => s.id === parseInt(id));
    if (subjectIndex === -1) return res.status(404).json({ message: "Subject not found" });
    subjects[subjectIndex] = { ...subjects[subjectIndex], title, code, description };
    await fs.writeFile(subjectsFilePath, JSON.stringify(subjects, null, 2));
    res.json(subjects[subjectIndex]);
  } catch (err) {
    res.status(500).json({ message: "Error editing subject" });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(subjectsFilePath, "utf8");
    let subjects = JSON.parse(data);
    const subjectIndex = subjects.findIndex(s => s.id === parseInt(id));
    if (subjectIndex === -1) return res.status(404).json({ message: "Subject not found" });
    subjects.splice(subjectIndex, 1);
    await fs.writeFile(subjectsFilePath, JSON.stringify(subjects, null, 2));
    res.status(200).json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting subject" });
  }
};

module.exports = { getAllSubjects, addSubject, editSubject, deleteSubject };
