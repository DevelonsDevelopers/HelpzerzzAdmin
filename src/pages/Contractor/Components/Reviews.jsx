import React from 'react';
import {IMAGE_PATH} from "../../../utils/constants";
import {Rating} from "@mui/material";

const Reviews = ({id, response}) => {
    return (
        <div>
            <div className={`grid grid-cols-2 gap-2 mt-6`}>
                {response?.contractorDetails?.reviews?.map((value) => (
                    <div
                        className={`flex flex-col text-center border-gray-600 border-[1px] rounded-2xl bg-gray-50`}
                    >
                        <div className={` flex flex-col py-6 justify-center items-center`}>
                            <span className={`mt-2 font-bold`}>{value.title}</span>
                            <Rating value={value.rating}/>
                            <span className={`mt-1 font-medium text-[12px]`}>{value.review}</span>
                            <div className={`grid grid-cols-5 gap-2 mt-2`}>
                                {value.images.map((img) => (
                                    <img
                                        className="w-20 h-20 rounded-xl"
                                        src={`${IMAGE_PATH}${img.image}`}
                                        alt=""
                                    />
                                ))}
                            </div>
                            {value.status === 0 ?
                                <div className={`mt-5 gap-2 text-white font-bold text-[12px]`}>
                                    <button
                                        className={`w-[100px] py-2 bg-green-700 rounded-lg mr-1 uppercase`}>Approve
                                    </button>
                                    <button className={`w-[100px] py-2 bg-red-700 rounded-lg ml-1 uppercase`}>Reject
                                    </button>
                                </div>
                                :
                                <>
                                    {value.status === 1 ?
                                        <button
                                            className={`w-[200px] py-2 bg-green-700 rounded-lg mr-1 uppercase mt-5 text-[12px] font-bold text-white cursor-not-allowed`}>Approved</button>
                                        :
                                        <button
                                            className={`w-[200px] py-2 bg-red-700 rounded-lg mr-1 uppercase mt-5 text-[12px] font-bold text-white cursor-not-allowed`}>Rejected</button>
                                    }
                                </>

                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
