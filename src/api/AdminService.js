import axios from "axios";


const ADMIN_API_URL = 'http://localhost:8080/gym/admin'

const token = localStorage.getItem('token')
const headers = {
    'Authorization': 'Bearer '.concat(token)
}

export default class AdminService {

    static async getCustomers() {
        return await axios.get(`${ADMIN_API_URL}/getCustomers`, {headers})
    }

    static async getCustomerSubscriptions(id) {
        return await axios.get(`${ADMIN_API_URL}/getCustomerSubscriptions/${id}`, {headers})
    }

    static async getCustomerTrainings(id) {
        return await axios.get(`${ADMIN_API_URL}/getCustomerTrainings/${id}`, {headers})
    }

    static async giveAdminRole(id) {
        try {
            return await axios.post(`${ADMIN_API_URL}/giveAdminRole/${id}`, {}, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "This operation is forbidden"}
            else if (e.response.status === 404) return {message: "Customer not found"}
        }
    }

    static async giveCoachRole(id, body) {
        try {
            return await axios.post(`${ADMIN_API_URL}/giveCoachRole/${id}`, body, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "This operation is forbidden"}
            else if (e.response.status === 404) return {message: "Customer not found"}
        }
    }

    static async getCoachRecords(id) {
        return await axios.get(`${ADMIN_API_URL}/getCoachRecords/${id}`, {headers})
    }

    static async removeAdminRole(id) {
        try {
            return await axios.post(`${ADMIN_API_URL}/takeAdminRole/${id}`, {}, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "This operation is forbidden"}
            else if (e.response.status === 404) return {message: "Admin not found"}
        }
    }

    static async removeCoachRole(coachId, coachToReplaceId) {
        try {
            return await axios.post(`${ADMIN_API_URL}/takeCoachRole/${coachId}/${coachToReplaceId}`, {}, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "This operation is forbidden"}
            else if (e.response.status === 404) return {message: "Coach not found"}
        }
    }

    static async getAllAdmins() {
        return await axios.get(`${ADMIN_API_URL}/getAdmins`, {headers})
    }

    static async getAllCoaches() {
        return await axios.get(`${ADMIN_API_URL}/getCoaches`, {headers})
    }
}
