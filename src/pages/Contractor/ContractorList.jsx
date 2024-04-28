import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading";
import {
    deleteContractor,
    getContractors,
    updateContractorFeature,
    updateContractorStatus,
} from "../../api/reducers/contractor";
import DeleteModal from "../../components/DeleteModal";
import {FormControlLabel} from "@mui/material";
import {Android12Switch, BpCheckbox} from "../../utils/components";
import {IoAdd} from "react-icons/io5";
import {AiOutlineArrowRight} from "react-icons/ai";
import editImage from "../../components/assets/edit.png";
import deleteImage from "../../components/assets/delete.png";

const ContractorList = ({search}) => {
    const [open, setOpen] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [searchData, setSearchData] = useState([])
    const [data, setData] = useState([])

    const response = useSelector((state) => state.contractor);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // if (!response.fetched) {
        dispatch(getContractors());
        // }
    }, [dispatch]);

    useEffect(() => {
        setSearchData(response.contractors)
    }, [response.contractors]);

    useEffect(() => {
        if (search) {
            setData(searchData.filter(value => {
                return value.company_name.toLowerCase().includes(search.toLowerCase()) || value.company_address.toLowerCase().includes(search.toLowerCase()) || value.name.toLowerCase().includes(search.toLowerCase())
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
        dispatch(deleteContractor(deleteID));
    };

    const handleStatus = (id, val) => {
        let status = 0;
        if (val === 0) {
            status = 1;
        }
        dispatch(updateContractorStatus({id, status}));
    };

    const handleFeatured = (id, val) => {
        let featured = 0;
        if (val === 0) {
            featured = 1;
        }
        dispatch(updateContractorFeature({id, featured}));
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
                                Contractors
                            </h1>

                            <button
                                onClick={() => navigate("/contractors/add")}
                                className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
                            >
                                Add Contractor
                                <IoAdd className="ml-3"/>
                            </button>
                        </div>
                        <h1 className="lg:text-lg md:text-base text-sm font-[500] text-red-700">
                            (* - new contractors)
                        </h1>
                        <div className="overflow-auto min-w-[300px]">
                            <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                                <thead>
                                <tr className="text-sm leading-normal w-full">
                                    <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[2%] pl-[3%] text-left">
                                        Company
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left">
                                        Address
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%] text-left">
                                        Name
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                                        Featured
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
                                {/* {id, name, email, phone, password, address, image, featured, checked, status, company_name, company_address, postal_code}) */}

                                {data.map((value) => (
                                    <tr className="text-[#000000] text-sm w-[100%]">
                                        {/* <h1>{}</h1> */}
                                        <td
                                            className={`py-[2%] w-[3%] lg:text-lg md:text-md text-sm font-medium border-t-[1px] pl-[3%] min-w-[50px] ${
                                                value.company_name ? "" : "text-red-600"
                                            }`}
                                        >
                                            {value.company_name ? (
                                                value.checked === 0 ? (
                                                    <>
                                                        <div className="flex">
                                                            {value.company_name}
                                                            <h1 className="lg:text-xl md:text-lg text-sm font-[700] text-red-700">
                                                                *
                                                            </h1>
                                                        </div>
                                                    </>
                                                ) : (
                                                    value.company_name
                                                )
                                            ) : (
                                                "Complete Details"
                                            )}
                                        </td>
                                        <td className="border-t-[1px] ">
                                            <div
                                                className={`py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto min-w-[150px] ${
                                                    value.company_address ? "" : "text-red-600"
                                                }`}
                                            >
                                                {value.company_address
                                                    ? value.company_address
                                                    : "Complete Details"}
                                            </div>
                                        </td>
                                        <td className=" border-t-[1px]">
                                            <div
                                                className="py-[2%] lg:text-sm md:text-sm text-sm font-bold mx-auto min-w-[80px]">
                                                {value.name}
                                            </div>
                                        </td>
                                        <td
                                            onClick={() => handleFeatured(value.id, value.featured)}
                                            className={`py-[2%] w-[1%] border-t-[1px] text-[15px] font-bold cursor-pointer hover:scale-105 items-center ${
                                                value.featured === 1
                                                    ? "text-green-800"
                                                    : "text-red-700"
                                            }`}
                                        >
                                            <center>
                                                <BpCheckbox
                                                    className="mx-auto"
                                                    checked={value.featured}
                                                />
                                            </center>
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
                                                        navigate("/contractors/edit?id=" + value.id)
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
                                            <div
                                                className="flex items-center lg:text-lg md:text-md text-sm justify-center text-center text-blue-700 cursor-pointer hover:scale-110"
                                                onClick={() =>
                                                    navigate("/contractors/details?id=" + value.id)
                                                }
                                            >
                                                <div className="flex">
                                                    Details{" "}
                                                    <AiOutlineArrowRight className="ml-2 mt-1"/>
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

export default ContractorList;
