import axiosInstance from "./axiosInstance";

const seoService = {
    getSeo: async () => {
        try {
            const response = await axiosInstance.get('/seo/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}
export default seoService
