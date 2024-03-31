import React, { useEffect, useState } from "react";
import PortalLayout from "../../layouts/PortalLayout";
import { useNavigate } from "react-router-dom";
import {
  deleteCategory,
  getCategories,
  updateCategoryFeature,
  updateCategoryStatus,
} from "../../api/reducers/category";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import { IoAdd } from "react-icons/io5";
import { Checkbox, FormControlLabel, styled, Switch } from "@mui/material";
import { Android12Switch, BpCheckbox } from "../../utils/components";

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();

  const response = useSelector((state) => state.category);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getCategories());
    }
  }, [dispatch]);

  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleDelete = () => {
    dispatch(deleteCategory(deleteID));
  };

  const handleStatus = (id, val) => {
    let status = 0;
    if (val === 0) {
      status = 1;
    }
    dispatch(updateCategoryStatus({ id, status }));
  };

  const handleFeatured = (id, val) => {
    let featured = 0;
    if (val === 0) {
      featured = 1;
    }
    dispatch(updateCategoryFeature({ id, featured }));
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
            <div className="flex justify-center w-[100%] m-auto">
              <h1 className="text-[25px] font-[700]">Manage Categories</h1>
              <button
                onClick={() => navigate("/categories/add")}
                className="flex w-[220px] bg-[#0D14FD] cursor-pointer py-2 px-[1rem] text-white font-[500] rounded-xl ml-auto items-center justify-center hover:scale-110"
              >
                Add Category
                <IoAdd className="ml-3" />
              </button>
            </div>
            <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
              <thead>
                <tr className="text-sm leading-normal w-full">
                  {/*<th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">ID</th>*/}
                  <th className="py-[2%] bg-gray-50 rounded-tl-xl text-center text-lg w-[5%]">
                    Name
                  </th>
                  <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">
                    Detail
                  </th>
                  <th className="py-[2%] bg-gray-50 text-center text-lg w-[1%]">
                    Featured
                  </th>
                  <th className="py-[2%] bg-gray-50 text-center text-lg w-[1%]">
                    Status
                  </th>
                  <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">
                    Actions
                  </th>
                  <th className="py-[2%] bg-gray-50 text-center text-lg w-[1%]">
                    Popular
                  </th>
                </tr>
              </thead>
              <tbody>
                {response?.categories.map((value) => (
                  <tr className="text-[#000000] text-sm w-[100%]">
                    {/*<td className="py-[2%] w-[2%] border-t-[1px] text-center font-bold text-blue-500">{value.id}</td>*/}
                    <td className="border-t-[1px]">
                      <div className="py-[2%] text-md font-medium w-[140px] mx-auto justify-center">
                        {value.name}
                      </div>
                    </td>
                    <td className="border-t-[1px]">
                      <div className="py-[2%] text-md font-medium w-[200px] mx-auto justify-center">
                        {value.details}
                      </div>
                    </td>
                    <td
                      onClick={() => handleFeatured(value.id, value.featured)}
                      className={`py-[2%] w-[1%] border-t-[1px] justify-center text-md font-bold cursor-pointer hover:scale-105 items-center ${
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
                      className="py-[2%] w-[1%] border-t-[1px] text-center text-md font-bold cursor-pointer hover:scale-105 items-center justify-center"
                    >
                      <FormControlLabel
                        className={"mx-auto"}
                        control={
                          <Android12Switch
                            checked={value.status}
                            color={"success"}
                          />
                        }
                      />
                    </td>
                    <td className="py-[2%] w-[2%] border-t-[1px]">
                      <div className="flex items-center justify-center">
                        <div
                          className="w-4 mr-2 cursor-pointer hover:scale-125"
                          onClick={() =>
                            navigate("/categories/edit?id=" + value.id)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="blue"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                        <div
                          className="w-4 ml-2 cursor-pointer hover:scale-125"
                          onClick={() => initiateDelete(value.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="red"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td
                      onClick={() => handleStatus(value.id, value.status)}
                      className="py-[2%] w-[1%] border-t-[1px] text-center text-md font-bold cursor-pointer hover:scale-105 items-center justify-center"
                    >
                      <FormControlLabel
                        className={"mx-auto"}
                        control={<Android12Switch checked={value.status} />}
                      />
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

export default CategoryList;
