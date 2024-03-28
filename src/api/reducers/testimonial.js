import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_TESTIMONIALS, CREATE_TESTIMONIAL, TESTIMONIAL_REDUCER} from "../../utils/constants";
import testimonialService from "../services/testimonialService";

const initialState = {
    loading: false,
    testimonialLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    testimonials: [],
    testimonial: null,
    error: '',
    testimonialError: '',
}

export const addTestimonial = createAsyncThunk(CREATE_TESTIMONIAL, (subcategory) => {
    return testimonialService.create(subcategory)
})

export const getTestimonials = createAsyncThunk(ALL_TESTIMONIALS, () => {
    return testimonialService.fetchAll()
})

const testimonial = createSlice({
    name: TESTIMONIAL_REDUCER,
    initialState,
    extraReducers: builder => {
        //ALL TESTIMONIALS ///////////////////////////
        builder.addCase(getTestimonials.pending, state => {
            state.loading = true
        })
        builder.addCase(getTestimonials.fulfilled, (state, action) => {
            state.loading = false
            state.testimonials = action.payload.testimonials
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getTestimonials.rejected, (state, action) => {
            state.loading = false
            state.testimonials = []
            state.error = action.error.message
        })

        //ADD TESTIMONIAL /////////////////////////////////////////
        builder.addCase(addTestimonial.pending, state => {
            state.success = false
        })
        builder.addCase(addTestimonial.fulfilled, (state, action) => {
            state.success = true
            let tempTestimonials = [...state.tempTestimonials]
            let testimonial = action.payload.testimonial
            tempTestimonials.unshift(testimonial)
            state.subcategories = tempTestimonials
        })
        builder.addCase(addTestimonial.rejected, (state, action) => {
            state.success = false
        })
    }
})

export default testimonial.reducer
