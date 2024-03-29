import axiosInstance from "./axiosInstance";

const costGuideService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/costGuides/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data()
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/costGuides/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/costGuides/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/costGuides/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeStatus: async (payload) => {
        try {
            const response = await axiosInstance.put('/costGuides/status', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeFeatured: async (payload) => {
        try {
            const response = await axiosInstance.put('/costGuides/featured', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default costGuideService
