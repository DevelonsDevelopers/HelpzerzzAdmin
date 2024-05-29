import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_CITIES, CITY_REDUCER,
    CREATE_CITY, DELETE_CITY, SINGLE_CITY,
    UPDATE_CITY,
} from "../../utils/constants";
import cityService from "../services/cityService";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    cityLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    cities: [],
    city: null,
    error: '',
    cityError: '',
}

export const addCity = createAsyncThunk(CREATE_CITY, (city) => {
    return cityService.create(city)
})

export const updateCity = createAsyncThunk(UPDATE_CITY, (city) => {
    return cityService.update(city).then(response => {
        if (response.success) {
            return city
        } else {
            return null
        }
    })
})

export const getCities = createAsyncThunk(ALL_CITIES, () => {
    return cityService.fetchAll()
})

export const getCity = createAsyncThunk(SINGLE_CITY, (id) => {
    return cityService.fetch(id)
})

export const deleteCity = createAsyncThunk(DELETE_CITY, (id) => {
    return cityService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

const city = createSlice({
    name: CITY_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //GET ALL LANGUAGES /////////////////////////////////
        builder.addCase(getCities.pending, state => {
            state.loading = true
        })
        builder.addCase(getCities.fulfilled, (state, action) => {
            state.loading = false
            state.cities = action.payload.cities
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getCities.rejected, (state, action) => {
            state.loading = false
            state.cities = []
            state.error = action.error.message
        })

        //GET LANGUAGE /////////////////////////////////////
        builder.addCase(getCity.pending, state => {
            state.cityLoading = true
        })
        builder.addCase(getCity.fulfilled, (state, action) => {
            state.cityLoading = false
            state.city = action.payload.city
            state.cityError = ""
        })
        builder.addCase(getCity.rejected, (state, action) => {
            state.cityLoading = false
            state.city = null
            state.cityError = action.error.message
        })

        //ADD LANGUAGE /////////////////////////////////////////
        builder.addCase(addCity.pending, state => {
            state.success = false
        })
        builder.addCase(addCity.fulfilled, (state, action) => {
            state.success = true
            let tempCities = [...state.cities]
            let city = action.payload.city
            tempCities.unshift(city)
            state.cities = tempCities
        })
        builder.addCase(addCity.rejected, (state, action) => {
            state.success = false
            console.log('error' , action)
            toast.error('unexpected error occured')
        })

        //EDIT LANGUAGE //////////////////////////////////////////
        builder.addCase(updateCity.pending, state => {
            state.success = false
        })
        builder.addCase(updateCity.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.cities.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateCity.rejected, (state, action) => {
            state.success = false
        })

        //DELETE LANGUAGE ////////////////////////////////////////
        builder.addCase(deleteCity.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteCity.fulfilled, (state, action) => {
            state.deleting = false
            state.cities = state.cities.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteCity.rejected, (state, action) => {
            state.deleting = false
        })
    }
})

export default city.reducer
export const { successListener } = city.actions
