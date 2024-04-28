import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_LANGUAGES,
    CREATE_LANGUAGE,
    DELETE_LANGUAGE,
    HIGHLIGHT_REDUCER, LANGUAGE_REDUCER,
    SINGLE_LANGUAGE,
    UPDATE_LANGUAGE
} from "../../utils/constants";
import languageService from "../services/languageService";
import {addHighlight, deleteHighlight, getHighlight, getHighlights, updateHighlight} from "./highlight";

const initialState = {
    loading: false,
    languageLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    languages: [],
    language: null,
    error: '',
    languageError: '',
}

export const addLanguage = createAsyncThunk(CREATE_LANGUAGE, (language) => {
    return languageService.create(language)
})

export const updateLanguage = createAsyncThunk(UPDATE_LANGUAGE, (language) => {
    return languageService.update(language).then(response => {
        if (response.success) {
            return language
        } else {
            return null
        }
    })
})

export const getLanguages = createAsyncThunk(ALL_LANGUAGES, () => {
    return languageService.fetchAll()
})

export const getLanguage = createAsyncThunk(SINGLE_LANGUAGE, (id) => {
    return languageService.fetch(id)
})

export const deleteLanguage = createAsyncThunk(DELETE_LANGUAGE, (id) => {
    return languageService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

const language = createSlice({
    name: LANGUAGE_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //GET ALL LANGUAGES /////////////////////////////////
        builder.addCase(getLanguages.pending, state => {
            state.loading = true
        })
        builder.addCase(getLanguages.fulfilled, (state, action) => {
            state.loading = false
            state.languages = action.payload.languages
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getLanguages.rejected, (state, action) => {
            state.loading = false
            state.languages = []
            state.error = action.error.message
        })

        //GET LANGUAGE /////////////////////////////////////
        builder.addCase(getLanguage.pending, state => {
            state.languageLoading = true
        })
        builder.addCase(getLanguage.fulfilled, (state, action) => {
            state.languageLoading = false
            state.language = action.payload.language
            state.languageError = ""
        })
        builder.addCase(getLanguage.rejected, (state, action) => {
            state.languageLoading = false
            state.language = null
            state.languageError = action.error.message
        })

        //ADD LANGUAGE /////////////////////////////////////////
        builder.addCase(addLanguage.pending, state => {
            state.success = false
        })
        builder.addCase(addLanguage.fulfilled, (state, action) => {
            state.success = true
            let tempLanguages = [...state.languages]
            let language = action.payload.language
            tempLanguages.unshift(language)
            state.languages = tempLanguages
        })
        builder.addCase(addLanguage.rejected, (state, action) => {
            state.success = false
        })

        //EDIT LANGUAGE //////////////////////////////////////////
        builder.addCase(updateLanguage.pending, state => {
            state.success = false
        })
        builder.addCase(updateLanguage.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.languages.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateLanguage.rejected, (state, action) => {
            state.success = false
        })

        //DELETE LANGUAGE ////////////////////////////////////////
        builder.addCase(deleteLanguage.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteLanguage.fulfilled, (state, action) => {
            state.deleting = false
            state.languages = state.languages.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteLanguage.rejected, (state, action) => {
            state.deleting = false
        })
    }
})

export default language.reducer
export const { successListener } = language.actions
