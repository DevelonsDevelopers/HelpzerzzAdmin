import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_CONTRACTORS,
    CONTRACTOR_REDUCER,
    CREATE_CONTRACTOR, DELETE_CONTRACTOR, FEATURE_CONTRACTOR, STATUS_CONTRACTOR,
} from "../../utils/constants";
import contractorService from "../services/contractorService";
import uploadService from "../services/uploadService";

const initialState = {
    loading: false,
    contractorLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    contractors: [],
    contractor: null,
    error: '',
    contractorError: '',
}

export const addContractor = createAsyncThunk(CREATE_CONTRACTOR, (data) => {
    return uploadService.single(data.file).then(file => {
        let contractor = data.contractor;
        contractor.image = file.fileName
        return contractorService.create(contractor)
    })
})

export const getContractors = createAsyncThunk(ALL_CONTRACTORS, () => {
    return contractorService.fetchAll()
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

        //DELETE CATEGORY ////////////////////////////////////////
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

        //STATUS CATEGORY ////////////////////////////////////////
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

        //FEATURE CATEGORY ////////////////////////////////////////
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
export const { successListener } = contractor.actions
