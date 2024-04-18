import axiosInstance from "./axiosInstance";

const highlightService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/highlights/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/highlights/update', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/highlights/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/highlights/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/highlights/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default highlightService
