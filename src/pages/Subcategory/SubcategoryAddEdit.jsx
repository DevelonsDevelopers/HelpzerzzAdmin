import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {
    addSubcategory,
    getSubcategory,
    successListener,
    updateSubcategory,
} from "../../api/reducers/subcategory";
import {getActiveCategories} from "../../api/reducers/category";
import ButtonLoading from "../../components/ButtonLoading";
import Loading from "../../components/Loading";

const SubcategoryAddEdit = ({edit = false}) => {
    const names = ["category", "name", "meta_title", "meta_description", "page_description"];
    const [error, setErrors] = useState([false, false, false, false, false]);
    const [subcategoryData, setSubcategoryData] = useState({
        category: "",
        name: "",
        meta_title: "",
        meta_description: "",
        page_description: ""
    });
    const [assignLoading, setAssignLoading] = useState(false);
    const response = useSelector((state) => state.subcategory);
    const categoryResponse = useSelector((state) => state.category);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    useEffect(() => {
        if (!response.fetched) {
            dispatch(getSubcategory());
        }
    }, [dispatch]);

    console.log(response);
    useEffect(() => {
        if (edit) {
            if (params.get("id")) {
                dispatch(getSubcategory(params.get("id")));
            }
        }
    }, []);

    useEffect(() => {
        if (!categoryResponse.activeFetched) {
            dispatch(getActiveCategories());
        }
    }, [categoryResponse.activeFetched]);

    useEffect(() => {
        if (edit) {
            if (response.subcategory) {
                setSubcategoryData(response.subcategory);
            }
        }
    }, [response.subcategory]);

    useEffect(() => {
        if (response.success) {
            navigate("/subcategories");
            dispatch(successListener());
        }
    }, [response.success]);

    const handleChange = (e) => {
        let tempErrors = [...error];
        tempErrors[names.indexOf(e.target.name)] = false;
        setErrors(tempErrors);
        setSubcategoryData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        let tempErrors = [...error];
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            tempErrors[i] = subcategoryData[name].length === 0;
        }
        setErrors(tempErrors);
        if (!tempErrors.includes(true)) {
            setAssignLoading(true);
            if (edit) {
                dispatch(updateSubcategory(subcategoryData)).then(() => {
                    setAssignLoading(false);
                });
            } else {
                dispatch(addSubcategory(subcategoryData)).then(() => {
                    setAssignLoading(false);
                });
            }
        }
    };

    return (
        <>
            {/* <center>
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        </center> */}
            {response.subcategoryLoading ? (
                <Loading/>
            ) : (
                <div>
                    <h1 className="text-center font-[800] text-[25px] uppercase mt-5">
                        Add Subcategory
                    </h1>
                    <div
                        className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
                        <div className="min-w-[250px]">
                            <div>
                                <div className="sm:w-[50%] w-full px-5 py-2 mt-2 mx-auto">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Category
                                    </label>
                                    <select
                                        name={names[0]}
                                        value={subcategoryData.category}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                                        id="grid-state"
                                    >
                                        <option hidden>Select Category</option>
                                        {categoryResponse.activeCategories.map((value) => (
                                            <option value={value.id}>{value.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="sm:w-[50%] w-full px-5 py-2 mt-2 mx-auto">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Subcategory Name
                                    </label>
                                    <input
                                        value={subcategoryData.name}
                                        type="text"
                                        name={names[1]}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                                            error[1] ? "border-red-600" : "border-gray-300"
                                        }`}
                                        placeholder="Enter Subcategory Name Here"
                                    />
                                </div>
                                <div className="sm:w-[50%] w-full px-5 py-2 mt-2 mx-auto">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Meta Title
                                    </label>
                                    <input
                                        value={subcategoryData.meta_title}
                                        type="text"
                                        name={names[2]}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                                            error[2] ? "border-red-600" : "border-gray-300"
                                        }`}
                                        placeholder="Enter Meta Title Here"
                                    />
                                </div>
                                <div className="sm:w-[50%] w-full px-5 py-2 mt-2 mx-auto">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Meta Description
                                    </label>
                                    <input
                                        value={subcategoryData.meta_description}
                                        type="text"
                                        name={names[3]}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                                            error[3] ? "border-red-600" : "border-gray-300"
                                        }`}
                                        placeholder="Enter Meta Description Here"
                                    />
                                </div>
                                <div className="sm:w-[50%] w-full px-5 py-2 mt-2 mx-auto">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Page Description
                                    </label>
                                    <textarea
                                        value={subcategoryData.page_description}
                                        rows={5}
                                        name={names[4]}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                                            error[4] ? "border-red-600" : "border-gray-300"
                                        }`}
                                        placeholder="Enter Page Description Here"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                disabled={assignLoading}
                                onClick={() => handleSubmit()}
                                className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
                            >
                                {assignLoading ? <ButtonLoading/> : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubcategoryAddEdit;
