import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_SUBCATEGORIES, CREATE_SUBCATEGORY, SUBCATEGORY_REDUCER} from "../../utils/constants";
import subcategoryService from "../services/subcategoryService";

const initialState = {
    loading: false,
    subcategoryLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    subcategories: [],
    subcategory: null,
    error: '',
    subcategoryError: '',
}

export const addSubcategory = createAsyncThunk(CREATE_SUBCATEGORY, (subcategory) => {
    return subcategoryService.create(subcategory)
})

export const getSubcategories = createAsyncThunk(ALL_SUBCATEGORIES, () => {
    return subcategoryService.fetchAll()
})

const subcategory = createSlice({
    name: SUBCATEGORY_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //ALL SUBCATEGORIES ///////////////////////////
        builder.addCase(getSubcategories.pending, state => {
            state.loading = true
        })
        builder.addCase(getSubcategories.fulfilled, (state, action) => {
            state.loading = false
            state.subcategories = action.payload.subcategories
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getSubcategories.rejected, (state, action) => {
            state.loading = false
            state.subcategories = []
            state.error = action.error.message
        })

        //ADD SUBCATEGORY /////////////////////////////////////////
        builder.addCase(addSubcategory.pending, state => {
            state.success = false
        })
        builder.addCase(addSubcategory.fulfilled, (state, action) => {
            state.success = true
            let tempSubcategories = [...state.subcategories]
            let subcategory = action.payload.subcategory
            tempSubcategories.unshift(subcategory)
            state.subcategories = tempSubcategories
        })
        builder.addCase(addSubcategory.rejected, (state, action) => {
            state.success = false
        })
    }
})

export default subcategory.reducer
export const { successListener } = subcategory.actions
