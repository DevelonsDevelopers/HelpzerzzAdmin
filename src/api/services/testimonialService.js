import axiosInstance from "./axiosInstance";

const testimonialService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/testimonials/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/testimonials/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default testimonialService
