import axiosInstance from "./axiosInstance";

const emailService = {
    assignContractor: async (payload) => {
        try {
            const response = await axiosInstance.post('/mailer/contractor', payload)
            return response.data
        } catch (error) {
            throw error
        }
    },
    infoContractor: async (payload) => {
        try {
            const response = await axiosInstance.post('/mailer/infoContractor', payload)
            return response.data
        } catch (error) {
            throw error
        }
    },
}

export default emailService
