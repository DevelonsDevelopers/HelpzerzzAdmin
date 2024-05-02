import React, {useEffect, useState} from "react";
import deleteImage from "../../components/assets/delete.png";
import {AiOutlineArrowRight} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteContractorRequest, getContractorRequest} from "../../api/reducers/contractorRequest";
import DeleteModal from "../../components/DeleteModal";
import Loading from "../../components/Loading";
import moment from "moment";

const ContractorRequestList = ({search}) => {
    const [open, setOpen] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [searchData, setSearchData] = useState([]);
    const [data, setData] = useState([]);

    const response = useSelector((state) => state.contractorRequest);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContractorRequest());
    }, [dispatch]);

    useEffect(() => {
        setSearchData(response.contractorRequests);
    }, [response.contractorRequests]);

    useEffect(() => {
        if (search) {
            setData(
                searchData.filter((value) => {
                    return value.message.toLowerCase().includes(search.toLowerCase());
                })
            );
        } else {
            setData(searchData);
        }
    }, [search, searchData]);

    const initiateDelete = (id) => {
        setOpen(!open);
        setDeleteID(id);
    };

    const handleDelete = () => {
        dispatch(deleteContractorRequest(deleteID));
    };

    return (
        <>
            {response.loading ? (
                <Loading/>
            ) : (
                <div className="w-full flex flex-col justify-center">
                    <DeleteModal
                        open={open}
                        setOpen={setOpen}
                        deleteFunction={handleDelete}
                        deleting={response.deleting}
                    />
                    <div className="flex justify-between w-[100%] m-auto">
                        <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                            Manage Contractor Requests
                        </h1>
                    </div>
                    <div className="overflow-auto min-w-[300px]">
                        <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                            <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[2%]">
                                    Date
                                </th>
                                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[3%] text-left pl-[1%]">
                                    Customer Name
                                </th>
                                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%]">
                                    Message
                                </th>
                                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[1%]">
                                    Status
                                </th>
                                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[1%]">
                                    Actions
                                </th>
                                <th className="py-[1.5%] bg-gray-50 rounded-tr-xl md:text-lg text-md w-[1%]"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((value, index) => (
                                <tr key={index} className="text-[#000000] text-sm w-full">
                                    <td className="border-t-[1px] pl-[2%]">
                                        <div
                                            className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                                            {moment(value.created_date).format("ll")}
                                        </div>
                                    </td>
                                    <td className="border-t-[1px] pl-[3%]">
                                        <div
                                            className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                                            {value.contractor}
                                        </div>
                                    </td>
                                    <td className="border-t-[1px] pl-[2%]">
                                        <div
                                            className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                                            {value.message}
                                        </div>
                                    </td>
                                    <td className="py-[1.5%] border-t-[1px] text-center font-bold lg:text-lg md:text-md text-sm hover:scale-110">
                                        <p
                                            className={`w-[100px] mx-auto rounded-2xl py-1 px-2 text-white ${
                                                value.status === 1
                                                    ? "bg-[#16dbcc]"
                                                    : value.status === 2
                                                        ? "bg-red-700"
                                                        : "bg-gray-500"
                                            }`}
                                        >
                                            {value.status === 1
                                                ? "Active"
                                                : value.status === 2
                                                    ? "Rejected"
                                                    : "Pending"}
                                        </p>
                                    </td>
                                    <td className="py-[1.5%] border-t-[1px]">
                                        <div className="flex items-center justify-center">
                                            <div
                                                className="w-8  cursor-pointer hover:scale-125"
                                                onClick={() => initiateDelete(value.id)
                                                }
                                            >
                                                <img src={deleteImage} alt="Delete"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-[1.5%] border-t-[1px]">
                                        <div
                                            className="flex items-center justify-center text-center text-blue-700 cursor-pointer hover:scale-110"
                                            onClick={() => {
                                            }}
                                        >
                                            <div
                                                className="flex lg:text-lg md:text-md text-sm"
                                                onClick={() =>
                                                    navigate("/contractorRequest/details?id=" + value.id)
                                                }
                                            >
                                                Details <AiOutlineArrowRight className="ml-2 mt-1"/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContractorRequestList;
