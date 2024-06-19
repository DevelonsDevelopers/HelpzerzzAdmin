import axiosInstance from "./axiosInstance";

const categoryService = {
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/reviews/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
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
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/reviews/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default categoryService
