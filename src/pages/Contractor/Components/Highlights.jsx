import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getHighlights} from "../../../api/reducers/highlight";
import Loading from "../../../components/Loading";

const Highlights = ({ id, response }) => {

    return (
        <>
            <div>
                <div className="w-full flex flex-col justify-center">
                    <div className={`grid grid-cols-3 gap-2`}>
                        {response?.contractorDetails?.highlights?.map((value) => (
                            <div className="border-gray-600 border-[1px] rounded-lg text-[#000000] text-sm w-[100%]">
                                <div
                                    className="py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center min-w-[50px]">
                                    {value?.highlight}
                                </div>
                                <div
                                    className="py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center min-w-[50px]">
                                    {value.assigned === 0 ?
                                        <button className={`rounded-md bg-black px-10 py-1 text-white`}>Assign</button>
                                        :
                                        <button className={`rounded-md bg-green-800 px-10 py-1 text-white`}>Assigned</button>
                                    }
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Highlights;
