const axios = require('axios');

const api_key = '433319b1d5c94eabb9fe5446c01c44a8';
const makeRequest = async (url,request = "") => {
    try {
        const response = await axios.get(`${url}?key=${api_key}&${request}`);
        return response;
    } catch (e) {
        return null;
    }
}

module.exports = makeRequest;