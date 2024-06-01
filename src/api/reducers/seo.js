import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_SEO,
    CREATE_SEO, DELETE_LANGUAGE, DELETE_SEO,
    SEO_REDUCER, SINGLE_SEO,
    UPDATE_SEO
} from "../../utils/constants";
import seoService from "../services/seoService";
import {getLanguages} from "./language";
import languageService from "../services/languageService";

const initialState = {
    loading: false,
    seoLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    allSEO: [],
    seo: null,
    error: '',
    seoError: '',
};

export const addSEO = createAsyncThunk(CREATE_SEO, (seo) => {
    return seoService.create(seo)
})

export const updateSEO = createAsyncThunk(UPDATE_SEO, (seo) => {
    return seoService.update(seo).then(response => {
        if (response.success) {
            return seo
        } else {
            return null
        }
    })
})

export const getAllSEO = createAsyncThunk(ALL_SEO, async () => {
    return await seoService.fetchAllSeo();
});

export const getSEO = createAsyncThunk(SINGLE_SEO, (id) => {
    return seoService.fetch(id)
})

export const deleteSEO = createAsyncThunk(DELETE_SEO, (id) => {
    return seoService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

const seo = createSlice({
    name: SEO_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: (builder) => {
        //GET ALL SEO /////////////////////////////////
        builder.addCase(getAllSEO.pending, state => {
            state.loading = true
        })
        builder.addCase(getAllSEO.fulfilled, (state, action) => {
            state.loading = false
            state.allSEO = action.payload.allSEO
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getAllSEO.rejected, (state, action) => {
            state.loading = false
            state.languages = []
            state.error = action.error.message
        })

        //GET SEO /////////////////////////////////////
        builder.addCase(getSEO.pending, state => {
            state.seoLoading = true
        })
        builder.addCase(getSEO.fulfilled, (state, action) => {
            state.seoLoading = false
            state.seo = action.payload.seo
            state.seoError = ""
        })
        builder.addCase(getSEO.rejected, (state, action) => {
            state.seoLoading = false
            state.seo = null
            state.seoError = action.error.message
        })

        //ADD SEO /////////////////////////////////////////
        builder.addCase(addSEO.pending, state => {
            state.success = false
        })
        builder.addCase(addSEO.fulfilled, (state, action) => {
            state.success = true
            let tempAllSEO = [...state.allSEO]
            let seo = action.payload.seo
            tempAllSEO.unshift(seo)
            state.allSEO = tempAllSEO
        })
        builder.addCase(addSEO.rejected, (state, action) => {
            state.success = false
        })

        //EDIT SEO //////////////////////////////////////////
        builder.addCase(updateSEO.pending, state => {
            state.success = false
        })
        builder.addCase(updateSEO.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.allSEO.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateSEO.rejected, (state, action) => {
            state.success = false
        })

        //DELETE SEO ////////////////////////////////////////
        builder.addCase(deleteSEO.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteSEO.fulfilled, (state, action) => {
            state.deleting = false
            state.allSEO = state.allSEO.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteSEO.rejected, (state, action) => {
            state.deleting = false
        })
    },
});

export default seo.reducer;
export const { successListener } = seo.actions
