import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "../services/contactService";
import { CONTACT_US } from "../../utils/constants";

// Initial state
const initialState = {
    data: [],
    loading: false,
    noData: false,
    success: false,
    error: null,
};

// Async thunk for fetching contact data
export const getContactUs = createAsyncThunk(CONTACT_US, async () => {
    const response = await contactService.getContact();
    return response;
});

// Contact slice
const contact = createSlice({
    name: CONTACT_US,
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getContactUs.pending, (state, action) => {
                console.log('state pending', action);
                state.loading = true;
                state.noData = false;
                state.success = false;
                state.error = null;
            })
            .addCase(getContactUs.fulfilled, (state, action) => {
                console.log('state fulfilled', action);
                state.loading = false;
                state.data = action.payload.contacts || [];
                state.success = true;
                state.noData = action.payload.length === 0;
                state.error = null;
            })
            .addCase(getContactUs.rejected, (state, action) => {
                console.log('state rejected', action);
                state.loading = false;
                state.noData = true;
                state.success = false;
                state.error = action.error.message;
            });
    },
});

export default contact.reducer;
