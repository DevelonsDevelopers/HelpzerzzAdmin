import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    deleteBlog,
    updateBlogFeature,
    updateBlogStatus,
} from "../../api/reducers/blog";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import {IoAdd} from "react-icons/io5";
import {Android12Switch, BpCheckbox} from "../../utils/components";
import {FormControlLabel} from "@mui/material";
import {deleteCity, getCities} from "../../api/reducers/city";

import editImage from "../../components/assets/edit.png";
import deleteImage from "../../components/assets/delete.png";

const CityList = ({ search }) => {
    const [open, setOpen] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [searchData, setSearchData] = useState([])
    const [data, setData] = useState([])

    const response = useSelector((state) => state.city);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!response.fetched) {
            dispatch(getCities());
        }
    }, [dispatch]);

    useEffect(() => {
        setSearchData(response.cities)
    }, [response.cities]);

    useEffect(() => {
        if (search) {
            setData(searchData.filter(value => {
                return value.name.toLowerCase().includes(search.toLowerCase())
            }))
        } else {
            setData(searchData)
        }
    }, [search, searchData]);

    const initiateDelete = (id) => {
        setOpen(!open);
        setDeleteID(id);
    };

    const handleDelete = () => {
        dispatch(deleteCity(deleteID));
    };

    const handleStatus = (id, val) => {
        // let status = 0;
        // if (val === 0) {
        //     status = 1;
        // }
        // dispatch(updateBlogStatus({ id, status }));
    };

    return (
        <>
            {response.loading ? (
                <Loading/>
            ) : (
                <div>
                    <DeleteModal
                        open={open}
                        setOpen={setOpen}
                        deleteFunction={handleDelete}
                        deleting={response.deleting}
                    />
                    <div className="w-full flex flex-col justify-center">
                        <div className="flex justify-center w-[100%] m-auto">
                            <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                                Manage Cities
                            </h1>
                            <button
                                onClick={() => navigate("/cities/add")}
                                className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
                            >
                                Add City
                                <IoAdd className="ml-3"/>
                            </button>
                        </div>
                        <div className="overflow-auto min-w-[300px]">
                            <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                                <thead>
                                <tr className="text-sm leading-normal">
                                    <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-left text-md w-[2%] pl-[4%]">
                                        Name
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%] text-left">
                                        State
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                                        Status
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                                        Actions
                                    </th>
                                    <th className="py-[2%] bg-gray-50 rounded-tr-xl md:text-lg text-md w-[1%]"></th>
                                </tr>
                                </thead>

                                <tbody>
                                {data.map((value) => (
                                    <tr className="text-[#000000] text-sm w-[100%]">
                                        <td className="border-t-[1px] pl-[4%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center min-w-[100px]">
                                                {value?.name}
                                            </div>
                                        </td>

                                        <td className="border-t-[1px]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center min-w-[100px]">
                                                {value.state_code}
                                            </div>
                                        </td>

                                        <td
                                            onClick={() => handleStatus(value.id, value.status)}
                                            className="border-t-[1px] cursor-pointer hover:scale-105 pl-[1%]"
                                        >
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium w-[50px] mx-auto justify-center">
                                                <FormControlLabel
                                                    className={"mx-auto"}
                                                    control={
                                                        <Android12Switch
                                                            checked={value.status}
                                                            color={"success"}
                                                        />
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td className="py-[2%] w-[2%] border-t-[1px]">
                                            <div className="flex items-center justify-center">
                                                <div
                                                    className="w-8 mr-2 cursor-pointer hover:scale-125"
                                                    onClick={() =>
                                                        navigate("/cities/edit?id=" + value.id)
                                                    }
                                                >
                                                    <img src={editImage} alt="Edit"/>
                                                </div>
                                                <div
                                                    className="w-8 ml-2 cursor-pointer hover:scale-125"
                                                    onClick={() => initiateDelete(value.id)}
                                                >
                                                    <img src={deleteImage} alt="Delete"/>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-[2%] w-[1%] border-t-[1px]">
                                            <div className="flex items-center justify-center">
                                                <div className="w-6 hover:scale-125 cursor-pointer">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
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
                </div>
            )}
        </>
    );
};

export default CityList;
