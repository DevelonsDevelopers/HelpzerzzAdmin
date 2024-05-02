import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import UserList from "./pages/User/UserList";
import CategoryList from "./pages/Category/CategoryList";
import BlogList from "./pages/Blog/BlogList";
import ContractorList from "./pages/Contractor/ContractorList";
import CostGuideList from "./pages/CostGuide/CostGuideList";
import UserAddEdit from "./pages/User/UserAddEdit";
import CategoryAddEdit from "./pages/Category/CategoryAddEdit";
import BlogAddEdit from "./pages/Blog/BlogAddEdit";
import ContractorAddEdit from "./pages/Contractor/ContractorAddEdit";
import CostGuideAddEdit from "./pages/CostGuide/CostGuideAddEdit";
import TestimonialList from "./pages/Testimonial/TestimonialList";
import TestimonialAddEdit from "./pages/Testimonial/TestimonialAddEdit";
import RequestDetails from "./pages/Request/RequestDetails";
import RequestList from "./pages/Request/RequestList";
import ContractorDetails from "./pages/Contractor/ContractorDetails";
import SubcategoryList from "./pages/Subcategory/SubcategoryList";
import SubcategoryAddEdit from "./pages/Subcategory/SubcategoryAddEdit";
import PortalLayout from "./layouts/PortalLayout";
import CustomerList from "./pages/Customer/CustomerList";
import CityAddEdit from "./pages/City/CityAddEdit";
import CityList from "./pages/City/CityList";
import HighlightList from "./pages/Highlight/HighlightList";
import HighlightAddEdit from "./pages/Highlight/HighlightAddEdit";
import LanguageList from "./pages/Language/LanguageList";
import LanguageAddEdit from "./pages/Language/LanguageAddEdit";
import ReviewsList from "./pages/Review/ReviewsList";
import { useState } from "react";
import SuccessStoryList from "./pages/SuccessStory/SuccessStoryList";
import SuccessStoryAdd from "./pages/SuccessStory/SuccessStoryAdd";
import ContractorRequestList from "./pages/ContractorRequest/ContractorRequestList";
import ContractorRequestDetails from "./pages/ContractorRequest/ContractorRequestDetails";

function App() {
  const [search, setSearch] = useState("");

  return (
    <PortalLayout setSearch={setSearch}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/users" element={<UserList search={search} />} />
        <Route path="/users/add" element={<UserAddEdit />} />
        <Route path="/users/edit" element={<UserAddEdit edit={true} />} />

        <Route path="/reviews" element={<ReviewsList search={search} />} />

        <Route path="/categories" element={<CategoryList search={search} />} />
        <Route path="/categories/add" element={<CategoryAddEdit />} />
        <Route
          path="/categories/edit"
          element={<CategoryAddEdit edit={true} />}
        />

        <Route
          path="/subcategories"
          element={<SubcategoryList search={search} />}
        />
        <Route path="/subcategories/add" element={<SubcategoryAddEdit />} />
        <Route
          path="/subcategories/edit"
          element={<SubcategoryAddEdit edit={true} />}
        />

        <Route path="/cities" element={<CityList search={search} />} />
        <Route path="/cities/add" element={<CityAddEdit />} />
        <Route path="/cities/edit" element={<CityAddEdit edit={true} />} />

        <Route path="/blogs" element={<BlogList search={search} />} />
        <Route path="/blogs/add" element={<BlogAddEdit />} />
        <Route path="/blogs/edit" element={<BlogAddEdit edit={true} />} />

        <Route
          path="/contractors"
          element={<ContractorList search={search} />}
        />
        <Route path="/contractors/add" element={<ContractorAddEdit />} />
        <Route
          path="/contractors/edit"
          element={<ContractorAddEdit edit={true} />}
        />
        <Route path="/contractors/details" element={<ContractorDetails />} />

        <Route path="/customers" element={<CustomerList search={search} />} />

        <Route path="/costGuides" element={<CostGuideList search={search} />} />
        <Route path="/costGuides/add" element={<CostGuideAddEdit />} />
        <Route
          path="/costGuides/edit"
          element={<CostGuideAddEdit edit={true} />}
        />

        <Route
          path="/testimonials"
          element={<TestimonialList search={search} />}
        />
        <Route path="/testimonials/add" element={<TestimonialAddEdit />} />
        <Route
          path="/testimonials/edit"
          element={<TestimonialAddEdit edit={true} />}
        />

        <Route path="/requests" element={<RequestList search={search} />} />
        <Route path="/requests/details" element={<RequestDetails />} />

        <Route
          path="/utils/highlights"
          element={<HighlightList search={search} />}
        />
        <Route path="/utils/highlights/add" element={<HighlightAddEdit />} />
        <Route
          path="/utils/highlights/edit"
          element={<HighlightAddEdit edit={true} />}
        />
        <Route
          path="/utils/languages"
          element={<LanguageList search={search} />}
        />
        <Route path="/utils/languages/add" element={<LanguageAddEdit />} />
        <Route
          path="/utils/languages/edit"
          element={<LanguageAddEdit edit={true} />}
        />

        <Route path="/story" element={<SuccessStoryList search={search} />} />
        <Route path="/story/add" element={<SuccessStoryAdd />} />
        <Route path="/story/edit" element={<SuccessStoryAdd edit={true} />} />
        <Route path="/contractorrequest" element={<ContractorRequestList />}/>
        <Route path="/contractorrequest/details" element={<ContractorRequestDetails />} />
      </Routes>
    </PortalLayout>
  );
}

export default App;
