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
import {Button, FormControlLabel} from "@mui/material";
import {Android12Switch, BpCheckbox} from "../../utils/components";
import {IoAdd} from "react-icons/io5";
import {AiOutlineArrowRight} from "react-icons/ai";
import editImage from "../../components/assets/edit.png";
import deleteImage from "../../components/assets/delete.png";
import moment from "moment";
import {getCityCategory} from "../../api/reducers/seo";

const CityCategory = ({search}) => {
    const [open, setOpen] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [searchData, setSearchData] = useState([]);
    const [data, setData] = useState([]);

    const response = useSelector((state) => state.seo);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // if (!response.fetched) {
        dispatch(getCityCategory());
        // }
    }, [dispatch]);

    useEffect(() => {
        setSearchData(response.cityCategory);
    }, [response.cityCategory]);

    useEffect(() => {
        if (search) {
            setData(
                searchData.filter((value) => {
                    return (
                        value.city_name.toLowerCase().includes(search.toLowerCase())
                    );
                })
            );
        } else {
            setData(searchData);
        }
    }, [search, searchData]);

    return (
        <>
            {response.loading ? (
                <Loading/>
            ) : (
                <div>
                    <div className="w-full flex flex-col justify-center">
                        <div className="flex justify-center w-[100%] m-auto">
                            <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                                City + Category SEO
                            </h1>
                        </div>
                        {/* <h1 className="lg:text-lg md:text-base text-sm font-[500] text-red-700">
                            (* - new contractors)
                        </h1> */}
                        <div className="overflow-auto min-w-[300px]">
                            <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                                <thead>
                                <tr className="text-sm leading-normal w-full">
                                    <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[2%] pl-[3%] text-left">
                                        City Name
                                    </th>
                                    <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[2%] text-left">
                                        Category Name
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
                                    <tr
                                        className={`text-[#000000] text-sm w-[100%]`}
                                    >
                                        <td className=" border-t-[1px] pl-[3%]">
                                            <div
                                                className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto min-w-[80px]">
                                                {value.city_name}
                                            </div>
                                        </td>
                                        <td
                                            className={`py-[2%] w-[3%] lg:text-lg md:text-md text-sm font-medium border-t-[1px]  min-w-[50px]`}
                                        >
                                            {value.category_name}
                                        </td>
                                        <td className="py-[2%] w-[1%] border-t-[1px]">
                                            <div className="flex items-center lg:text-lg md:text-md text-sm justify-center text-center text-blue-700 cursor-pointer hover:scale-110">
                                                {value.SEO === 0 ? <button
                                                    className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
                                                >
                                                    SET SEO
                                                </button> : "Edit SEO"}
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

export default CityCategory;
