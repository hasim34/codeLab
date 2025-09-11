const path = require("path");
const fs = require("fs");

const getAllSubjects = async (req, res) => {
    try{
        const filePath = path.join(__dirname,"../json/subjects.json");

        const data = fs.readFileSync(filePath, "utf-8");

        const subjects = JSON.parse(data);

        res.status(200).json(subjects);
    } catch (err){
        res.status(500).json( {message : "Failed to fetch subjects", error : err});
    }
};

module.exports = {getAllSubjects};