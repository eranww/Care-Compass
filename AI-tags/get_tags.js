// install axios with: npm install axios
const axios = require('axios');

async function getTagsAPI(text_file_name) {
    try {
        const response = await axios.post('http://localhost:5000/run-python-function', {
            param1: text_file_name
        });
        console.log('Result from Python:', response.data.result);
    } catch (error) {
        console.error('Error calling Python function:', error);
    }
}

getTagsAPI(text_file_name);
