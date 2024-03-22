import axiosInstance from "./axiosInstance";

const contractorService = {
    create: async (payload) => {
      try {
          const response = await axiosInstance.post('/contractors/create', payload)
          return response.data
      } catch (error) {
          throw error.response.data
      }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/contractors/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/delete/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeStatus: async (payload) => {
        try {
            const response = await axiosInstance.put('/contractors/status', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    changeFeatured: async (payload) => {
        try {
            const response = await axiosInstance.put('/contractors/featured', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default contractorService
