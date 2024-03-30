import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_SUBCATEGORIES,
    CREATE_SUBCATEGORY, DELETE_SUBCATEGORY,
    SINGLE_SUBCATEGORY, STATUS_SUBCATEGORY,
    SUBCATEGORY_REDUCER,
    UPDATE_SUBCATEGORY
} from "../../utils/constants";
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

export const updateSubcategory = createAsyncThunk(UPDATE_SUBCATEGORY, (subcategory) => {
    return subcategoryService.update(subcategory).then(response => {
        if (response.success) {
            return subcategory
        } else {
            return null
        }
    })
})

export const getSubcategories = createAsyncThunk(ALL_SUBCATEGORIES, () => {
    return subcategoryService.fetchAll()
})

export const getSubcategory = createAsyncThunk(SINGLE_SUBCATEGORY, (id) => {
    return subcategoryService.fetch(id)
})

export const deleteSubcategory = createAsyncThunk(DELETE_SUBCATEGORY, (id) => {
    return subcategoryService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const updateSubcategoryStatus = createAsyncThunk(STATUS_SUBCATEGORY, (data) => {
    return subcategoryService.changeStatus(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
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

        //GET CATEGORY /////////////////////////////////////
        builder.addCase(getSubcategory.pending, state => {
            state.subcategoryLoading = true
        })
        builder.addCase(getSubcategory.fulfilled, (state, action) => {
            state.subcategoryLoading = false
            state.subcategory = action.payload.subcategory
            state.subcategoryError = ""
        })
        builder.addCase(getSubcategory.rejected, (state, action) => {
            state.subcategoryLoading = false
            state.subcategory = null
            state.subcategoryError = action.error.message
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

        //EDIT SUBCATEGORY //////////////////////////////////////////
        builder.addCase(updateSubcategory.pending, state => {
            state.success = false
        })
        builder.addCase(updateSubcategory.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.subcategories.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateSubcategory.rejected, (state, action) => {
            state.success = false
        })

        //DELETE BLOG ////////////////////////////////////////
        builder.addCase(deleteSubcategory.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteSubcategory.fulfilled, (state, action) => {
            state.deleting = false
            state.subcategories = state.subcategories.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteSubcategory.rejected, (state, action) => {
            state.deleting = false
        })

        //STATUS BLOG ////////////////////////////////////////
        builder.addCase(updateSubcategoryStatus.pending, state => {

        })
        builder.addCase(updateSubcategoryStatus.fulfilled, (state, action) => {
            const value = state.subcategories.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateSubcategoryStatus.rejected, (state, action) => {

        })
    }
})

export default subcategory.reducer
export const { successListener } = subcategory.actions
