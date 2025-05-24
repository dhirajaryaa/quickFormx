import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

axios.defaults.withCredentials = true;

const getForms = async () => {
    try {
        const response = await axios.get(`${API_URL}/forms?page=1&limit=20`);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}
const createForm = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/forms`,data);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}

export {
    getForms,
    createForm
}
