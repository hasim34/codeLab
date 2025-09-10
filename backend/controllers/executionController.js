const Judge0Service = require('../utils/judge0');
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const executionController = async(req, res) => {
    try{
        const filePath = path.join(__dirname,'../json/testcases','subject${subjectId}','problem${problemId}.json');

        if(!fs.existsSync(filePath)){
            throw new Error(`Problem data not found for problem ${problemId} in subject ${subjectId}`);
        }

        const data = fs.readFileSync(filePath,'utf8');
        return JSON.parse(data);
    }catch(err){
        res.status(500).json({error: err});
    }
}

const codeController = async(req, res) => {
    try{
        const {sourceCode, languageId, problemId, subjectId} = req.body;

        if(!subjectId){
            return res.status(400).json({error: 'Subject ID is required'});
        }

    } catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = {executionController};