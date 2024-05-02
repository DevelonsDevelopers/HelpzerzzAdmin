import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ACCEPT_CONTRACTOR_REQUEST,
    ALL_CONTRACTOR_REQUEST,
    CONTRACTOR_REQUEST_REDUCER,
    DELETE_CONTRACTOR_REQUEST,
    REJECT_CONTRACTOR_REQUEST,
    SINGLE_CONTRACTOR_REQUEST,
} from "../../utils/constants";
import contractorRequestService from "../services/contractorRequestService";

const initialState = {
    loading: false,
    deleting: false,
    noData: false,
    error: false,
    contractorRequests: [],

    contractorRequestLoading: false,
    contractorRequestError: false,
    contractorRequest: null,
};

export const getContractorRequest = createAsyncThunk(
    ALL_CONTRACTOR_REQUEST,
    () => {
        return contractorRequestService.fetchAll();
    }
);
export const singleContractorRequest = createAsyncThunk(SINGLE_CONTRACTOR_REQUEST, (id) => {
        return contractorRequestService.single(id);
    }
);

export const deleteContractorRequest = createAsyncThunk(
    DELETE_CONTRACTOR_REQUEST,
    (id) => {
        return contractorRequestService.delete(id).then((response) => {
            if (response.success) {
                return id;
            } else {
                return 0;
            }
        });
    }
);
export const acceptContractorRequest = createAsyncThunk(ACCEPT_CONTRACTOR_REQUEST, (id) => {
        return contractorRequestService.accept(id).then((response) => {
            console.log('accept response', response)
            if (response.success) {
                return id;
            } else {
                return 0;
            }
        });
    }
);
export const rejectContractorRequest = createAsyncThunk(
    REJECT_CONTRACTOR_REQUEST,
    (id) => {
        return contractorRequestService.reject(id).then((response) => {
            if (response.success) {
                return id;
            } else {
                return 0;
            }
        });
    }
);

const contractorRequest = createSlice({
    name: CONTRACTOR_REQUEST_REDUCER,
    initialState,
    extraReducers: (builder) => {
        //ALL CONTRACTORS ///////////////////////////
        builder.addCase(getContractorRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getContractorRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.contractorRequests = action.payload.contractorRequests;
            console.log(action)
            state.error = "";
            // state.fetched = true
        });
        builder.addCase(getContractorRequest.rejected, (state, action) => {
            state.loading = false;
            state.contractorRequests = [];
            state.error = action.error.message;
        });

        //GET CONTRACTOR /////////////////////////////////////
        builder.addCase(singleContractorRequest.pending, (state) => {
            state.contractorRequestLoading = true;
        });
        builder.addCase(singleContractorRequest.fulfilled, (state, action) => {
            state.contractorRequestLoading = false;
            state.contractorRequest = action.payload.contractorRequest;
            state.contractorError = "";
        });
        builder.addCase(singleContractorRequest.rejected, (state, action) => {
            state.contractorRequestLoading = false;
            state.contractorRequest = null;
            state.contractorError = action.error.message;
        });

        //DELETE CONTRACTOR ////////////////////////////////////////
        builder.addCase(deleteContractorRequest.pending, (state) => {
            state.deleting = true;
        });
        builder.addCase(deleteContractorRequest.fulfilled, (state, action) => {
            state.deleting = false;
            state.contractorRequests = state.contractorRequests.filter(
                (value) => value.id !== action.payload
            );
        });
        builder.addCase(deleteContractorRequest.rejected, (state, action) => {
            state.deleting = false;
        });
        //APPROVE REVIEW ////////////////////////////////////////
        builder.addCase(acceptContractorRequest.pending, (state) => {
        });
        builder.addCase(acceptContractorRequest.fulfilled, (state, action) => {
            const value = state.contractorRequests?.find(
                (v) => v.id === action.payload
            );
            if (value) {
                value.status = 1;
                state.contractorRequest.status = 1
            }
        });
        builder.addCase(acceptContractorRequest.rejected, (state, action) => {
        });

        //REJECT REVIEW ////////////////////////////////////////
        builder.addCase(rejectContractorRequest.pending, state => {
        })
        builder.addCase(rejectContractorRequest.fulfilled, (state, action) => {
            const value = state.contractorRequests?.find(v => v.id === action.payload)
            if (value) {
                value.status = 2
                state.contractorRequest.status = 2
            }
        })
        builder.addCase(rejectContractorRequest.rejected, (state, action) => {

        })
    },
});

export default contractorRequest.reducer;
