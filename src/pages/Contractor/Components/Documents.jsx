import React from 'react';
import {IMAGE_PATH} from "../../../utils/constants";
import {deleteDocument} from "../../../api/reducers/contractor";
import {useDispatch} from "react-redux";

const Documents = ({ id, response }) => {

    const dispatch = useDispatch()

    return (
        <>
            <div className="max-w-[1200px]">
                {/*<button*/}
                {/*    onClick={() => setAdd(true)}*/}
                {/*    className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"*/}
                {/*>*/}
                {/*    Add Award*/}
                {/*</button>*/}
            </div>
            <div className={`flex flex-row flex-wrap gap-5 mt-6 `}>
                {response?.contractorDetails?.documents?.map((value) => (
                    <div
                        className={`flex flex-col flex-wrap text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] border-[1px] rounded-2xl bg-gray-50 w-[200px]`}
                    >
                        <div
                            className={`flex flex-col py-6 justify-center items-center`}
                        >
                            <img
                                className="w-20 h-20"
                                src={`${IMAGE_PATH}${value.file}`}
                                alt=""
                            />
                            <span className={`mt-2 font-bold px-3`}>{value.title}</span>
                        </div>
                        <button onClick={() => dispatch(deleteDocument(value.id))}
                            className={`mb-0 bg-red-700 rounded-b-2xl text-white py-2`}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Documents;
