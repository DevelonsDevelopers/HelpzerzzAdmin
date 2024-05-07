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
import {IMAGE_PATH} from "../../utils/constants";
import JoditEditor from "jodit-react";

const SuccessStoryAdd = ({edit = false}) => {
    const names = ["title", "subtitle", "description", "youtube_link"];
    const [error, setErrors] = useState([false, false, false, false]);
    const [storyData, setStoryData] = useState({
        title: "",
        subtitle: "",
        description: "",
        youtube_link: "",
        image: '',
    });
    console.log(storyData)
    const [file, setFile] = useState();
    const [assignLoading, setAssignLoading] = useState(false);

    const response = useSelector((state) => state.successStory);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    // console.log(response);
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
            // navigate("/story");
            dispatch(successListener());
        }
    }, [response.success]);

    const handleChange = (e) => {
        let tempErrors = [...error];
        tempErrors[names.indexOf(e.target.name)] = false;
        setErrors(tempErrors);
        setStoryData((data) => ({...data, [e.target.name]: e.target.value}));
    };

    const convertToBase64 = (e) => {
        const reader = new FileReader();
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                let tempErrors = [...error];
                tempErrors[4] = false;
                setErrors(tempErrors);
                setStoryData((p) => ({ ...p, image: reader.result }));
            };
        }
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
                dispatch(addStory({ file: file, story: storyData })).then(() => {
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
                        <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
                            <div className="w-[100%] mx-auto flex-wrap">
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
                            <div className="mb-3">
                                <div className="w-[100%] px-5 py-2">
                                    <label
                                        htmlFor="dropzone-file"
                                        className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                                            error[5] ? "border-red-600" : "border-gray-300"
                                        }`}
                                    >
                                        {storyData.image ? (
                                            <>
                                                {file ? (
                                                    <img
                                                        src={`${storyData.image}`}
                                                        alt=""
                                                        className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                                                    />
                                                ) : (
                                                    <img
                                                        src={`${IMAGE_PATH}${storyData.image}`}
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
                                            name={names[5]}
                                            className="hidden"
                                            onChange={(e) => convertToBase64(e)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] px-5 py-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Description
                            </label>
                            <div
                                className={`rounded-[5px] border-[1px] ${
                                    error[2] ? "border-red-600" : "border-gray-300"
                                }`}
                            >
                                <JoditEditor
                                    // ref={editor}
                                    value={storyData.description}
                                    name={names[2]}
                                    tabIndex={1}
                                    onChange={(v) =>
                                        handleChange({ target: { name: names[2], value: v } })
                                    }
                                />
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
