import axiosInstance from "./axiosInstance";

const categoryService = {
    create: async (payload) => {
      try {
          const response = await axiosInstance.post('/categories/create', payload)
          return response.data
      } catch (error) {
          throw error.response.data
      }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/categories/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/categories/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeStatus: async (payload) => {
        try {
            const response = await axiosInstance.put('/categories/status', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeFeatured: async (payload) => {
        try {
            const response = await axiosInstance.put('/categories/featured', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default categoryService
