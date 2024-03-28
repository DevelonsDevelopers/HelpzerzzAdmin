import React, {useEffect, useState} from 'react';
import PortalLayout from "../../layouts/PortalLayout";
import {AiOutlineArrowRight} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getRequests} from "../../api/reducers/request";
import Loading from "../../components/Loading";
import {Android12Switch} from "../../utils/components";
import {FormControlLabel} from "@mui/material";

const RequestList = () => {

    const [open, setOpen] = useState(false)
    const [deleteID, setDeleteID] = useState()

    const response = useSelector(state => state.request)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!response.fetched) {
            dispatch(getRequests())
        }
    }, [dispatch]);

    const initiateDelete = (id) => {
        setOpen(!open)
        setDeleteID(id)
    }

    const handleDelete = () => {
        // dispatch(deleteCategory(deleteID))
    }

    const handleStatus = (id, val) => {
        // let status = 0;
        // if (val === 0) {
        //     status = 1
        // }
        // dispatch(updateCategoryStatus({id, status}))
    }

    const handleFeatured = (id, val) => {
        // let featured = 0;
        // if (val === 0) {
        //     featured = 1
        // }
        // dispatch(updateCategoryFeature({id, featured}))
    }

    return (
        <>
            {response.loading ?
                <Loading/>
                :
            <div>
                <div className="w-full flex flex-col justify-center">
                    <div className="flex justify-between w-[100%] m-auto">
                        <h1 className='text-3xl font-[700]'>Manage Service Requests</h1>
                    </div>
                    <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                        <thead>

                        <tr className="text-sm leading-normal w-full">
                            <th className="py-[2%] bg-gray-50 rounded-tl-xl text-center text-lg w-[2%]">Customer
                                Name
                            </th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[3%]">Home
                                Type
                            </th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">Timeline</th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">Status</th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">Actions</th>
                            <th className="py-[2%] bg-gray-50 rounded-tr-xl text-center text-lg w-[1%]"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {response.requests.map(value => (
                            <tr className="text-[#000000] text-sm w-[100%]">
                                <td className="py-[2%] w-[2%] border-t-[1px] text-center text-md font-bold">{value.name}</td>
                                <td className="py-[2%] w-[3%] border-t-[1px] text-center text-md font-medium">{value.home_type}</td>
                                <td className="py-[2%] w-[2%] border-t-[1px] text-center text-md font-medium">{value.time}</td>
                                <td className='py-[2%] w-[2%] border-t-[1px] text-center font-bold text-md cursor-pointer hover:scale-110'>
                                    <FormControlLabel control={<Android12Switch className={"ml-5"} checked={value.status}/>} label=''/>
                                </td>
                                <td className="py-[2%] w-[2%] border-t-[1px]">
                                    <div className="flex items-center justify-center">
                                        <div className="w-4  cursor-pointer hover:scale-125">
                                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="red">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-[2%] w-[1%] border-t-[1px]">
                                    <div
                                        className="flex items-center justify-center text-center text-blue-700 cursor-pointer hover:scale-110">
                                        <div className="flex">Details <AiOutlineArrowRight className="ml-2 mt-1"/></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </>
    );
};

export default RequestList;