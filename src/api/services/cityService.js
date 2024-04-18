import axiosInstance from "./axiosInstance";

const cityService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/cities/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/cities/update', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/cities/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/cities/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/cities/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default cityService
