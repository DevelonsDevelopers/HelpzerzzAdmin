import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_REQUESTS, ASSIGN_CONTRACTOR, REQUESTS_REDUCER, SINGLE_REQUEST} from "../../utils/constants";
import requestService from "../services/requestService";
import requestContractorService from "../services/requestContractorService";


const initialState = {
    loading: false,
    requestLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    requests: [],
    request: null,
    error: '',
    requestError: '',
}

export const getRequests = createAsyncThunk(ALL_REQUESTS, () => {
    return requestService.fetchAll()
})

export const getRequest = createAsyncThunk(SINGLE_REQUEST, (id) => {
    return requestService.fetch(id)
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

        //GET CATEGORY /////////////////////////////////////
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
    }
})

export default request.reducer
