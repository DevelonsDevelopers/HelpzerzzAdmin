import React, {useEffect, useState} from "react";
import {AiOutlineArrowRight} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {deleteRequest, getRequests} from "../../api/reducers/request";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import deleteImage from "../../components/assets/delete.png";

const RequestList = ({search}) => {
    const [open, setOpen] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [searchData, setSearchData] = useState([])
    const [data, setData] = useState([])

    const response = useSelector((state) => state.request);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // if (!response.fetched) {
        dispatch(getRequests());
        // }
    }, [dispatch]);

    useEffect(() => {
        setSearchData(response.requests)
    }, [response.requests]);

    useEffect(() => {
        if (search) {
            setData(searchData.filter(value => {
                return value.name.toLowerCase().includes(search.toLowerCase()) || value.home_type.toLowerCase().includes(search.toLowerCase()) || value.time.toLowerCase().includes(search.toLowerCase())
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
        dispatch(deleteRequest(deleteID));
    };

    const handleStatus = (id, val) => {
        // let status = 0;
        // if (val === 0) {
        //     status = 1
        // }
        // dispatch(updateCategoryStatus({id, status}))
    };

    const handleFeatured = (id, val) => {
        // let featured = 0;
        // if (val === 0) {
        //     featured = 1
        // }
        // dispatch(updateCategoryFeature({id, featured}))
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
                        <div className="flex justify-between w-[100%] m-auto">
                            <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                                Manage Service Requests
                            </h1>
                        </div>
                        <div className="overflow-auto min-w-[300px]">
                            <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                                <thead>
                                <tr className="text-sm leading-normal">
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[3%]">
                                        Customer Name
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[4%]">
                                        Home Type
                                    </th>

                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[2%]">
                                        Timeline
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%]">
                                        Status
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%]">
                                        Actions
                                    </th>
                                    <th className="py-[2%] bg-gray-50 rounded-tr-xl md:text-lg text-md w-[1%]"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((value) => (
                                    <tr className="text-[#000000] text-sm w-full">
                                        <td className="border-t-[1px] pl-[3%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                                                {value.name}
                                            </div>
                                        </td>
                                        <td className="border-t-[1px] pl-[4%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                                                {value.home_type}
                                            </div>
                                        </td>
                                        <td className="border-t-[1px] pl-[2%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                                                {value.time}
                                            </div>
                                        </td>
                                        <td className="py-[2%] w-[2%] border-t-[1px] text-center font-bold lg:text-lg md:text-md text-sm hover:scale-110">
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
                                        <td className="py-[2%] w-[2%] border-t-[1px]">
                                            <div className="flex items-center justify-center">
                                                <div
                                                    className="w-8  cursor-pointer hover:scale-125"
                                                    onClick={() => initiateDelete(value.id)}
                                                >
                                                    <img src={deleteImage} alt="Delete"/>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-[2%] w-[1%] border-t-[1px]">
                                            <div
                                                className="flex items-center justify-center text-center text-blue-700 cursor-pointer hover:scale-110"
                                                onClick={() =>
                                                    navigate("/requests/details?id=" + value.id)
                                                }
                                            >
                                                <div className="flex lg:text-lg md:text-md text-sm">
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

export default RequestList;
