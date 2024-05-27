import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import PortalLayout from "../../layouts/PortalLayout";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import {IoAdd} from "react-icons/io5";
import {Android12Switch, BpCheckbox} from "../../utils/components";
import {FormControlLabel} from "@mui/material";
import {
    deleteSubcategory,
    getSubcategories,
    updateSubcategoryStatus,
} from "../../api/reducers/subcategory";

import editImage from "../../components/assets/edit.png";
import deleteImage from "../../components/assets/delete.png";

const SubcategoryList = ({search}) => {
    const [open, setOpen] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [searchData, setSearchData] = useState([])
    const [data, setData] = useState([])

    const response = useSelector((state) => state.subcategory);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!response.fetched) {
            dispatch(getSubcategories());
        }
    }, [dispatch]);

    useEffect(() => {
        setSearchData(response.subcategories)
    }, [response.subcategories]);

    useEffect(() => {
        if (search) {
            setData(searchData.filter(value => {
                return value.name.toLowerCase().includes(search.toLowerCase()) || value.category_name.toLowerCase().includes(search.toLowerCase())
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
        dispatch(deleteSubcategory(deleteID));
    };

    const handleStatus = (id, val) => {
        let status = 0;
        if (val === 0) {
            status = 1;
        }
        dispatch(updateSubcategoryStatus({id, status}));
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
                    {/*<h1 className='text-center text-[25px] font-[800] mt-5 uppercase'>Categories</h1>*/}
                    <div className="w-full flex flex-col justify-center">
                        <div className="flex justify-center w-[100%] m-auto">
                            <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                                Manage Subcategories
                            </h1>
                            <button
                                onClick={() => navigate("/subcategories/add")}
                                className="flex bg-[#0D14FD] cursor-pointer py-2 px-[1rem] text-white font-[500] rounded-xl ml-auto items-center justify-center hover:scale-110"
                            >
                                Add Subcategory
                                <IoAdd className="ml-3"/>
                            </button>
                        </div>
                        <div className="overflow-auto min-w-[300px]">
                            <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                                <thead>
                                <tr className="text-sm leading-normal w-full">
                                    {/*<th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">ID</th>*/}
                                    <th className="py-[2%] bg-gray-50 rounded-tl-xl  md:text-lg text-md w-[2%]">
                                        ID
                                    </th>
                                    <th className="py-[2%] bg-gray-50 text-left md:text-lg text-md w-[2%]">
                                        Name
                                    </th>
                                    <th className="py-[2%] bg-gray-50 text-left md:text-lg text-md w-[2%]">
                                        Category
                                    </th>
                                    <th className="py-[2%] bg-gray-50  md:text-lg text-md w-[2%]">
                                        Status
                                    </th>
                                    <th className="py-[2%] bg-gray-50  md:text-lg text-md w-[2%]">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((value) => (
                                    <tr className="text-[#000000] text-sm w-[100%]">
                                        {/*<td className="py-[2%] w-[2%] border-t-[1px] text-center font-bold text-blue-500">{value.id}</td>*/}
                                        <td className="border-t-[1px]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm w-[10px] font-medium mx-auto lg:pl-0 pl-[10%] justify-center">
                                                {value.id}
                                            </div>
                                        </td>
                                        <td className="border-t-[1px]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                                                {value.name}
                                            </div>
                                        </td>
                                        <td className="border-t-[1px]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                                                {value.category_name}
                                            </div>
                                        </td>

                                        <td
                                            onClick={() => handleStatus(value.id, value.status)}
                                            className="border-t-[1px]"
                                        >
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium w-[30px] cursor-pointer hover:scale-105 mx-auto justify-center">
                                                <FormControlLabel
                                                    className={"mx-auto"}
                                                    control={<Android12Switch checked={value.status}/>}
                                                />
                                            </div>
                                        </td>

                                        <td className="py-[2%] w-[2%] border-t-[1px]">
                                            <div className="flex items-center justify-center">
                                                <div
                                                    className="w-8 mr-2 cursor-pointer hover:scale-125"
                                                    onClick={() =>
                                                        navigate("/subcategories/edit?id=" + value.id)
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

export default SubcategoryList;
