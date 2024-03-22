import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_USERS, USER_REDUCER} from "../../utils/constants";
import userService from "../services/userService";

const initialState = {
    loading: false,
    userLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    users: [],
    user: null,
    error: '',
    userError: '',
}

export const getUsers = createAsyncThunk(ALL_USERS, () => {
    return userService.fetchAll()
})

const user = createSlice({
    name: USER_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //GET ALL USERS /////////////////////////////////
        builder.addCase(getUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.users
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    }
})

export default user.reducer
export const { successListener } = user.actions
