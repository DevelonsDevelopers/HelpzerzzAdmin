import axiosInstance from "./axiosInstance";

const successStoryService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/successStory/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/successStory/update', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/successStory/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/successStory/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/successStory/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeStatus: async (payload) => {
        try {
            const response = await axiosInstance.put('/successStory/status', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changePopular: async (payload) => {
        try {
            const response = await axiosInstance.put('/successStory/popular', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default successStoryService
