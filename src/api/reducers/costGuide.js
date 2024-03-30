import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_COSTGUIDES,
    COST_GUIDE_REDUCER,
    CREATE_COSTGUIDE, DELETE_COSTGUIDE, FEATURE_COSTGUIDE, SINGLE_COSTGUIDE, STATUS_COSTGUIDE, UPDATE_COSTGUIDE,
} from "../../utils/constants";
import costGuideService from "../services/costGuide";
import uploadService from "../services/uploadService";

const initialState = {
    loading: false,
    costGuideLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    costGuides: [],
    costGuide: null,
    error: '',
    costGuideError: '',
}

export const addCostGuide = createAsyncThunk(CREATE_COSTGUIDE, (data) => {
    return uploadService.single(data.file).then(file => {
        let costGuide = data.costGuide;
        costGuide.image = file.fileName
        return costGuideService.create(costGuide)
    })
})

export const updateCostGuide = createAsyncThunk(UPDATE_COSTGUIDE, (data) => {
    if (data.file) {
        return uploadService.single(data.file).then(file => {
            let costGuide = data.costGuide;
            costGuide.image = file.fileName
            return costGuideService.update(costGuide).then(response => {
                if (response.success) {
                    return costGuide
                } else {
                    return null
                }
            })
        })
    } else {
        return costGuideService.update(data.costGuide).then(response => {
            if (response.success) {
                return data.costGuide
            } else {
                return null
            }
        })
    }
})

export const getCostGuides = createAsyncThunk(ALL_COSTGUIDES, () => {
    return costGuideService.fetchAll()
})

export const getCostGuide = createAsyncThunk(SINGLE_COSTGUIDE, (id) => {
    return costGuideService.fetch(id)
})

export const deleteCostGuide = createAsyncThunk(DELETE_COSTGUIDE, (id) => {
    return costGuideService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const updateCostGuideStatus = createAsyncThunk(STATUS_COSTGUIDE, (data) => {
    return costGuideService.changeStatus(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

export const updateCostGuideFeature = createAsyncThunk(FEATURE_COSTGUIDE, (data) => {
    return costGuideService.changeFeatured(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

const costGuide = createSlice({
    name: COST_GUIDE_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //ALL COST GUIDES ///////////////////////////
        builder.addCase(getCostGuides.pending, state => {
            state.loading = true
        })
        builder.addCase(getCostGuides.fulfilled, (state, action) => {
            state.loading = false
            state.costGuides = action.payload.costGuides
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getCostGuides.rejected, (state, action) => {
            state.loading = false
            state.costGuides = []
            state.error = action.error.message
        })

        //GET CATEGORY /////////////////////////////////////
        builder.addCase(getCostGuide.pending, state => {
            state.costGuideLoading = true
        })
        builder.addCase(getCostGuide.fulfilled, (state, action) => {
            state.costGuideLoading = false
            state.costGuide = action.payload.costGuide
            state.costGuideError = ""
        })
        builder.addCase(getCostGuide.rejected, (state, action) => {
            state.costGuideLoading = false
            state.costGuide = null
            state.costGuideError = action.error.message
        })

        //ADD COST GUIDE /////////////////////////////////////////
        builder.addCase(addCostGuide.pending, state => {
            state.success = false
        })
        builder.addCase(addCostGuide.fulfilled, (state, action) => {
            state.success = true
            let tempCostGuides = [...state.costGuides]
            let costGuide = action.payload.costGuide
            tempCostGuides.unshift(costGuide)
            state.costGuides = tempCostGuides
        })
        builder.addCase(addCostGuide.rejected, (state, action) => {
            state.success = false
        })

        //EDIT COST GUIDE //////////////////////////////////////////
        builder.addCase(updateCostGuide.pending, state => {
            state.success = false
        })
        builder.addCase(updateCostGuide.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.costGuides.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateCostGuide.rejected, (state, action) => {
            state.success = false
        })

        //DELETE CATEGORY ////////////////////////////////////////
        builder.addCase(deleteCostGuide.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteCostGuide.fulfilled, (state, action) => {
            state.deleting = false
            state.costGuides = state.costGuides.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteCostGuide.rejected, (state, action) => {
            state.deleting = false
        })

        //STATUS CATEGORY ////////////////////////////////////////
        builder.addCase(updateCostGuideStatus.pending, state => {

        })
        builder.addCase(updateCostGuideStatus.fulfilled, (state, action) => {
            const value = state.costGuides.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateCostGuideStatus.rejected, (state, action) => {

        })

        //FEATURE CATEGORY ////////////////////////////////////////
        builder.addCase(updateCostGuideFeature.pending, state => {

        })
        builder.addCase(updateCostGuideFeature.fulfilled, (state, action) => {
            const value = state.costGuides.find(v => v.id === action.payload)
            if (value) {
                if (value.featured === 0) {
                    value.featured = 1
                } else {
                    value.featured = 0
                }
            }
        })
        builder.addCase(updateCostGuideFeature.rejected, (state, action) => {

        })
    }
})

export default costGuide.reducer
export const { successListener } = costGuide.actions
