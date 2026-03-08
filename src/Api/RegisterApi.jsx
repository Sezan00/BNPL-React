import axios from "axios";


const API_URL = "https://bnpl-backend.sezan.xyz/api";

export const registerUser = async (formData) => {
    const response = await axios.post(`${API_URL}/register`, formData);
        return response.data
}