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

    static async updateSelf(data) {
        try {
            return await axios.patch(`${USER_API_URL}/self`, data, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 400) return {message: e.response.data.message}
            else if (e.response.status === 403) return {message: e.response.data.message}
            else return {message: "Error happened"}
        }
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
            else return {message: "Error happened"}
        }
    }

    static async enrollTraining(data, userSubscriptionId, coachId) {
        try {
            return await axios.post(`${USER_API_URL}/training/enroll/${userSubscriptionId}/${coachId}`, data, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "You can not cancel this record"}
            else return {message: "Error happened"}
        }
    }

    static async purchaseSubscription(data, subscriptionId) {
        try {
            return await axios.post(`${USER_API_URL}/buySubscription/${subscriptionId}`, data, {headers})
        } catch (e) {
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 403) return {message: "You already have this type of subscription"}
            else return {message: "Error happened"}
        }
    }
}