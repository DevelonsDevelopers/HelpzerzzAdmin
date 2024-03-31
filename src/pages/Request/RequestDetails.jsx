import React, {useEffect, useState} from 'react';
import {IoSearchSharp} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {getRequest} from "../../api/reducers/request";
import {assignContractor, getAllAssignedContractors} from "../../api/reducers/contractor";


const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 2}, {id: 3}, {id: 4},]

const RequestDetails = () => {

    const [requestData, setRequestData] = useState()

    const response = useSelector(state => state.request)
    const contractorResponse = useSelector(state => state.contractor)

    const dispatch = useDispatch()
    const location = useLocation()

    const params = new URLSearchParams(location.search)

    useEffect(() => {
        if (params.get("id")) {
            dispatch(getRequest(params.get("id")))
            dispatch(getAllAssignedContractors(params.get("id")))
        }
    }, []);

    useEffect(() => {
        if (response.request) {
            setRequestData(response.request)
        }
    }, [response.request])

    const assign = (request, contractor) => {
        dispatch(assignContractor({request, contractor}))
    }

    return (
        <>
            <div>
                <h1 className="text-center font-[800] text-[25px] uppercase mt-5">
                    Request Detail
                </h1>
                <div className="bg-white mt-[3rem] rounded-xl px-[8rem] py-16 flex flex-col mx-8">
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='border-2 rounded-xl p-6'>
                            <h1 className='text-right'>{requestData?.created_at}</h1>
                            <div className='border-2 rounded-xl p-4 my-2'>
                                <div className='flex justify-between p-2'>
                                    <h1 className='text-left w-[40%]'>Home type :</h1>
                                    <h1 className='text-right w-[60%]'>{requestData?.home_type}</h1>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <h1 className='text-left w-[40%]'>Postal Code :</h1>
                                    <h1>{requestData?.postal_code}</h1>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <h1>Status :</h1>
                                    <h1>{requestData?.status}</h1>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <h1 className='text-left w-[40%]'>Subcategory :</h1>
                                    <h1 className='text-right w-[60%]'>{requestData?.subcategory_name}</h1>
                                </div>
                            </div>
                            <div className='border-2 rounded-xl p-4 my-2'>
                                <div className='flex justify-between p-2'>
                                    <h1>Name :</h1>
                                    <h1>{requestData?.name}</h1>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <h1>Phone :</h1>
                                    <h1>{requestData?.phone}</h1>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <h1 className='text-left w-[40%]'>Email :</h1>
                                    <h1 className='text-right w-[60%]'>{requestData?.email}</h1>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <h1 className='text-left w-[40%]'>Address :</h1>
                                    <h1 className='text-right w-[60%]'>{requestData?.address}</h1>
                                </div>
                            </div>
                            <div className='border-2 rounded-xl p-4 my-2'>

                                <h1>Detail :</h1>
                                <h1 className='ml-2 mt-4'>{requestData?.details}</h1>
                            </div>
                        </div>

                        {/*Contracotrs List*/}
                        <div className='border-2 rounded-xl p-6 bg-gray-50'>
                            <div className='w-[90%] ml-auto mr-auto mb-4'>
                                <input type={"text"} className='border-2 rounded-xl w-[100%] py-2 px-10'
                                       placeholder='Search Contractor'/>
                                <IoSearchSharp className='mt-[-2rem] ml-2 text-gray-800' size={20} color='gray'/>
                            </div>
                            <div className='h-[60vh] overflow-y-auto'>
                                {contractorResponse.assignedContractors?.map((value) => (
                                    <div className='flex justify-between mt-6 bg-white rounded-xl p-4'>
                                        <div>
                                            <h1 className='text-[18px]'>{value.company_name}</h1>
                                            <h1 className='text-[13px]'>{value.address}</h1>
                                        </div>
                                        <button disabled={value.assigned !== 0}
                                            className={`bg-black text-white ml-auto mt-auto px-4 rounded-lg py-[3px] ${value.assigned !== 0 ? "cursor-not-allowed": ""}`} onClick={() => assign(params.get("id"), value.contractor)}>{value.assigned !== 0 ? "Assigned" : "Assign"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestDetails;
