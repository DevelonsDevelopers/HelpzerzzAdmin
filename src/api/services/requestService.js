import axiosInstance from "./axiosInstance";

const requestService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/serviceRequests/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/serviceRequests/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default requestService
