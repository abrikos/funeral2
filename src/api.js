import axios from "axios";

export default {
    getToken() {
        return localStorage.getItem('Authorization')
    },

    setToken(token) {
        localStorage.setItem('Authorization', token)
    },

    async login(user) {
        const res = await axios.get('/auth?user=' + user)
        if (res.headers.authorization) {
            this.setToken(res.headers.authorization)
            return true;
        }
    },

    async get(endpoint) {
        const response = await axios.get(endpoint, {headers: {'Authorization': this.getToken()}})
        return response.data;
    },

    async patch(endpoint, data) {
        console.log(data)
        const response = await axios.patch(endpoint, data, {headers: {'Authorization': this.getToken()}})
        return response.data;
    },

    async delete(endpoint){
        const response = await axios.delete(endpoint, {
            headers: {
                'Authorization': this.getToken(),
            }
        })
        return response.data;
    },

    async upload(id, form) {
        const response = await axios.post(`/companies/${id}/image`, form, {
            headers: {
                'Authorization': this.getToken(),
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data;
    },

}
