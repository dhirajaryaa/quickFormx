import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

axios.defaults.withCredentials = true;

const getForms = async () => {
    try {
        const response = await axios.get(`${API_URL}/forms?page=1&limit=10`);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}

export {
    getForms
}
