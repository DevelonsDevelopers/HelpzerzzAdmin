import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_REQUESTS, CREATE_REQUEST, REQUESTS_REDUCER} from "../../utils/constants";
import requestService from "../services/requestService";


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
    }
})

export default request.reducer
