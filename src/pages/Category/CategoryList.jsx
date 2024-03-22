import React, {useEffect, useState} from 'react';
import PortalLayout from "../../layouts/PortalLayout";
import {useNavigate} from "react-router-dom";
import {deleteCategory, getCategories, updateCategoryFeature, updateCategoryStatus} from "../../api/reducers/category";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import {FaCircleCheck} from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

const CategoryList = () => {

    const [open, setOpen] = useState(false)
    const [deleteID, setDeleteID] = useState()

    const response = useSelector(state => state.category)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!response.fetched){
            dispatch(getCategories())
        }
    }, [dispatch]);

    const initiateDelete = (id) => {
        setOpen(!open)
        setDeleteID(id)
    }

    const handleDelete = () => {
        dispatch(deleteCategory(deleteID))
    }

    const handleStatus = (id, val) => {
        let status = 0;
        if (val === 0) {
            status = 1
        }
        dispatch(updateCategoryStatus({id, status}))
    }

    const handleFeatured = (id, val) => {
        let featured = 0;
        if (val === 0) {
            featured = 1
        }
        dispatch(updateCategoryFeature({id, featured}))
    }

    return (
        <PortalLayout>

            {response.loading ?
                <Loading/>
                :
            <div>
                <DeleteModal open={open} setOpen={setOpen} deleteFunction={handleDelete} deleting={response.deleting}/>
                <h1 className='text-center text-[25px] font-[800] mt-5 uppercase'>Categories</h1>
                <div className="w-full flex flex-col justify-center">
                    <div className="flex justify-center mt-[3rem] w-[90%] m-auto">
                        <input type="search" name="search" id="search" placeholder="Search Here"
                               className="border-2 border-gray-600 pl-[1rem] pr-[1rem] rounded-[1rem] py-2 w-[20rem] mr-auto focus:outline-none focus:ring-0 focus:border-gray-900 peer"/>
                        <button onClick={() => navigate('/categories/add')} className="w-[150px] bg-black cursor-pointer py-2 px-[1rem] text-white font-[600] rounded-[1.5rem] ml-auto">ADD NEW</button>
                    </div>
                    <table className="rounded-xl p-5 bg-white w-[90%] m-auto mt-6">
                        <thead>

                        <tr className="uppercase text-sm leading-normal w-full">
                            <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">ID</th>
                            <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black text-center text-[13px] w-[5%]">Name</th>
                            <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">Detail</th>
                            <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black text-center text-[13px] w-[1%]">Featured</th>
                            <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">Status</th>
                            <th className="py-[2%] border-r-[1px] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">Actions</th>
                            <th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[1%]"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {response?.categories.map((value) => (
                            <tr className="text-[#000000] text-sm w-[100%]">
                                <td className="py-[2%] w-[2%] border-r-[1px] border-t-[1px] text-center font-bold text-blue-500">{value.id}</td>
                                <td className="py-[2%] w-[5%] border-r-[1px] border-t-[1px] text-center text-[12px] font-bold">{value.name}</td>
                                <td className="py-[2%] w-[2%] border-r-[1px] border-t-[1px] text-center text-[10px] font-medium">{value.details}</td>
                                <td onClick={() => handleFeatured(value.id, value.featured)} className={`py-[2%] w-[1%] border-r-[1px] border-t-[1px] justify-center text-[15px] font-bold cursor-pointer hover:scale-125 ${value.featured === 1 ? "text-green-800" : "text-red-700"}`}>{value.featured === 1 ? <FaCircleCheck className="mx-auto"/> : <IoIosCloseCircle className="mx-auto"/>}</td>
                                <td onClick={() => handleStatus(value.id, value.status)} className="py-[2%] w-[2%] border-r-[1px] border-t-[1px] text-center text-[8px] font-bold cursor-pointer hover:scale-110"><span className={`rounded-2xl py-1 px-2 text-white ${value.status === 1 ? "bg-green-600" : "bg-red-500"}`}>{value.status === 1 ? "Enabled" : "Disabled" }</span></td>
                                <td className="py-[2%] w-[2%] border-r-[1px] border-t-[1px]">
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 mr-2 cursor-pointer hover:scale-125"  >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="blue">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                        <div className="w-4 ml-2 cursor-pointer hover:scale-125" onClick={() => initiateDelete(value.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-[2%] w-[1%] border-r-[1px] border-t-[1px]">
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 hover:scale-125 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </PortalLayout>
    );
};

export default CategoryList;
