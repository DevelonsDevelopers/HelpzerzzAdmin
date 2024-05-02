import axiosInstance from "./axiosInstance";

const contractorRequestService = {
    single: async (id) => {
        try {
            const response = await axiosInstance.get('/contractorRequests/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },

    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/contractorRequests/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractorRequests/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    accept: async (id) => {
        try {
            const response = await axiosInstance.get('/contractorRequests/accept/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    reject: async (id) => {
        try {
            const response = await axiosInstance.get('/contractorRequests/reject/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    
}

export default contractorRequestService
