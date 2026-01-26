import axios from "axios";


const API_URL = "http://localhost:8000/api";

export const registerUser = async (formData) => {
    const response = await axios.post(`${API_URL}/register`, formData);
        return response.data
}