import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {addSEO, getSEO, successListener, updateSEO} from "../../api/reducers/seo";
import ButtonLoading from "../../components/ButtonLoading";

const SeoAddEdit = ({edit = false}) => {

    const names = ["page_name", "route", "title", "meta_description", "meta_content"];
    const [error, setErrors] = useState([false, false, false, false, false]);
    const [assignLoading, setAssignLoading] = useState(false);

    const [seoData, setSEOData] = useState({
        page_name: "",
        route: "",
        title: "",
        meta_content: "",
        meta_description: "",
    });

    const response = useSelector((state) => state.seo);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    // useEffect(() => {
    //     if (!response.fetched) {
    //         dispatch(getSeo());
    //     }
    // }, [dispatch]);

    useEffect(() => {
        if (edit) {
            if (params.get("id")) {
                dispatch(getSEO(params.get("id")));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (edit) {
            if (response.seo) {
                setSEOData(response.seo);
            }
        }
    }, [response.seo]);

    useEffect(() => {
        if (response.success) {
            navigate("/seo");
            dispatch(successListener());
        }
    }, [response.success]);

    const handleChange = (e) => {
        let tempErrors = [...error];
        tempErrors[names.indexOf(e.target.name)] = false;
        setErrors(tempErrors);
        setSEOData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        let tempErrors = [...error];
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            tempErrors[i] = seoData[name].length === 0;
        }
        setErrors(tempErrors);
        if (!tempErrors.includes(true)) {
            setAssignLoading(true);
            if (edit) {
                dispatch(updateSEO(seoData)).then(() => {
                    setAssignLoading(false);
                });
            } else {
                dispatch(addSEO(seoData)).then(() => {
                    setAssignLoading(false);
                });
            }
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-center text-[25px] font-[800] mt-5 uppercase">
                    Add Seo tags
                </h1>
                <div
                    className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto"
                >
                    <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Page Name
                            </label>
                            <input
                                type="text"
                                name={names[0]}
                                required
                                value={seoData.page_name}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] ${
                                    error[0] ? "border-red-600" : "border-gray-300"
                                }`}
                                placeholder="Enter Page Name"
                            />
                        </div>
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Route
                            </label>
                            <input
                                type="text"
                                name={names[1]}
                                required
                                value={seoData.route}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] ${
                                    error[1] ? "border-red-600" : "border-gray-300"
                                }`}
                                placeholder="Enter Route"
                            />
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Title name
                            </label>
                            <input
                                type="text"
                                name={names[2]}
                                required
                                value={seoData.title}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] ${
                                    error[2] ? "border-red-600" : "border-gray-300"
                                }`}
                                placeholder="Enter Title Name"
                            />
                        </div>
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Meta description
                            </label>
                            <input
                                type="text"
                                name={names[3]}
                                required
                                value={seoData.meta_description}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] ${
                                    error[3] ? "border-red-600" : "border-gray-300"
                                }`}
                                placeholder="Enter Meta Desctiption"
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Meta content
                            </label>
                            <input
                                type="text"
                                name={names[4]}
                                required
                                value={seoData.meta_content}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] ${
                                    error[4] ? "border-red-600" : "border-gray-300"
                                }`}
                                placeholder="Enter Meta Content"
                            />
                        </div>

                    </div>
                    <div className="flex justify-center mt-8">
                        {assignLoading ? (
                            <button
                                className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase">
                                <ButtonLoading/>
                            </button>
                        ) : (
                            <button
                                onClick={() => handleSubmit()}
                                disabled={assignLoading}
                                className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase">Submit</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeoAddEdit
