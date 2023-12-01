import axios from "axios";

const COACH_API_URL = 'http://localhost:8080/gym/coach'

const token = localStorage.getItem('token')
const headers = {
    'Authorization': 'Bearer '.concat(token)
}
export default class CoachService {
    static async getSelf() {
        return await axios.get(`${COACH_API_URL}/getSelf`, {headers})
    }

    static async updateSelf(data) {
        try {
            return await axios.patch(`${COACH_API_URL}/update`, data, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 400) return {message: e.response.data.message}
            else if (e.response.status === 403) return {message: e.response.data.message}
            else return {message: "Error happened"}
        }
    }

    static async getAllCoaches() {
        return await axios.get(`${COACH_API_URL}/getAll`)
    }

    static async getAllMyRecords() {
        return await axios.get(`${COACH_API_URL}/records/getMyRecords`, {headers})
    }

    static async cancelRecordById(id) {
        try {
            return await axios.post(`${COACH_API_URL}/records/cancelById/${id}`, {}, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "You can not cancel this record"}
        }
    }
}