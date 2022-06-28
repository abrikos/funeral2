const axios = require("axios");
const API_URL = 'http://135.181.35.61:2112'

axios.interceptors.response.use(function (response) {
    console.log(response.headers)
    return response;
}, function (error) {
    console.warn(error)
    return Promise.reject(error);
});


axios.get(API_URL + '/auth?user=123')
.then(res=>{
    console.log(res.data)
})