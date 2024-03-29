import axiosInstance from "./axiosInstance";

const subcategoryService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/subcategories/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/subcategories/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/subcategories/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default subcategoryService
