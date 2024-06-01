import React, {useEffect, useState} from "react";
import deleteImage from "../../components/assets/delete.png";
import editImage from "../../components/assets/edit.png";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteSEO, getAllSEO} from "../../api/reducers/seo";
import {IoAdd} from "react-icons/io5";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";

const SeoList = ({search}) => {
    const [open, setOpen] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [searchData, setSearchData] = useState([])
    const [data, setData] = useState([])

    const response = useSelector((state) => state.seo);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSEO())
    }, [dispatch])

    useEffect(() => {
        setSearchData(response.allSEO)
    }, [response.allSEO]);

    useEffect(() => {
        if (search) {
            setData(searchData.filter(value => {
                return value.page_name.toLowerCase().includes(search.toLowerCase())
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
        dispatch(deleteSEO(deleteID));
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
                                Manage SEO
                            </h1>

                            <button
                                onClick={() => navigate("/seo/add")}
                                className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
                            >
                                Add SEO
                                <IoAdd className="ml-3"/>
                            </button>
                        </div>
                        <div className="overflow-auto min-w-[300px]">
                            <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                                <thead>
                                <tr className="text-sm leading-normal">
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[2%]">
                                        ID
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                                        Page
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                                        Route
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                                        Title
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                                        Description
                                    </th>
                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                                        Meta Content
                                    </th>

                                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {response.allSEO.map((value) => (
                                    <tr className="text-[#000000] text-sm w-full">
                                        <td className="border-t-[1px] pl-[2%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                                                {value.id}
                                            </div>
                                        </td>

                                        <td className="border-t-[1px] pl-[1%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                                                {value.page_name}
                                            </div>
                                        </td>
                                        <td className="border-t-[1px] pl-[1%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                                                {value.route}
                                            </div>
                                        </td>
                                        <td className="border-t-[1px] pl-[1%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                                                {value.title}
                                            </div>
                                        </td>

                                        <td className="border-t-[1px] pl-[1%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                                                {value.meta_description}
                                            </div>
                                        </td>

                                        <td className="border-t-[1px] pl-[1%]">
                                            <div
                                                className="lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center line-clamp-2 text-ellipsis">
                                                {value.meta_content}
                                            </div>
                                        </td>

                                        <td className="py-[2%] w-[1%] border-t-[1px]">
                                            <div className="flex items-center justify-center">
                                                <div
                                                    className="w-8 mr-2 cursor-pointer hover:scale-125"
                                                    onClick={() => navigate("/seo/edit?id=" + value.id)}
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

export default SeoList;
