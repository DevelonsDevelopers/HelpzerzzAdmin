import {configureStore} from "@reduxjs/toolkit";
import user from "../reducers/user";
import category from "../reducers/category";
import blog from "../reducers/blog";
import contractor from "../reducers/contractor";
import costGuide from "../reducers/costGuide";
import subcategory from "../reducers/subcategory";
import testimonial from "../reducers/testimonial";
import request from "../reducers/request";

const store = configureStore({
    reducer: {
        user: user,
        category: category,
        blog: blog,
        contractor: contractor,
        costGuide: costGuide,
        subcategory: subcategory,
        testimonial: testimonial,
        request: request,
    }
})

export default store
