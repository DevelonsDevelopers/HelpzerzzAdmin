import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCategory,
  getCategories,
  updateCategoryFeature,
  updateCategoryStatus,
} from "../../api/reducers/category";
import PortalLayout from "../../layouts/PortalLayout";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import { IoAdd } from "react-icons/io5";
import { Android12Switch, BpCheckbox } from "../../utils/components";
import { FormControlLabel } from "@mui/material";
import {
  deleteTestimonial,
  getTestimonials,
  updateTestimonialFeature,
  updateTestimonialStatus,
} from "../../api/reducers/testimonial";
import { Rating } from "@mui/material";

import editImage from "../../components/assets/edit.png";
import deleteImage from "../../components/assets/delete.png";

const TestimonialList = ({ search }) => {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);

  const response = useSelector((state) => state.testimonial);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getTestimonials());
    }
  }, [dispatch]);

  useEffect(() => {
    setSearchData(response.testimonials);
  }, [response.testimonials]);

  useEffect(() => {
    if (search) {
      setData(
        searchData.filter((value) => {
          return (
            value.name.toLowerCase().includes(search.toLowerCase()) ||
            value.email.toLowerCase().includes(search.toLowerCase())
          );
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
    dispatch(deleteTestimonial(deleteID));
  };

  const handleStatus = (id, val) => {
    let status = 0;
    if (val === 0) {
      status = 1;
    }
    dispatch(updateTestimonialStatus({ id, status }));
  };

  const handleFeatured = (id, val) => {
    let featured = 0;
    if (val === 0) {
      featured = 1;
    }
    dispatch(updateTestimonialFeature({ id, featured }));
  };

  return (
    <>
      {response.loading ? (
        <Loading />
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
            <div className="flex justify-between w-[100%] m-auto">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                Manage Testimonials
              </h1>
              <button
                onClick={() => navigate("/testimonials/add")}
                className="flex bg-[#0D14FD] cursor-pointer py-2 px-[1rem] text-white font-[500] rounded-xl ml-auto items-center justify-center hover:scale-110"
              >
                Add Testimonial
                <IoAdd className="ml-3" />
              </button>
            </div>
            <table className="rounded-xl p-5 bg-gray-50 w-[100%] m-auto mt-6">
              <thead>
                <tr className="text-sm leading-normal w-full">
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2.5%] text-left pl-[2%]">
                    Name
                  </th>
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[3%] text-left">
                    Email
                  </th>
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%] text-left">
                    Rating
                  </th>
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-center">
                    Featured
                  </th>
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-center">
                    Status
                  </th>
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-center">
                    Actions
                  </th>
                  {/* <th className="py-[2%] bg-gray-50 rounded-tr-xl text-center text-lg w-[1%]"></th> */}
                </tr>
              </thead>

              <tbody>
                {data.map((value) => (
                  <tr className="text-[#000000] text-sm w-[100%]">
                    {/*<td className="py-[2%] w-[2%] border-t-[1px] text-center font-bold text-blue-500">{value.id}</td>*/}
                    <td className="border-t-[1px] pl-[2%]">
                      <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                        {value.name}
                      </div>
                    </td>

                    <td className="border-t-[1px]">
                      <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                        {value.email}
                      </div>
                    </td>

                    <td className="border-t-[1px]">
                      <div className="py-[2%] lg:text-lg text-left md:text-md text-sm font-medium mx-auto justify-center">
                        <Rating value={value.rating} size="small" readOnly />
                      </div>
                    </td>

                    <td
                      onClick={() => handleFeatured(value.id, value.featured)}
                      className={`py-[2%] w-[1%] border-t-[1px] justify-center lg:text-lg md:text-md text-sm font-bold cursor-pointer hover:scale-105 items-center ${
                        value.featured === 1 ? "text-green-800" : "text-red-700"
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
                      <div className="py-[1%] lg:text-lg md:text-md text-sm font-medium w-[50px] mx-auto justify-center">
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
                            navigate("/testimonials/edit?id=" + value.id)
                          }
                        >
                          <img src={editImage} alt="Edit" />
                        </div>
                        <div
                          className="w-8 ml-2 cursor-pointer hover:scale-125"
                          onClick={() => initiateDelete(value.id)}
                        >
                          <img src={deleteImage} alt="Delete" />
                        </div>
                      </div>
                    </td>
                    {/* <td className="py-[2%] w-[1%] border-t-[1px]">
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
                    </td> */}
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

export default TestimonialList;
