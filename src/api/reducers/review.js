import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_REVIEWS, APPROVE_REVIEW, DELETE_REVIEW, REJECT_REVIEW, REVIEW_REDUCER} from "../../utils/constants";
import reviewService from "../services/reviewService";

const initialState = {
    loading: false,
    reviewLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    reviews: [],
    review: null,
    error: '',
    reviewError: '',
}

export const getReviews = createAsyncThunk(ALL_REVIEWS, () => {
    return reviewService.fetchAll()
})

export const deleteReview = createAsyncThunk(DELETE_REVIEW, (id) => {
    return reviewService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const approveReview = createAsyncThunk(APPROVE_REVIEW, (id) => {
    return reviewService.approve(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const rejectReview = createAsyncThunk(REJECT_REVIEW, (id) => {
    return reviewService.reject(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

const review = createSlice({
    name: REVIEW_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //ALL REVIEWS ///////////////////////////
        builder.addCase(getReviews.pending, state => {
            state.loading = true
        })
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.loading = false
            state.reviews = action.payload.reviews
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getReviews.rejected, (state, action) => {
            state.loading = false
            state.reviews = []
            state.error = action.error.message
        })

        //APPROVE REVIEW ////////////////////////////////////////
        builder.addCase(approveReview.pending, state => {

        })
        builder.addCase(approveReview.fulfilled, (state, action) => {
            const value = state.reviews.find(v => v.id === action.payload)
            if (value) {
                value.status = 1
            }
        })
        builder.addCase(approveReview.rejected, (state, action) => {

        })

        //REJECT REVIEW ////////////////////////////////////////
        builder.addCase(rejectReview.pending, state => {

        })
        builder.addCase(rejectReview.fulfilled, (state, action) => {
            const value = state.reviews.find(v => v.id === action.payload)
            if (value) {
                value.status = 2
            }
        })
        builder.addCase(rejectReview.rejected, (state, action) => {

        })

        //DELETE REVIEW ////////////////////////////////////////
        builder.addCase(deleteReview.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.deleting = false
            state.reviews = state.reviews.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.deleting = false
        })
    }
})

export default review.reducer
export const { successListener } = review.actions
