import logo from './logo.svg';
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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="/users" element={<UserList/>}/>
                <Route path="/users/add" element={<UserAddEdit/>}/>

                <Route path="/categories" element={<CategoryList/>}/>
                <Route path="/categories/add" element={<CategoryAddEdit/>}/>

                <Route path="/blogs" element={<BlogList/>}/>
                <Route path="/blogs/add" element={<BlogAddEdit/>}/>

                <Route path="/contractors" element={<ContractorList/>}/>
                <Route path="/contractors/add" element={<ContractorAddEdit/>}/>

                <Route path="/costGuides" element={<CostGuideList/>}/>
                <Route path="/costGuides/add" element={<CostGuideAddEdit/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
