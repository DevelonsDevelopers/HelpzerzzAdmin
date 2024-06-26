import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import category from "../reducers/category";
import blog from "../reducers/blog";
import contractor from "../reducers/contractor";
import costGuide from "../reducers/costGuide";
import subcategory from "../reducers/subcategory";
import testimonial from "../reducers/testimonial";
import request from "../reducers/request";
import customer from "../reducers/customer";
import city from "../reducers/city";
import highlight from "../reducers/highlight";
import language from "../reducers/language";
import review from "../reducers/review";
import successStory from "../reducers/successStory";
import contractorRequest from "../reducers/contractorRequest";
import contact from "../reducers/contact";
import seo from "../reducers/seo";

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
    customer: customer,
    city: city,
    highlight: highlight,
    language: language,
    review: review,
    successStory: successStory,
    contractorRequest: contractorRequest,
    contact : contact,
    seo : seo,
  },
});

export default store;
