import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {
    addCategory,
    getCategory,
    successListener,
    updateCategory,
} from "../../api/reducers/category";
import Loading from "../../components/Loading";
import {IMAGE_PATH} from "../../utils/constants";
import ButtonLoading from "../../components/ButtonLoading";

const CategoryAddEdit = ({edit = false}) => {
    const names = ["name", "details", "image", "meta_title", "meta_description", "page_description"];
    const [assignLoading, setAssignLoading] = useState(false);
    const [errors, setErrors] = useState([false, false, false, false, false, false]);
    const [categoryData, setCategoryData] = useState({
        name: "",
        details: "",
        image: "",
        tag: "",
        meta_title: "",
        meta_description: "",
        page_description: ""
    });
    const [file, setFile] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const response = useSelector((state) => state.category);
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        if (!response.fetched) {
            dispatch(getCategory());
        }
    }, [dispatch]);

    useEffect(() => {
        if (edit) {
            if (params.get("id")) {
                dispatch(getCategory(params.get("id")));
            }
        }
    }, []);

    useEffect(() => {
        if (edit) {
            if (response.category) {
                setCategoryData(response.category);
            }
        }
    }, [response.category]);

    useEffect(() => {
        if (response.success) {
            navigate("/categories");
            dispatch(successListener());
        }
    }, [response.success]);

    useEffect(() => {
        setCategoryData((data) => ({
            ...data,
            tag: categoryData.name.replaceAll(" ", "-").toLowerCase(),
        }));
    }, [categoryData.name]);

    const handleChange = (e) => {
        let tempErrors = [...errors];
        tempErrors[names.indexOf(e.target.name)] = false;
        setErrors(tempErrors);
        setCategoryData((data) => ({...data, [e.target.name]: e.target.value}));
    };

    const convertToBase64 = (e) => {
        const reader = new FileReader();
        if (e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                let tempErrors = [...errors];
                tempErrors[2] = false;
                setErrors(tempErrors);
                setFile(e.target.files[0]);
                setCategoryData((data) => ({...data, image: reader.result}));
            };
        }
    };
    const handleSubmit = () => {
        let tempErrors = [...errors];
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            tempErrors[i] = categoryData[name].length === 0;
        }
        setErrors(tempErrors);
        if (!tempErrors.includes(true)) {
            setAssignLoading(true);
            if (edit) {
                dispatch(updateCategory({file: file, category: categoryData})).then(
                    () => {
                        setAssignLoading(false);
                    }
                );
            } else {
                dispatch(addCategory({file: file, category: categoryData})).then(
                    () => {
                        setAssignLoading(false);
                    }
                );
            }
        }
    };
    console.log(response);

    return (
        <>
            {response.categoryLoading ? (
                <Loading/>
            ) : (
                <div>
                    <h1 className="text-center text-[25px] font-[800] mt-5 uppercase">
                        {edit ? "edit category" : "add category"}
                    </h1>
                    <div
                        className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-2 flex-wrap">
                            <div className="min-w-[250px]">
                                <div className="w-[100%] px-5 py-2">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Name
                                    </label>
                                    <input
                                        value={categoryData.name}
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                        name={names[0]}
                                        placeholder="Enter Your Name"
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                                            errors[0] ? "border-red-600" : "border-gray-300"
                                        }`}
                                    />
                                </div>
                                <div className="w-[100%] px-5 py-2">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Details
                                    </label>
                                    <textarea
                                        value={categoryData.details}
                                        onChange={(e) => handleChange(e)}
                                        name={names[1]}
                                        minLength="30"
                                        maxLength="500"
                                        rows="7"
                                        placeholder="Enter details here"
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                                            errors[1] ? "border-red-600" : "border-gray-300"
                                        }`}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="min-w-[250px] w-[100%] ">
                                    <label
                                        htmlFor="dropzone-file"
                                        className={`flex flex-col items-center justify-center w-full h-60 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-[2.0rem] ${
                                            errors[2] ? "border-red-600" : "border-gray-300"
                                        }`}
                                    >
                                        {categoryData.image ? (
                                            <>
                                                {file ? (
                                                    <img
                                                        src={`${categoryData.image}`}
                                                        alt=""
                                                        className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                                                    />
                                                ) : (
                                                    <img
                                                        src={`${IMAGE_PATH}${categoryData.image}`}
                                                        alt=""
                                                        className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500 "
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 ">
                                                    <span className="font-semibold">Click to upload</span>{" "}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 ">
                                                    SVG, PNG, JPG or GIF
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="dropzone-file"
                                            accept="image/*"

                                            name={names[2]}
                                            className="hidden"
                                            onChange={convertToBase64}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="w-[100%] px-5 py-2">
                                <label className="block text-[12px] ml-3 font-medium uppercase">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    name={names[3]}
                                    placeholder="Enter Meta Title"
                                    value={categoryData.meta_title}
                                    onChange={(e) => handleChange(e)}
                                    className={
                                        "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
                                    }
                                />
                            </div>

                            <div className="w-[100%] px-5 py-2">
                                <label className="block text-[12px] ml-3 font-medium uppercase">
                                    Meta Description
                                </label>
                                <input
                                    type="text"
                                    name={names[4]}
                                    placeholder="Enter Meta Description"
                                    value={categoryData.meta_description}
                                    onChange={(e) => handleChange(e)}
                                    className={
                                        "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-[100%] px-5 py-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Page Description
                            </label>
                            <textarea
                                name={names[5]}
                                placeholder="Enter Page Description"
                                rows={5}
                                value={categoryData.page_description}
                                onChange={(e) => handleChange(e)}
                                className={
                                    "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
                                }
                            />
                        </div>

                        <div className="flex justify-center mt-12">
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

export default CategoryAddEdit;
