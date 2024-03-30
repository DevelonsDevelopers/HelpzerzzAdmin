import {
    ACTIVE_CATEGORIES,
    ALL_CATEGORIES,
    CATEGORY_REDUCER,
    CREATE_CATEGORY, DELETE_CATEGORY, FEATURE_CATEGORY, SINGLE_CATEGORY, STATUS_CATEGORY, UPDATE_CATEGORY,
} from "../../utils/constants";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import categoryService from "../services/categoryService";
import uploadService from "../services/uploadService";

const initialState = {
    loading: false,
    categoryLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    activeFetched: false,
    categories: [],
    activeCategories: [],
    category: null,
    error: '',
    categoryError: '',
}

export const addCategory = createAsyncThunk(CREATE_CATEGORY, (data) => {
    return uploadService.single(data.file).then(file => {
        let category = data.category;
        category.image = file.fileName
        return categoryService.create(category)
    })
})

export const updateCategory = createAsyncThunk(UPDATE_CATEGORY, (data) => {
    if (data.file) {
        return uploadService.single(data.file).then(file => {
            let category = data.category;
            category.image = file.fileName
            return categoryService.update(category).then(response => {
                if (response.success) {
                    return category
                } else {
                    return null
                }
            })
        })
    } else {
        return categoryService.update(data.category).then(response => {
            if (response.success) {
                return data.category
            } else {
                return null
            }
        })
    }
})

export const getCategories = createAsyncThunk(ALL_CATEGORIES, () => {
    return categoryService.fetchAll()
})

export const getCategory = createAsyncThunk(SINGLE_CATEGORY, (id) => {
    return categoryService.fetch(id)
})

export const getActiveCategories = createAsyncThunk(ACTIVE_CATEGORIES, () => {
    return categoryService.fetchAllActive()
})

export const deleteCategory = createAsyncThunk(DELETE_CATEGORY, (id) => {
    return categoryService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const updateCategoryStatus = createAsyncThunk(STATUS_CATEGORY, (data) => {
    return categoryService.changeStatus(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

export const updateCategoryFeature = createAsyncThunk(FEATURE_CATEGORY, (data) => {
    return categoryService.changeFeatured(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

const category = createSlice({
    name: CATEGORY_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //ALL CATEGORIES ///////////////////////////
        builder.addCase(getCategories.pending, state => {
            state.loading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload.categories
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error = action.error.message
        })

        //GET CATEGORY /////////////////////////////////////
        builder.addCase(getCategory.pending, state => {
            state.categoryLoading = true
        })
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.categoryLoading = false
            state.category = action.payload.category
            state.categoryError = ""
        })
        builder.addCase(getCategory.rejected, (state, action) => {
            state.categoryLoading = false
            state.category = null
            state.categoryError = action.error.message
        })

        //ACTIVE CATEGORIES ///////////////////////////
        builder.addCase(getActiveCategories.pending, state => {

        })
        builder.addCase(getActiveCategories.fulfilled, (state, action) => {
            state.activeCategories = action.payload.categories
            state.activeFetched = true
        })
        builder.addCase(getActiveCategories.rejected, (state, action) => {

        })

        //ADD CATEGORY /////////////////////////////////////////
        builder.addCase(addCategory.pending, state => {
            state.success = false
        })
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.success = true
            let tempCategories = [...state.categories]
            let category = action.payload.category
            tempCategories.unshift(category)
            state.categories = tempCategories
        })
        builder.addCase(addCategory.rejected, (state, action) => {
            state.success = false
        })

        //EDIT CATEGORY //////////////////////////////////////////
        builder.addCase(updateCategory.pending, state => {
            state.success = false
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.categories.find(v => v.id === action.payload.category.id)
                Object.assign(value, action.payload.category)
            }
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.success = false
        })

        //DELETE CATEGORY ////////////////////////////////////////
        builder.addCase(deleteCategory.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.deleting = false
            state.categories = state.categories.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.deleting = false
        })

        //STATUS CATEGORY ////////////////////////////////////////
        builder.addCase(updateCategoryStatus.pending, state => {

        })
        builder.addCase(updateCategoryStatus.fulfilled, (state, action) => {
            const value = state.categories.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateCategoryStatus.rejected, (state, action) => {

        })

        //FEATURE CATEGORY ////////////////////////////////////////
        builder.addCase(updateCategoryFeature.pending, state => {

        })
        builder.addCase(updateCategoryFeature.fulfilled, (state, action) => {
            const value = state.categories.find(v => v.id === action.payload)
            if (value) {
                if (value.featured === 0) {
                    value.featured = 1
                } else {
                    value.featured = 0
                }
            }
        })
        builder.addCase(updateCategoryFeature.rejected, (state, action) => {

        })
    }
})

export default category.reducer
export const { successListener } = category.actions
