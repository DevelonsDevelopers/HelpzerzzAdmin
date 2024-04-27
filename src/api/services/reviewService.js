import axiosInstance from "./axiosInstance";

const categoryService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/reviews/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    approve: async (id) => {
        try {
            const response = await axiosInstance.put('/reviews/approve/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    reject: async (id) => {
        try {
            const response = await axiosInstance.put('/reviews/reject/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default categoryService
