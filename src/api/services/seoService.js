import axiosInstance from "./axiosInstance";

const seoService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/seo/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/seo/single/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/seo/update', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAllSeo: async () => {
        try {
            const response = await axiosInstance.get('/seo/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchCityCategory: async () => {
        try {
            const response = await axiosInstance.get('/seo/cityCategory')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/seo/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    createCityCategorySEO: async (data) => {
        try {
            const response = await axiosInstance.post('/seo/createCityCategory/', data)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    editCityCategorySEO: async (data) => {
        try {
            const response = await axiosInstance.post('/seo/editCityCategory/', data)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}
export default seoService
