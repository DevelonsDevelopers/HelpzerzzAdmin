import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import { GET_SEO } from "../../utils/constants";
import seoService from "../services/seoService";

 const initialState = {
    data: [],
    loading: false,
    noData: false,
    success: false,
    error: null,
};

 export const getSeo = createAsyncThunk(GET_SEO, async () => {
    const response = await seoService.getSeo();
    return response;
});

 const seo = createSlice({
    name: GET_SEO,
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSeo.pending, (state, action) => {
                console.log('state pending', action);
                state.loading = true;
                state.noData = false;
                state.success = false;
                state.error = null;
            })
            .addCase(getSeo.fulfilled, (state, action) => {
                console.log('state fulfilled', action);
                state.loading = false;
                state.data = action.payload.allSEO || [];
                state.success = true;
                state.noData = action.payload.allSEO.length === 0;
                state.error = null;
            })
            .addCase(getSeo.rejected, (state, action) => {
                console.log('state rejected', action);
                state.loading = false;
                state.noData = true;
                state.success = false;
                state.error = action.error.message;
            });
    },
});

export default seo.reducer;
