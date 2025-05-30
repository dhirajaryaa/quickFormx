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
const getOneForm = async (fromId) => {
    try {
        const response = await axios.get(`${API_URL}/forms/${fromId}`);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}
const getOnePublicForm = async (publicId) => {
    try {
        const response = await axios.get(`${API_URL}/forms/public/${publicId}`);
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
const updateOneForm = async ({id,data}) => {
    try {
        const response = await axios.patch(`${API_URL}/forms/${id}`,data);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}
const deleteOneForm = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/forms/${id}`);
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}

export {
    getForms,
    getOneForm,
    createForm,
    updateOneForm,
    deleteOneForm,
    getOnePublicForm
}
