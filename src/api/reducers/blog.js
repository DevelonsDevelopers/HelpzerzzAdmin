import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ALL_BLOGS,
    BLOG_REDUCER,
    CREATE_BLOG,
    DELETE_BLOG,
    FEATURE_BLOG,
    SINGLE_BLOG,
    STATUS_BLOG
} from "../../utils/constants";
import blogService from "../services/blogService";
import uploadService from "../services/uploadService";

const initialState = {
    loading: false,
    blogLoading: false,
    deleting: false,
    noData: false,
    success: false,
    fetched: false,
    blogs: [],
    blog: null,
    error: '',
    blogError: '',
}

export const getBlogs = createAsyncThunk(ALL_BLOGS, () => {
    return blogService.fetchAll()
})

export const getBlog = createAsyncThunk(SINGLE_BLOG, (id) => {
    return blogService.fetch(id)
})

export const addBlog = createAsyncThunk(CREATE_BLOG, (data) => {
    return uploadService.single(data.file).then(file => {
        let blog = data.blog;
        blog.image = file.fileName
        return blogService.create(blog)
    })
})

export const deleteBlog = createAsyncThunk(DELETE_BLOG, (id) => {
    return blogService.delete(id).then(response => {
        if (response.success){
            return id
        } else {
            return 0
        }
    })
})

export const updateBlogStatus = createAsyncThunk(STATUS_BLOG, (data) => {
    return blogService.changeStatus(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

export const updateBlogFeature = createAsyncThunk(FEATURE_BLOG, (data) => {
    return blogService.changeFeatured(data).then(response => {
        if (response.success){
            return data.id
        } else {
            return 0
        }
    })
})

const blog = createSlice({
    name: BLOG_REDUCER,
    initialState,
    reducers: {
        successListener: (state) => {
            state.success = false
        }
    },
    extraReducers: builder => {
        //ALL BLOGS ///////////////////////////
        builder.addCase(getBlogs.pending, state => {
            state.loading = true
        })
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false
            state.blogs = action.payload.blogs
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getBlogs.rejected, (state, action) => {
            state.loading = false
            state.blogs = []
            state.error = action.error.message
        })

        //GET BLOG /////////////////////////////////////
        builder.addCase(getBlog.pending, state => {
            state.blogLoading = true
        })
        builder.addCase(getBlog.fulfilled, (state, action) => {
            state.blogLoading = false
            state.blog = action.payload.blog
            state.blogError = ""
        })
        builder.addCase(getBlog.rejected, (state, action) => {
            state.blogLoading = false
            state.blog = null
            state.blogError = action.error.message
        })

        //ADD BLOG /////////////////////////////////////////
        builder.addCase(addBlog.pending, state => {
            state.success = false
        })
        builder.addCase(addBlog.fulfilled, (state, action) => {
            state.success = true
            let tempBlogs = [...state.blogs]
            let blog = action.payload.blog
            tempBlogs.unshift(blog)
            state.blogs = tempBlogs
        })
        builder.addCase(addBlog.rejected, (state, action) => {
            state.success = false
        })

        //DELETE BLOG ////////////////////////////////////////
        builder.addCase(deleteBlog.pending, state => {
            state.deleting = true
        })
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.deleting = false
            state.blogs = state.blogs.filter((value) => value.id !== action.payload)
        })
        builder.addCase(deleteBlog.rejected, (state, action) => {
            state.deleting = false
        })

        //STATUS CATEGORY ////////////////////////////////////////
        builder.addCase(updateBlogStatus.pending, state => {

        })
        builder.addCase(updateBlogStatus.fulfilled, (state, action) => {
            const value = state.blogs.find(v => v.id === action.payload)
            if (value) {
                if (value.status === 0) {
                    value.status = 1
                } else {
                    value.status = 0
                }
            }
        })
        builder.addCase(updateBlogStatus.rejected, (state, action) => {

        })

        //FEATURE CATEGORY ////////////////////////////////////////
        builder.addCase(updateBlogFeature.pending, state => {

        })
        builder.addCase(updateBlogFeature.fulfilled, (state, action) => {
            const value = state.blogs.find(v => v.id === action.payload)
            if (value) {
                if (value.featured === 0) {
                    value.featured = 1
                } else {
                    value.featured = 0
                }
            }
        })
        builder.addCase(updateBlogFeature.rejected, (state, action) => {

        })
    }
})

export default blog.reducer
export const { successListener } = blog.actions
