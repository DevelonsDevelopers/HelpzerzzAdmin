import axiosInstance from "./axiosInstance";

const customerService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/customers/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default customerService
