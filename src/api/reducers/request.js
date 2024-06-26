import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ACCEPT_REQUEST,
    ALL_REQUESTS,
    ASSIGN_CONTRACTOR, DELETE_REQUEST, RECENT_REQUESTS,
    REJECT_REQUEST,
    REQUESTS_REDUCER,
    SINGLE_REQUEST
} from "../../utils/constants";
import requestService from "../services/requestService";



const initialState = {
    loading: false,
    requestLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    requests: [],
    recent: [],
    request: null,
    error: '',
    requestError: '',
}

export const getRequests = createAsyncThunk(ALL_REQUESTS, () => {
    return requestService.fetchAll()
})

export const getRecentRequests = createAsyncThunk(RECENT_REQUESTS, () => {
    return requestService.recent()
})

export const getRequest = createAsyncThunk(SINGLE_REQUEST, (id) => {
    return requestService.fetch(id)
})

export const acceptRequest = createAsyncThunk(ACCEPT_REQUEST, (id) => {
    return requestService.accept(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const rejectRequest = createAsyncThunk(REJECT_REQUEST, (id) => {
    return requestService.reject(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const deleteRequest = createAsyncThunk(DELETE_REQUEST, (id) => {
    return requestService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

const request = createSlice({
    name: REQUESTS_REDUCER,
    initialState,
    extraReducers: builder => {
        //ALL REQUESTS ///////////////////////////
        builder.addCase(getRequests.pending, state => {
            state.loading = true
        })
        builder.addCase(getRequests.fulfilled, (state, action) => {
            state.loading = false
            state.requests = action.payload.requests
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getRequests.rejected, (state, action) => {
            state.loading = false
            state.requests = []
            state.error = action.error.message
        })

        //RECENT REQUESTS ///////////////////////////
        builder.addCase(getRecentRequests.pending, state => {
        })
        builder.addCase(getRecentRequests.fulfilled, (state, action) => {
            state.recent = action.payload.requests
        })
        builder.addCase(getRecentRequests.rejected, (state, action) => {
            state.recent = []
        })

        //GET REQUEST /////////////////////////////////////
        builder.addCase(getRequest.pending, state => {
            state.requestLoading = true
        })
        builder.addCase(getRequest.fulfilled, (state, action) => {
            state.requestLoading = false
            state.request = action.payload.serviceRequest
            state.requestError = ""
        })
        builder.addCase(getRequest.rejected, (state, action) => {
            state.requestLoading = false
            state.request = null
            state.requestError = action.error.message
        })

        builder.addCase(acceptRequest.pending, state => {
            state.requestLoading = true
        })
        builder.addCase(acceptRequest.fulfilled, (state, action) => {
            state.requestLoading = false
            const value = state.requests.find(v => v.id === action.payload)
            if (value) {
                value.status = 1
                state.request.status = 1
            }
        })
        builder.addCase(acceptRequest.rejected, (state, action) => {
            state.requestLoading = false
        })

        builder.addCase(rejectRequest.pending, state => {
            state.requestLoading = true
        })
        builder.addCase(rejectRequest.fulfilled, (state, action) => {
            state.requestLoading = false
            const value = state.requests.find(v => v.id === action.payload)
            if (value) {
                value.status = 2
                state.request.status = 2
            }
        })
        builder.addCase(rejectRequest.rejected, (state, action) => {
            state.requestLoading = false
        })

        //DELETE REQUEST ////////////////////////////////////////
        builder.addCase(deleteRequest.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteRequest.fulfilled, (state, action) => {
            state.deleting = false
            state.requests = state.requests.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteRequest.rejected, (state, action) => {
            state.deleting = false
        })
    }
})

export default request.reducer
