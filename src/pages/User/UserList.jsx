import React, {useEffect, useState} from 'react';
import PortalLayout from "../../layouts/PortalLayout";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../api/reducers/user";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import {FormControlLabel} from "@mui/material";
import {Android12Switch} from "../../utils/components";
import {updateCategoryStatus} from "../../api/reducers/category";
import {IoAdd} from "react-icons/io5";

const UserList = () => {

    const [open, setOpen] = useState(false)
    const [deleteID, setDeleteID] = useState()

    const response = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!response.fetched) {
            dispatch(getUsers())
        }
    }, [dispatch]);

    // const initiateDelete = (id) => {
    //     setOpen(!open)
    //     setDeleteID(id)
    // }
    //
    // const handleDelete = () => {
    //     dispatch(deleteUser(deleteID))
    // }
    //
    // const handleStatus = (id, status) => {
    //     dispatch(statusUser({id, status}))
    // }
    const handleStatus = (id, val) => {
        let status = 0;
        if (val === 0) {
            status = 1
        }
        dispatch(updateCategoryStatus({id, status}))
    }

    return (
        <>

            {response.loading ?
                <Loading/>
                :
            <div>
                {/*<DeleteModal open={open} setOpen={setOpen} deleteFunction={handleDelete} deleting={response.deleting}/>*/}
                <div className="w-full flex flex-col justify-center">
                    <div className="flex justify-center w-[90%] m-auto">
                        <h1 className='text-[25px] font-[700] uppercase'>Users</h1>
                        <button onClick={() => navigate('/users/add')} className="flex w-[220px] bg-[#0D14FD] cursor-pointer py-2 px-[1rem] text-white font-[500] rounded-xl ml-auto items-center justify-center hover:scale-110">Add User<IoAdd className="ml-3"/></button>
                    </div>
                    <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6">
                        {/*<thead>*/}
                        {/*<tr className="uppercase text-sm leading-normal w-full">*/}
                        {/*    <th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">ID</th>*/}
                        {/*    <th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[5%]">Name</th>*/}
                        {/*    <th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">Username</th>*/}
                        {/*    <th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">Email</th>*/}
                        {/*    <th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">Status</th>*/}
                        {/*    <th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">Actions</th>*/}
                        {/*    <th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[1%]"></th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}

                        <thead>

                        <tr className="text-sm leading-normal w-full">
                            <th className="py-[2%] bg-gray-50 rounded-tl-xl text-center text-lg w-[2%]">ID
                            </th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[3%]">Name
                            </th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">Username</th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">Email</th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">Status</th>
                            <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">Actions</th>
                            <th className="py-[2%] bg-gray-50 rounded-tr-xl text-center text-lg w-[1%]"></th>
                        </tr>
                        </thead>


                        <tbody>
                        {response?.users?.map((value) => (
                            <tr className="text-[#000000] text-sm w-[100%]">
                                <td className="py-[2%] w-[2%] border-t-[1px] text-center font-bold text-blue-500">1</td>
                                <td className="py-[2%] w-[5%] border-t-[1px] text-center text-[12px] font-bold">Admin</td>
                                <td className="py-[2%] w-[2%] border-t-[1px] text-center text-[13px] font-medium">admin</td>
                                <td className="py-[2%] w-[2%] border-t-[1px] text-center text-[12px] font-medium">admin@email.com</td>
                                <td onClick={() => handleStatus(value.id, value.status)} className="py-[2%] w-[1%] border-t-[1px] text-center text-[8px] font-bold cursor-pointer hover:scale-105 items-center justify-center"><FormControlLabel className={"mx-auto"} control={<Android12Switch checked={value.status} color={"success"}/>}/></td>
                                <td className="py-[2%] w-[2%] border-t-[1px]">
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 mr-2 cursor-pointer hover:scale-125">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="blue">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                            </svg>
                                        </div>
                                        <div className="w-4 ml-2 cursor-pointer hover:scale-125">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="red">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-[2%] w-[1%] border-t-[1px]">
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 hover:scale-125 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
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
        </>
    );
};

export default UserList;
