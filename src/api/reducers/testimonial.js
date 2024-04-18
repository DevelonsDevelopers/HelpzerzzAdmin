import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_TESTIMONIALS,
    CREATE_TESTIMONIAL, DELETE_TESTIMONIAL, FEATURE_TESTIMONIAL,
    SINGLE_TESTIMONIAL, STATUS_TESTIMONIAL,
    TESTIMONIAL_REDUCER,
    UPDATE_TESTIMONIAL
} from "../../utils/constants";
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

export const addTestimonial = createAsyncThunk(CREATE_TESTIMONIAL, (testimonial) => {
    return testimonialService.create(testimonial)
})

export const updateTestimonial = createAsyncThunk(UPDATE_TESTIMONIAL, (testimonial) => {
    return testimonialService.update(testimonial).then(response => {
        if (response.success) {
            return testimonial
        } else {
            return null
        }
    })
})

export const getTestimonials = createAsyncThunk(ALL_TESTIMONIALS, () => {
    return testimonialService.fetchAll()
})

export const getTestimonial = createAsyncThunk(SINGLE_TESTIMONIAL, (id) => {
    return testimonialService.fetch(id)
})

export const deleteTestimonial = createAsyncThunk(DELETE_TESTIMONIAL, (id) => {
    return testimonialService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const updateTestimonialStatus = createAsyncThunk(STATUS_TESTIMONIAL, (data) => {
    return testimonialService.changeStatus(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

export const updateTestimonialFeature = createAsyncThunk(FEATURE_TESTIMONIAL, (data) => {
    return testimonialService.changeFeatured(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

const testimonial = createSlice({
    name: TESTIMONIAL_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
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

        //GET TESTIMONIAL /////////////////////////////////////
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
            let tempTestimonials = [...state.testimonials]
            let testimonial = action.payload.testimonial
            tempTestimonials.unshift(testimonial)
            state.testimonials = tempTestimonials
        })
        builder.addCase(addTestimonial.rejected, (state, action) => {
            state.success = false
        })

        //EDIT TESTIMONIAL //////////////////////////////////////////
        builder.addCase(updateTestimonial.pending, state => {
            state.success = false
        })
        builder.addCase(updateTestimonial.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.testimonials.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateTestimonial.rejected, (state, action) => {
            state.success = false
        })

        //DELETE TESTIMONIAL ////////////////////////////////////////
        builder.addCase(deleteTestimonial.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
            state.deleting = false
            state.testimonials = state.testimonials.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteTestimonial.rejected, (state, action) => {
            state.deleting = false
        })

        //STATUS TESTIMONIAL ////////////////////////////////////////
        builder.addCase(updateTestimonialStatus.pending, state => {

        })
        builder.addCase(updateTestimonialStatus.fulfilled, (state, action) => {
            const value = state.testimonials.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateTestimonialStatus.rejected, (state, action) => {

        })

        //FEATURE TESTIMONIAL ////////////////////////////////////////
        builder.addCase(updateTestimonialFeature.pending, state => {

        })
        builder.addCase(updateTestimonialFeature.fulfilled, (state, action) => {
            const value = state.testimonials.find(v => v.id === action.payload)
            if (value) {
                if (value.featured === 0) {
                    value.featured = 1
                } else {
                    value.featured = 0
                }
            }
        })
        builder.addCase(updateTestimonialFeature.rejected, (state, action) => {

        })
    }
})

export default testimonial.reducer
export const { successListener } = testimonial.actions
