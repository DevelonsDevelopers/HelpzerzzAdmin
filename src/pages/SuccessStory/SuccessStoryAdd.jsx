import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";
import Loading from "../../components/Loading";

import {
    addStory,
    getStory,
    successListener,
    updateStory,
} from "../../api/reducers/successStory";

const SuccessStoryAdd = ({edit = false}) => {
    const names = ["title", "subtitle", "description", "youtube_link"];
    const [error, setErrors] = useState([false, false, false, false]);
    const [storyData, setStoryData] = useState({
        title: "",
        subtitle: "",
        description: "",
        youtube_link: "",
    });
    const [assignLoading, setAssignLoading] = useState(false);

    const response = useSelector((state) => state.successStory);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    console.log(response);
    useEffect(() => {
        if (!response.fetched) {
            dispatch(getStory());
        }
    }, [dispatch]);

    useEffect(() => {
        if (edit) {
            if (params.get("id")) {
                dispatch(getStory(params.get("id")));
            }
        }
    }, []);

    useEffect(() => {
        if (edit) {
            if (response.story) {
                setStoryData(response.story);
            }
        }
    }, [response.story]);

    useEffect(() => {
        if (response.success) {
            navigate("/story");
            dispatch(successListener());
        }
    }, [response.success]);

    const handleChange = (e) => {
        let tempErrors = [...error];
        tempErrors[names.indexOf(e.target.name)] = false;
        setErrors(tempErrors);
        setStoryData((data) => ({...data, [e.target.name]: e.target.value}));
    };

    const handleSubmit = () => {
        let tempErrors = [...error];
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            tempErrors[i] = storyData[name].length === 0;
        }
        setErrors(tempErrors);
        if (!tempErrors.includes(true)) {
            setAssignLoading(true);

            if (edit) {
                dispatch(updateStory(storyData)).then(() => {
                    setAssignLoading(false);
                });
            } else {
                dispatch(addStory(storyData)).then(() => {
                    setAssignLoading(false);
                });
            }
        }
    };

    return (
        <>
            {response.storyLoading ? (
                <Loading/>
            ) : (
                <div>
                    <h1 className="text-center font-[800] text-[25px] uppercase mt-5">
                        Add Story
                    </h1>
                    <div
                        className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
                        <div className="w-[50%] mx-auto flex-wrap mt-3">
                            <div>
                                <div className="w-[100%] px-5 py-2">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Title
                                    </label>
                                    <input
                                        value={storyData.title}
                                        type="text"
                                        name={names[0]}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                                            error[0] ? "border-red-600" : "border-gray-300"
                                        }`}
                                        placeholder="Enter Story Title"
                                    />
                                </div>

                                <div className="w-[100%] px-5 py-2">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Sub-Title
                                    </label>
                                    <input
                                        value={storyData.subtitle}
                                        type="text"
                                        name={names[1]}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                                            error[0] ? "border-red-600" : "border-gray-300"
                                        }`}
                                        placeholder="Enter Story Sub-Title"
                                    />
                                </div>

                                <div className="w-[100%] px-5 py-2 mt-2">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Description
                                    </label>
                                    <input
                                        value={storyData.description}
                                        type="text"
                                        name={names[2]}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                                            error[2] ? "border-red-600" : "border-gray-300"
                                        }`}
                                        placeholder="Enter Story Description"
                                    />
                                </div>
                                <div className="w-[100%] px-5 py-2">
                                    <label className="block text-[12px] ml-3 font-medium uppercase">
                                        Youtube Link
                                    </label>
                                    <input
                                        value={storyData.youtube_link}
                                        type="text"
                                        name={names[3]}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                                            error[0] ? "border-red-600" : "border-gray-300"
                                        }`}
                                        placeholder="Enter Youtube Link"
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

export default SuccessStoryAdd;
