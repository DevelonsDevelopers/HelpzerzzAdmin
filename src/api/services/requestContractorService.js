import axiosInstance from "./axiosInstance";

const requestContractorService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/requestContractor/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default requestContractorService
