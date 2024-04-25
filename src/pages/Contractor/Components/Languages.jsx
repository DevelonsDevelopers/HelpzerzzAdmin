import React, {useEffect} from "react";
import Loading from "../../../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getLanguages} from "../../../api/reducers/language";
import {assignArea, assignLanguage, unAssignLanguage} from "../../../api/reducers/contractor";

const Languages = ({id, response}) => {
    const dispatch = useDispatch();

    const Assign = (language) => {
        dispatch(assignLanguage({contractor: id, language: language}));
    };

    const UnAssign = (id) => {
        dispatch(unAssignLanguage(id));
    };

    return (
        <>
            <div>
                <div className="w-full flex flex-col justify-center">
                    <div className={`flex flex-row flex-wrap gap-5 mt-6 `}>
                        {response?.contractorDetails?.languages?.map((value) => (
                            <div
                                className={`flex flex-col flex-wrap text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] border-[1px] rounded-2xl bg-gray-50 w-[200px] p-5`}
                            >
                                <div
                                    className="py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center min-w-[50px] min-h-[50px]">
                                    {value?.language}
                                </div>
                                <div
                                    className="py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center min-w-[50px]">
                                    {value.assigned === 0 ? (
                                        <button
                                            className={`rounded-md bg-black px-10 py-1 text-white`}
                                            onClick={() => Assign(value.id)}
                                        >
                                            Assign
                                        </button>
                                    ) : (
                                        <button onClick={() => UnAssign(value.assigned)}
                                            className={`rounded-md bg-[#12947c] px-10 py-1 text-white`}
                                        >
                                            Assigned
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Languages;
