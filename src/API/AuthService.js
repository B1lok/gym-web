import axios from "axios";

const API_URL = 'http://localhost:8080'
export default class AuthService {
    static async signIn(data) {
        try {
            const response = await axios.post(`${API_URL}/sign-in`, data)
            return {data: response.data}
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 400) return {message: e.response.data.message}
            else if (e.response.status === 404) return {message: e.response.data.message}
            else return {message: "Error happened"}
        }
    }

    static async signUp(data) {
        try {
            const response = await axios.post(`${API_URL}/sign-up`, data)
            return {data: response.data}
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 400) return {message: e.response.data.message}
            else if (e.response.status === 404) return {message: e.response.data.message}
            else return {message: "Error happened"}
        }
    }
}