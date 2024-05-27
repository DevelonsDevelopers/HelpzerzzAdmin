import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_CUSTOMERS, CUSTOMER_REDUCER, STATUS_CUSTOMER} from "../../utils/constants";
import customerService from "../services/customerService";
import {updateContractorStatus} from "./contractor";


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

export const updateCustomerStatus = createAsyncThunk(STATUS_CUSTOMER, (data) => {
    return customerService.changeStatus(data).then(response => {
        if (response.success) {
            return data.id
        } else {
            return 0
        }
    })
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

        builder.addCase(updateCustomerStatus.pending, state => {

        })
        builder.addCase(updateCustomerStatus.fulfilled, (state, action) => {
            const value = state.customers.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateCustomerStatus.rejected, (state, action) => {

        })
    }
})

export default request.reducer
