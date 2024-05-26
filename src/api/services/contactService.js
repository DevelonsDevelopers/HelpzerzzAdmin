import axiosInstance from "./axiosInstance";

const contactService = {
    getContact: async () => {
        try {
            const response = await axiosInstance.get('/contact/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}
export default contactService
