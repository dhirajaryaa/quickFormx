import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

axios.defaults.withCredentials = true;

const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/profile`);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}

export {getUserProfile}
