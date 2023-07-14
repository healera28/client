import ApiError from "../Exeptions/exeptions"
import axios from 'axios'

const ENDPOINT = "http://localhost:8000/api"

class API {
    async createUser(body) {
        try {
            const response = await axios.post(`${ENDPOINT}/signup`, body)
            return response
        }catch(e) {
            return ApiError.BadRequest({status: e.response.data.status, message: e.response.data.message})
        }
    }

    async signUp(body) {
        try {
            const response = await axios.post(`${ENDPOINT}/admin/signUp`, body)
            return response
        }catch(e) {
            return ApiError.BadRequest({status: e.response.data.status, message: e.response.data.message})
        }
    }

    async signIn(body) {
        try {
            const response = await axios.post(`${ENDPOINT}/admin/signIn`, body)
            return response
        }catch(e) {
            return ApiError.BadRequest({status: e.response.data.status, message: e.response.data.message})
        }
    }

    async confirmCode(code) {
        try {
            const response = await axios.post(`${ENDPOINT}/admin/confirmCode`, {code})
            return response
        }catch(e) {
            return ApiError.BadRequest({status: e.response.data.status, message: e.response.data.message})
        }
    }

    async resetPassword(email) {
        try {
            const response = await axios.post(`${ENDPOINT}/admin/reset-password`, {email})
            return response
        }catch(e) {
            return ApiError.BadRequest({status: e.response.data.status, message: e.response.data.message})
        }
    }

    async getUsers() {
        try {
            const response = await axios(`${ENDPOINT}/users`)
            return response
        }catch(e) {
            return ApiError.BadRequest({status: e.response.data.status, message: e.response.data.message})
        }
    }
    async deleteUser(userId) {
        try {
            const response = await axios.delete(`${ENDPOINT}/delete/${userId}`)
            return response
        }catch(e) {
            return ApiError.BadRequest({status: e.response.data.status, message: e.response.data.message})
        }
    }
}   

export default new API()