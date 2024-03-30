import axiosInstance from "./axiosInstance";

const blogService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/blogs/create', payload)
            return response.data
        } catch (error) {
            throw error
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/blogs/update', payload)
            return response.data
        } catch (error) {
            throw error
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/blogs/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/blogs/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/blogs/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeStatus: async (payload) => {
        try {
            const response = await axiosInstance.put('/blogs/status', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeFeatured: async (payload) => {
        try {
            const response = await axiosInstance.put('/blogs/featured', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default blogService
