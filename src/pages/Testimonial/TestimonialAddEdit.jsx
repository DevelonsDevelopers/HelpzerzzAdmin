import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {addTestimonial, getTestimonial, successListener, updateTestimonial} from "../../api/reducers/testimonial";

const TestimonialAddEdit = ({ edit = false }) => {
    const names = ["name", "email", "location", "rating","review"];
    const [error, setErrors] = useState([false, false, false, false, false]);
    const [testimonialData, setTestimonialData] = useState({
        name: "",
        email: "",
        location: "",
        review: "",
        rating: "",
    });

    const response = useSelector((state) => state.testimonial);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    useEffect(() => {
        if (edit) {
            if (params.get("id")) {
                dispatch(getTestimonial(params.get("id")));
            }
        }
    }, []);

    useEffect(() => {
        if (edit) {
            if (response.testimonial) {
                setTestimonialData(response.testimonial);
            }
        }
    }, [response.testimonial]);

    useEffect(() => {
        if (response.success) {
            navigate("/testimonials");
            dispatch(successListener());
        }
    }, [response.success]);

    const handleChange = (e) => {
        let tempErrors = [...error];
        tempErrors[names.indexOf(e.target.name)] = false;
        setErrors(tempErrors);
        setTestimonialData((data) => ({ ...data, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        let tempErrors = [...error];
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            tempErrors[i] = testimonialData[name].length === 0;
        }
        setErrors(tempErrors);
        if (!tempErrors.includes(true)) {
            if (edit) {
                dispatch(updateTestimonial(testimonialData));
            } else {
                dispatch(addTestimonial(testimonialData));
            }
        }
    };

    return (
        <>
            <div>
                <h1 className="text-center text-[25px] font-[800] mt-5 uppercase">{edit ? "Edit Testimonial" : "Add Testimonial"}</h1>
                <div className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
                    <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Name
                            </label>
                            <input
                                type="text"
                                name={names[0]}
                                value={testimonialData.name}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                                placeholder="Enter Name Here"
                            />
                        </div>
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Email
                            </label>
                            <input
                                type="email"
                                name={names[1]}
                                value={testimonialData.email}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                                placeholder="Enter Email Here"
                            />
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Location
                            </label>
                            <input
                                type="email"
                                name={names[2]}
                                value={testimonialData.location}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                                placeholder="Enter Location Here"
                            />
                        </div>
                        <div className="w-[100%] px-5 py-2 mt-2">
                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                Rating
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                name={names[3]}
                                value={testimonialData.rating}
                                onChange={(e) => handleChange(e)}
                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                                placeholder="Enter Rating Here"
                            />
                        </div>
                    </div>
                    <div className="w-[100%] px-5 py-2 mt-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            Review
                        </label>
                        <textarea
                            rows={3}
                            name={names[4]}
                            value={testimonialData.review}
                            onChange={(e) => handleChange(e)}
                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                            placeholder="Enter Review Here"
                        />
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                            className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestimonialAddEdit;
