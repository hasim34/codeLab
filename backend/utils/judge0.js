const axios = require("axios");

class Judge0Service {
    static async submitCode(sourceCode, languageId, stdin = null){
        try{
            const data = { sourceCode: sourceCode, languageId: languageId, stdin: stdin || ''};
            const response = await axios.post(`${process.env.JUDGE0_API_URL}`, data,{
                params: { base64_encoded: false, wait: true}
            });

            return response.data;
        }catch(err){
            console.error('Judge0 API error: ', err.response?.data || err.message);
            throw new Error('Failed to execute code');
        }
    }
}

module.exports = Judge0Service;