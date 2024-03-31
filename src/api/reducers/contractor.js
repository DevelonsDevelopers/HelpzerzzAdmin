import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ACTIVE_CONTRACTORS,
    ALL_CONTRACTORS, ASSIGN_CONTRACTOR, ASSIGNED_CONTRACTORS,
    CONTRACTOR_REDUCER,
    CREATE_CONTRACTOR,
    CREATE_DETAILS,
    DELETE_CONTRACTOR,
    DETAILS_CONTRACTOR,
    FEATURE_CONTRACTOR, SINGLE_CONTRACTOR,
    STATUS_CONTRACTOR, UPDATE_CONTRACTOR,
    UPDATE_DETAILS,
} from "../../utils/constants";
import contractorService from "../services/contractorService";
import uploadService from "../services/uploadService";
import requestContractorService from "../services/requestContractorService";

const initialState = {
    loading: false,
    contractorLoading: false,
    detailsLoading: false,
    assignedLoading: false,
    deleting: false,
    noData: false,
    success: false,
    detailSuccess: false,
    fetched: false,
    activeFetched: false,
    assignedFetched: false,
    contractors: [],
    activeContractors: [],
    assignedContractors: [],
    contractor: null,
    contractorDetails: null,
    error: '',
    contractorError: '',
    detailsError: '',
    assignedError: '',
}

export const addContractor = createAsyncThunk(CREATE_CONTRACTOR, (data) => {
    return uploadService.single(data.file).then(file => {
        let contractor = data.contractor;
        contractor.image = file.fileName
        return contractorService.create(contractor)
    })
})

export const updateContractor = createAsyncThunk(UPDATE_CONTRACTOR, (data) => {
    if (data.file) {
        return uploadService.single(data.file).then(file => {
            let contractor = data.contractor;
            contractor.image = file.fileName
            return contractorService.update(contractor).then(response => {
                if (response.success) {
                    return contractor
                } else {
                    return null
                }
            })
        })
    } else {
        return contractorService.update(data.contractor).then(response => {
            if (response.success) {
                return data.contractor
            } else {
                return null
            }
        })
    }
})

export const addContractorDetails = createAsyncThunk(CREATE_DETAILS, (data) => {
    return contractorService.createDetails(data)
})

export const editContractorDetails = createAsyncThunk(UPDATE_DETAILS, (data) => {
    return contractorService.updateDetails(data).then(response => {
        return !!response.success;
    })
})

export const getContractors = createAsyncThunk(ALL_CONTRACTORS, () => {
    return contractorService.fetchAll()
})

export const getContractor = createAsyncThunk(SINGLE_CONTRACTOR, (id) => {
    return contractorService.fetch(id)
})

export const getActiveContractors = createAsyncThunk(ACTIVE_CONTRACTORS, () => {
    return contractorService.fetchAllActive()
})

export const getAllAssignedContractors = createAsyncThunk(ASSIGNED_CONTRACTORS, (request) => {
    return contractorService.fetchAllAssigned(request)
})

export const assignContractor = createAsyncThunk(ASSIGN_CONTRACTOR, (data) => {
    return requestContractorService.create(data)
})

export const contractorDetails = createAsyncThunk(DETAILS_CONTRACTOR, (id) => {
    return contractorService.details(id)
})

export const deleteContractor = createAsyncThunk(DELETE_CONTRACTOR, (id) => {
    return contractorService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const updateContractorStatus = createAsyncThunk(STATUS_CONTRACTOR, (data) => {
    return contractorService.changeStatus(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

export const updateContractorFeature = createAsyncThunk(FEATURE_CONTRACTOR, (data) => {
    return contractorService.changeFeatured(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

const contractor = createSlice({
    name: CONTRACTOR_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        },
        detailsSuccessListener: (state) => {
            state.detailSuccess = false
        }
    },
    extraReducers: builder => {
        //ALL CONTRACTORS ///////////////////////////
        builder.addCase(getContractors.pending, state => {
            state.loading = true
        })
        builder.addCase(getContractors.fulfilled, (state, action) => {
            state.loading = false
            state.contractors = action.payload.contractors
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getContractors.rejected, (state, action) => {
            state.loading = false
            state.contractors = []
            state.error = action.error.message
        })

        //ASSIGNED CONTRACTORS ///////////////////////////
        builder.addCase(getAllAssignedContractors.pending, state => {
            state.assignedLoading = true
        })
        builder.addCase(getAllAssignedContractors.fulfilled, (state, action) => {
            state.assignedLoading = false
            state.assignedContractors = action.payload.contractors
            state.assignedError = ''
            state.assignedFetched = true
        })
        builder.addCase(getAllAssignedContractors.rejected, (state, action) => {
            state.assignedLoading = false
            state.assignedContractors = []
            state.assignedError = action.error.message
        })

        builder.addCase(assignContractor.fulfilled, (state, action) => {
            console.log(action.payload)
            const value = state.assignedContractors.find(v => v.contractor === action.payload.requestContractor.contractor)
            if (value) {
                value.assigned = action.payload.requestContractor.contractor
            }
        })

        //GET CONTRACTOR /////////////////////////////////////
        builder.addCase(getContractor.pending, state => {
            state.contractorLoading = true
        })
        builder.addCase(getContractor.fulfilled, (state, action) => {
            state.contractorLoading = false
            state.contractor = action.payload.contractor
            state.contractorError = ""
        })
        builder.addCase(getContractor.rejected, (state, action) => {
            state.contractorLoading = false
            state.contractor = null
            state.contractorError = action.error.message
        })

        //ACTIVE CONTRACTORS ////////////////////////
        builder.addCase(getActiveContractors.pending, state => {

        })
        builder.addCase(getActiveContractors.fulfilled, (state, action) => {
            state.activeContractors = action.payload.contractors
            state.activeFetched = true
        })
        builder.addCase(getActiveContractors.rejected, (state, action) => {

        })

        //CONTRACTOR DETAILS ///////////////////////////
        builder.addCase(contractorDetails.pending, state => {
            state.detailsLoading = true
        })
        builder.addCase(contractorDetails.fulfilled, (state, action) => {
            state.detailsLoading = false
            state.contractorDetails = action.payload.data
            state.detailsError = ''
        })
        builder.addCase(contractorDetails.rejected, (state, action) => {
            state.detailsLoading = false
            state.contractorDetails = null
            state.detailsError = action.error.message
        })

        //ADD CONTRACTOR /////////////////////////////////////////
        builder.addCase(addContractor.pending, state => {
            state.success = false
        })
        builder.addCase(addContractor.fulfilled, (state, action) => {
            state.success = true
            let tempContractors = [...state.contractors]
            let contractor = action.payload.contractor
            tempContractors.unshift(contractor)
            state.contractors = tempContractors
        })
        builder.addCase(addContractor.rejected, (state, action) => {
            state.success = false
        })

        //EDIT CONTRACTOR //////////////////////////////////////////
        builder.addCase(updateContractor.pending, state => {
            state.success = false
        })
        builder.addCase(updateContractor.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.contractors.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateContractor.rejected, (state, action) => {
            state.success = false
        })

        //ADD CONTRACTOR DETAILS /////////////////////////////////////////
        builder.addCase(addContractorDetails.pending, state => {
            state.detailSuccess = false
        })
        builder.addCase(addContractorDetails.fulfilled, (state, action) => {
            state.detailSuccess = true
        })
        builder.addCase(addContractorDetails.rejected, (state, action) => {
            state.detailSuccess = false
        })

        //UPDATE CONTRACTOR DETAILS /////////////////////////////////////////
        builder.addCase(editContractorDetails.pending, state => {
            state.detailSuccess = false
        })
        builder.addCase(editContractorDetails.fulfilled, (state, action) => {
            state.detailSuccess = true
        })
        builder.addCase(editContractorDetails.rejected, (state, action) => {
            state.detailSuccess = false
        })

        //DELETE CONTRACTOR ////////////////////////////////////////
        builder.addCase(deleteContractor.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteContractor.fulfilled, (state, action) => {
            state.deleting = false
            state.contractors = state.contractors.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteContractor.rejected, (state, action) => {
            state.deleting = false
        })

        //STATUS CONTRACTOR ////////////////////////////////////////
        builder.addCase(updateContractorStatus.pending, state => {

        })
        builder.addCase(updateContractorStatus.fulfilled, (state, action) => {
            const value = state.contractors.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateContractorStatus.rejected, (state, action) => {

        })

        //FEATURE CONTRACTOR ////////////////////////////////////////
        builder.addCase(updateContractorFeature.pending, state => {

        })
        builder.addCase(updateContractorFeature.fulfilled, (state, action) => {
            const value = state.contractors.find(v => v.id === action.payload)
            if (value) {
                if (value.featured === 0) {
                    value.featured = 1
                } else {
                    value.featured = 0
                }
            }
        })
        builder.addCase(updateContractorFeature.rejected, (state, action) => {

        })
    }
})

export default contractor.reducer
export const { successListener, detailsSuccessListener } = contractor.actions
