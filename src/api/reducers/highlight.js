import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_HIGHLIGHTS,
    CREATE_HIGHLIGHT,
    DELETE_HIGHLIGHT, HIGHLIGHT_REDUCER,
    SINGLE_HIGHLIGHT,
    UPDATE_HIGHLIGHT
} from "../../utils/constants";
import highlightService from "../services/highlightService";
import uploadService from "../services/uploadService";
import categoryService from "../services/categoryService";

const initialState = {
    loading: false,
    highlightLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    highlights: [],
    highlight: null,
    error: '',
    highlightError: '',
}

export const addHighlight = createAsyncThunk(CREATE_HIGHLIGHT, (data) => {
    return uploadService.single(data.file).then(file => {
        let highlight = data.highlight;
        highlight.icon = file.fileName
        return highlightService.create(highlight)
    })
})

export const updateHighlight = createAsyncThunk(UPDATE_HIGHLIGHT, (data) => {
    if (data.file) {
        return uploadService.single(data.file).then(file => {
            let highlight = data.highlight;
            highlight.icon = file.fileName
            return highlightService.update(highlight).then(response => {
                if (response.success) {
                    return highlight
                } else {
                    return null
                }
            })
        })
    } else {
        return highlightService.update(highlight).then(response => {
            if (response.success) {
                return highlight
            } else {
                return null
            }
        })
    }
})

export const getHighlights = createAsyncThunk(ALL_HIGHLIGHTS, () => {
    return highlightService.fetchAll()
})

export const getHighlight = createAsyncThunk(SINGLE_HIGHLIGHT, (id) => {
    return highlightService.fetch(id)
})

export const deleteHighlight = createAsyncThunk(DELETE_HIGHLIGHT, (id) => {
    return highlightService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

const highlight = createSlice({
    name: HIGHLIGHT_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //GET ALL HIGHLIGHTS /////////////////////////////////
        builder.addCase(getHighlights.pending, state => {
            state.loading = true
        })
        builder.addCase(getHighlights.fulfilled, (state, action) => {
            state.loading = false
            state.highlights = action.payload.highlights
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getHighlights.rejected, (state, action) => {
            state.loading = false
            state.highlights = []
            state.error = action.error.message
        })

        //GET HIGHLIGHT /////////////////////////////////////
        builder.addCase(getHighlight.pending, state => {
            state.highlightLoading = true
        })
        builder.addCase(getHighlight.fulfilled, (state, action) => {
            state.highlightLoading = false
            state.highlight = action.payload.highlight
            state.highlightError = ""
        })
        builder.addCase(getHighlight.rejected, (state, action) => {
            state.highlightLoading = false
            state.highlight = null
            state.highlightError = action.error.message
        })

        //ADD HIGHLIGHT /////////////////////////////////////////
        builder.addCase(addHighlight.pending, state => {
            state.success = false
        })
        builder.addCase(addHighlight.fulfilled, (state, action) => {
            state.success = true
            let tempHighlights = [...state.highlights]
            let highlight = action.payload.highlight
            tempHighlights.unshift(highlight)
            state.highlights = tempHighlights
        })
        builder.addCase(addHighlight.rejected, (state, action) => {
            state.success = false
        })

        //EDIT HIGHLIGHT //////////////////////////////////////////
        builder.addCase(updateHighlight.pending, state => {
            state.success = false
        })
        builder.addCase(updateHighlight.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.highlights.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateHighlight.rejected, (state, action) => {
            state.success = false
        })

        //DELETE HIGHLIGHT ////////////////////////////////////////
        builder.addCase(deleteHighlight.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteHighlight.fulfilled, (state, action) => {
            state.deleting = false
            state.highlights = state.highlights.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteHighlight.rejected, (state, action) => {
            state.deleting = false
        })
    }
})

export default highlight.reducer
export const { successListener } = highlight.actions
