import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_USERS,
    CREATE_USER, DELETE_USER, SINGLE_USER, STATUS_USER,
    UPDATE_USER,
    USER_REDUCER
} from "../../utils/constants";
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

export const addUser = createAsyncThunk(CREATE_USER, (user) => {
    return userService.create(user)
})

export const updateUser = createAsyncThunk(UPDATE_USER, (user) => {
    return userService.update(user).then(response => {
        if (response.success) {
            return user
        } else {
            return null
        }
    })
})

export const getUsers = createAsyncThunk(ALL_USERS, () => {
    return userService.fetchAll()
})

export const getUser = createAsyncThunk(SINGLE_USER, (id) => {
    return userService.fetch(id)
})

export const deleteUser = createAsyncThunk(DELETE_USER, (id) => {
    return userService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const updateUserStatus = createAsyncThunk(STATUS_USER, (data) => {
    return userService.changeStatus(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
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

        //GET USER /////////////////////////////////////
        builder.addCase(getUser.pending, state => {
            state.userLoading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.userLoading = false
            state.user = action.payload.user
            state.userError = ""
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.userLoading = false
            state.user = null
            state.userError = action.error.message
        })

        //ADD USER /////////////////////////////////////////
        builder.addCase(addUser.pending, state => {
            state.success = false
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.success = true
            let tempUsers = [...state.users]
            let user = action.payload.user
            tempUsers.unshift(user)
            state.users = tempUsers
        })
        builder.addCase(addUser.rejected, (state, action) => {
            state.success = false
        })

        //EDIT USER //////////////////////////////////////////
        builder.addCase(updateUser.pending, state => {
            state.success = false
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.users.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.success = false
        })

        //DELETE USER ////////////////////////////////////////
        builder.addCase(deleteUser.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.deleting = false
            state.users = state.users.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.deleting = false
        })

        //STATUS USER ////////////////////////////////////////
        builder.addCase(updateUserStatus.pending, state => {

        })
        builder.addCase(updateUserStatus.fulfilled, (state, action) => {
            const value = state.users.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateUserStatus.rejected, (state, action) => {

        })
    }
})

export default user.reducer
export const { successListener } = user.actions
