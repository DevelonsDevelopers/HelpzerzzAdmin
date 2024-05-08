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
    update: async (payload) => {
        try {
            const response = await axiosInstance.put('/contractors/update', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    details: async (id) => {
        try {
            const response = await axiosInstance.get('/contractors/details/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    createDetails: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/createDetails', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    updateDetails: async (payload) => {
        try {
            const response = await axiosInstance.put('/contractors/updateDetails', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    createAffiliation: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/createAffiliation', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    deleteAffiliation: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/deleteAffiliation/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    createAward: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/createAward', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    deleteAward: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/deleteAward/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    createBadge: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/createBadge', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    deleteBadge: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/deleteBadge/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    createProject: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/createProject', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    deleteProject: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/deleteProject/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    deleteDocument: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/deleteDocument/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    assignArea: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/assignArea', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    unAssignArea: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/unAssignArea/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    assignHighlight: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/assignHighlight', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    unAssignHighlight: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/unAssignHighlight/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    assignLanguage: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/assignLanguage', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    unAssignLanguage: async (id) => {
        try {
            const response = await axiosInstance.delete('/contractors/unAssignLanguage/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    addImage: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/addProjectImage', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/contractors/single/' + id);
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
    fetchRecent: async () => {
        try {
            const response = await axiosInstance.get('/contractors/recent');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchPopular: async () => {
        try {
            const response = await axiosInstance.get('/contractors/popular');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAllActive: async () => {
        try {
            const response = await axiosInstance.get('/contractors/active');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAllAssigned: async (request) => {
        try {
            const response = await axiosInstance.get('/contractors/allAssigned/' + request);
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
    },
    approve: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/approve/' + payload.id, payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    reject: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/reject/' + payload.id, payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default contractorService
