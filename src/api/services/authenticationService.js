import axiosInstance from "./axiosInstance";

const authenticationService = {
    login: async (payload) => {
        try {
            const response = await axiosInstance.post('/auth/user/login', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default authenticationService
