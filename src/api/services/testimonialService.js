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
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/testimonials/update', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/testimonials/single/' + id);
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
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/testimonials/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeStatus: async (payload) => {
        try {
            const response = await axiosInstance.put('/testimonials/status', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeFeatured: async (payload) => {
        try {
            const response = await axiosInstance.put('/testimonials/featured', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default testimonialService
