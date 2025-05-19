import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

axios.defaults.withCredentials= true;

const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}
const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}
export { loginUser,registerUser }
