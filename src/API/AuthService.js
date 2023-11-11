import axios from "axios";


const API_URL = 'http://localhost:8080'
export default class AuthService {

    static async signIn(user) {
        try {
            const response = await axios.post(`${API_URL}/sign-in`, user)
            return {data : response.data}
        } catch (e) {
            if (e.response.status === 404) return {message : e.response.data.message}
            else if (e.response.status === 400) return {message : "Specify all fields"}
            else return {message : "Error happened"}
        }
    }
}