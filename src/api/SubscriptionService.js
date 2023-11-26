import axios from "axios";

const SUBSCRIPTION_API_URL = 'http://localhost:8080/gym/subscriptions'

const token = localStorage.getItem('token')
const headers = {
    'Authorization': 'Bearer '.concat(token)
}
export default class SubscriptionService {

    static async getAllSubscriptions() {
        return await axios.get(`${SUBSCRIPTION_API_URL}`)
    }

    static async deleteSubscriptionById(id) {
        try {
            return await axios.delete(`${SUBSCRIPTION_API_URL}/deleteSubscription/${id}`, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "This operation is forbidden"}
            else if (e.response.status === 404) return {message: "Record not found"}
        }
    }
}