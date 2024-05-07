import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_STORIES, CREATE_BLOG,
    CREATE_STORY,
    DELETE_STORY,
    POPULAR_STORY,
    SINGLE_STORY,
    STATUS_STORY, STORY_REDUCER,
    UPDATE_STORY
} from "../../utils/constants";
import successStoryService from "../services/successStoryService";
import uploadService from "../services/uploadService";
import blogService from "../services/blogService";

const initialState = {
    loading: false,
    storyLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    stories: [],
    story: null,
    error: '',
    storyError: '',
}

export const addStory = createAsyncThunk(CREATE_BLOG, (data) => {
    return uploadService.single(data.file).then(file => {
        let story = data.story;
        story.image = file.fileName
        console.log(story, 'story')
        return successStoryService.create(story)
    })
})

export const updateStory = createAsyncThunk(UPDATE_STORY, (story) => {
    return successStoryService.update(story).then(response => {
        if (response.success) {
            return story
        } else {
            return null
        }
    })
})

export const getStories = createAsyncThunk(ALL_STORIES, () => {
    return successStoryService.fetchAll()
})

export const getStory = createAsyncThunk(SINGLE_STORY, (id) => {
    return successStoryService.fetch(id)
})

export const deleteStory = createAsyncThunk(DELETE_STORY, (id) => {
    return successStoryService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const updateStoryStatus = createAsyncThunk(STATUS_STORY, (data) => {
    return successStoryService.changeStatus(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

export const updateStoryPopular = createAsyncThunk(POPULAR_STORY, (data) => {
    return successStoryService.changePopular(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

const successStory = createSlice({
    name: STORY_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //ALL STORIES ///////////////////////////
        builder.addCase(getStories.pending, state => {
            state.loading = true
        })
        builder.addCase(getStories.fulfilled, (state, action) => {
            state.loading = false
            state.stories = action.payload.successStories
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getStories.rejected, (state, action) => {
            state.loading = false
            state.stories = []
            state.error = action.error.message
        })

        //GET STORY /////////////////////////////////////
        builder.addCase(getStory.pending, state => {
            state.storyLoading = true
        })
        builder.addCase(getStory.fulfilled, (state, action) => {
            state.storyLoading = false
            state.story = action.payload.successStory
            state.storyError = ""
        })
        builder.addCase(getStory.rejected, (state, action) => {
            state.storyLoading = false
            state.story = null
            state.storyError = action.error.message
        })

        //ADD STORY /////////////////////////////////////////
        builder.addCase(addStory.pending, state => {
            state.success = false
        })
        builder.addCase(addStory.fulfilled, (state, action) => {
            state.success = true
            let tempStories = [...state.stories]
            let story = action.payload.successStory
            tempStories.unshift(story)
            state.stories = tempStories
        })
        builder.addCase(addStory.rejected, (state, action) => {
            state.success = false
        })

        //EDIT STORY //////////////////////////////////////////
        builder.addCase(updateStory.pending, state => {
            state.success = false
        })
        builder.addCase(updateStory.fulfilled, (state, action) => {
            state.success = true
            if (action.payload) {
                const value = state.stories.find(v => v.id === action.payload.id)
                Object.assign(value, action.payload)
            }
        })
        builder.addCase(updateStory.rejected, (state, action) => {
            state.success = false
        })

        //DELETE STORY ////////////////////////////////////////
        builder.addCase(deleteStory.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteStory.fulfilled, (state, action) => {
            state.deleting = false
            state.stories = state.stories.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteStory.rejected, (state, action) => {
            state.deleting = false
        })

        //STATUS STORY ////////////////////////////////////////
        builder.addCase(updateStoryStatus.pending, state => {

        })
        builder.addCase(updateStoryStatus.fulfilled, (state, action) => {
            const value = state.stories.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateStoryStatus.rejected, (state, action) => {

        })

        //POPULAR STORY ////////////////////////////////////////
        builder.addCase(updateStoryPopular.pending, state => {

        })
        builder.addCase(updateStoryPopular.fulfilled, (state, action) => {
            const value = state.stories.find(v => v.id === action.payload)
            if (value) {
                if (value.popular === 0) {
                    value.popular = 1
                } else {
                    value.popular = 0
                }
            }
        })
        builder.addCase(updateStoryPopular.rejected, (state, action) => {

        })
    }
})

export default successStory.reducer
export const { successListener } = successStory.actions
