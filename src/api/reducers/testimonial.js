import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_TESTIMONIALS, CREATE_TESTIMONIAL, SINGLE_TESTIMONIAL, TESTIMONIAL_REDUCER} from "../../utils/constants";
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

export const getTestimonial = createAsyncThunk(SINGLE_TESTIMONIAL, (id) => {
    return testimonialService.fetch(id)
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

        //GET CATEGORY /////////////////////////////////////
        builder.addCase(getTestimonial.pending, state => {
            state.testimonialLoading = true
        })
        builder.addCase(getTestimonial.fulfilled, (state, action) => {
            state.testimonialLoading = false
            state.testimonial = action.payload.testimonial
            state.testimonialError = ""
        })
        builder.addCase(getTestimonial.rejected, (state, action) => {
            state.testimonialLoading = false
            state.testimonial = null
            state.testimonialError = action.error.message
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

        // //EDIT COST GUIDE //////////////////////////////////////////
        // builder.addCase(updateSubcategory.pending, state => {
        //     state.success = false
        // })
        // builder.addCase(updateSubcategory.fulfilled, (state, action) => {
        //     state.success = true
        //     if (action.payload) {
        //         const value = state.subcategories.find(v => v.id === action.payload.id)
        //         Object.assign(value, action.payload)
        //     }
        // })
        // builder.addCase(updateSubcategory.rejected, (state, action) => {
        //     state.success = false
        // })
    }
})

export default testimonial.reducer
