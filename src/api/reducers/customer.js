import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_CUSTOMERS, CUSTOMER_REDUCER} from "../../utils/constants";
import customerService from "../services/customerService";


const initialState = {
    loading: false,
    customerLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    customers: [],
    customer: null,
    error: '',
    customerError: '',
}

export const getCustomers = createAsyncThunk(ALL_CUSTOMERS, () => {
    return customerService.fetchAll()
})

const request = createSlice({
    name: CUSTOMER_REDUCER,
    initialState,
    extraReducers: builder => {
        //ALL REQUESTS ///////////////////////////
        builder.addCase(getCustomers.pending, state => {
            state.loading = true
        })
        builder.addCase(getCustomers.fulfilled, (state, action) => {
            state.loading = false
            state.customers = action.payload.customers
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getCustomers.rejected, (state, action) => {
            state.loading = false
            state.requests = []
            state.error = action.error.message
        })
    }
})

export default request.reducer
