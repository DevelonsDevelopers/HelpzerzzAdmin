import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
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

function App() {
    return (
        <PortalLayout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="/users" element={<UserList/>}/>
                <Route path="/users/add" element={<UserAddEdit/>}/>
                <Route path="/users/edit" element={<UserAddEdit edit={true}/>}/>

                <Route path="/categories" element={<CategoryList/>}/>
                <Route path="/categories/add" element={<CategoryAddEdit/>}/>
                <Route path="/categories/edit" element={<CategoryAddEdit edit={true}/>}/>

                <Route path="/subcategories" element={<SubcategoryList/>}/>
                <Route path="/subcategories/add" element={<SubcategoryAddEdit/>}/>
                <Route path="/subcategories/edit" element={<SubcategoryAddEdit edit={true}/>}/>

                <Route path="/cities" element={<CityList/>}/>
                <Route path="/cities/add" element={<CityAddEdit/>}/>
                <Route path="/cities/edit" element={<CityAddEdit edit={true}/>}/>

                <Route path="/blogs" element={<BlogList/>}/>
                <Route path="/blogs/add" element={<BlogAddEdit/>}/>
                <Route path="/blogs/edit" element={<BlogAddEdit edit={true}/>}/>

                <Route path="/contractors" element={<ContractorList/>}/>
                <Route path="/contractors/add" element={<ContractorAddEdit/>}/>
                <Route path="/contractors/edit" element={<ContractorAddEdit edit={true}/>}/>
                <Route path="/contractors/details" element={<ContractorDetails/>}/>

                <Route path="/customers" element={<CustomerList/>}/>

                <Route path="/costGuides" element={<CostGuideList/>}/>
                <Route path="/costGuides/add" element={<CostGuideAddEdit/>}/>
                <Route path="/costGuides/edit" element={<CostGuideAddEdit edit={true}/>}/>

                <Route path="/testimonials" element={<TestimonialList/>}/>
                <Route path="/testimonials/add" element={<TestimonialAddEdit/>}/>
                <Route path="/testimonials/edit" element={<TestimonialAddEdit edit={true}/>}/>

                <Route path="/requests" element={<RequestList/>}/>
                <Route path="/requests/details" element={<RequestDetails/>}/>

                <Route path="/utils/highlights" element={<HighlightList/>}/>
                <Route path="/utils/highlights/add" element={<HighlightAddEdit/>}/>
                <Route path="/utils/highlights/edit" element={<HighlightAddEdit edit={true}/>}/>
                <Route path="/utils/languages" element={<LanguageList/>}/>
                <Route path="/utils/languages/add" element={<LanguageAddEdit/>}/>
                <Route path="/utils/languages/edit" element={<LanguageAddEdit edit={true}/>}/>
            </Routes>
        </PortalLayout>
    );
}

export default App;
