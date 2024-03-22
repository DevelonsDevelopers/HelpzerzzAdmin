import axiosInstance from "./axiosInstance";

const userService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/users/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default userService
