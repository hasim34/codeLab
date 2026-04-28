const fs = require('fs');
const path = require('path');

const getProblemDetails = (req, res) => {
    try{
        const {subjectId, problemId} = req.params;

        const filePath = path.join(__dirname, '../json/testcases',`subject${subjectId}`,`problem${problemId}.json`);

        if(!fs.existsSync(filePath)){
            return res.status(404).json({error: 'problem not found'});
        }
        const data= fs.readFileSync(filePath,'utf8');
        const problemData = JSON.parse(data);

        const response = {
            problemId: problemData.problemId,
            subjectId: problemData.subjectId,
            title: problemData.title,
            description: problemData.description,
            difficulty: problemData.difficulty,
            examples: problemData.examples,
            constraints: problemData.constraints,
            signature: problemData.signature
        };
        res.json(response);
    }catch(err){
        console.log('Error getting problem details: ',err);
        return res.status(500).json({error: err});
    }
}

module.exports = {getProblemDetails, };