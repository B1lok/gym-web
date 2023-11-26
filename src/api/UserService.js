import axios from "axios";

const USER_API_URL = 'http://localhost:8080/gym/user'

const token = localStorage.getItem('token')
const headers = {
    'Authorization': 'Bearer '.concat(token)
}

export default class AuthService {
    static async getSelf() {
        return await axios.get(`${USER_API_URL}/self`, {headers})
    }
}