import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


const saveSubmission = async (userInput) => {
    try {
        const response = await axios.post(`${API_URL}/submit`, userInput);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}

export { saveSubmission }
