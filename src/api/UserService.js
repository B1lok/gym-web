import axios from "axios";

const USER_API_URL = 'http://localhost:8080/gym/user'

const token = localStorage.getItem('token')
const headers = {
    'Authorization': 'Bearer '.concat(token)
}

export default class UserService {
    static async getSelf() {
        return await axios.get(`${USER_API_URL}/self`, {headers})
    }

    static async getMySubscriptions() {
        return await axios.get(`${USER_API_URL}/mySubscriptions`, {headers})
    }

    static async getMyTrainings() {
        return await axios.get(`${USER_API_URL}/myTrainings`, {headers})
    }

    static async getMyTrainingsInSubscription(userSubscriptionId) {
        return await axios.get(`${USER_API_URL}/myTrainings/${userSubscriptionId}`, {headers})
    }

    static async cancelTrainingById(trainingId) {
        try {
            return await axios.post(`${USER_API_URL}/training/cancel/${trainingId}`, {}, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "You can not cancel this record"}
        }
    }

    static async enrollTraining(data, userSubscriptionId, coachId) {
        try {
            return await axios.post(`${USER_API_URL}/training/enroll/${userSubscriptionId}/${coachId}`, data, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "You can not cancel this record"}
        }
    }

}