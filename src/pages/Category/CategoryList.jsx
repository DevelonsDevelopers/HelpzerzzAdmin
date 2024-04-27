import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteCategory,
  getCategories,
  updateCategoryFeature,
  updateCategoryPopular,
  updateCategoryStatus,
} from "../../api/reducers/category";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import { IoAdd } from "react-icons/io5";
import { FormControlLabel } from "@mui/material";
import { Android12Switch, BpCheckbox } from "../../utils/components";
import editImage from "../../components/assets/edit.png";
import deleteImage from "../../components/assets/delete.png";

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

  const handlePopular = (id, val) => {
    let popular = 0;
    if (val === 0) {
      popular = 1;
    }
    dispatch(updateCategoryPopular({ id, popular }));
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
              <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                Manage Categories
              </h1>
              <button
                onClick={() => navigate("/categories/add")}
                className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
              >
                Add Category
                <IoAdd className="ml-3" />
              </button>
            </div>
            <div className="overflow-auto min-w-[300px]">
              <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg ">
                <thead>
                  <tr className="text-sm leading-normal w-full">
                    {/*<th className="py-[2%] border-b-[2px] border-b-black text-center text-[13px] w-[2%]">ID</th>*/}
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[3%]">
                      Name
                    </th>
                    <th className="py-[2%] bg-gray-50 text-left md:text-lg text-md w-[1%] pl-[3%]">
                      Detail
                    </th>
                    <th className="py-[2%] bg-gray-50 text-center md:text-lg text-md w-[1%]">
                      Featured
                    </th>
                    <th className="py-[2%] bg-gray-50 text-center md:text-lg text-md w-[1%]">
                      Status
                    </th>
                    <th className="py-[2%] bg-gray-50 text-center md:text-lg text-md w-[1%]">
                      Actions
                    </th>
                    <th className="py-[2%] bg-gray-50 text-center md:text-lg text-md w-[1%]">
                      Popular
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {response?.categories.map((value) => (
                    <tr className="text-[#000000] text-sm w-[100%]">
                      {/*<td className="py-[2%] w-[2%] border-t-[1px] text-center font-bold text-blue-500">{value.id}</td>*/}
                      <td className="border-t-[1px] pl-[3%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                          {value.name}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[3%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                          {value.details}
                        </div>
                      </td>
                      <td
                        onClick={() => handleFeatured(value.id, value.featured)}
                        className={`py-[2%] w-[1%] border-t-[1px] justify-center lg:text-lg md:text-md text-sm font-bold cursor-pointer hover:scale-105 items-center ${
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
                        className="py-[2%] w-[1%] pl-[2%]  border-t-[1px] text-center lg:text-lg md:text-md text-sm font-bold cursor-pointer hover:scale-105 items-center mx-auto justify-center"
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
                            className="w-8 mr-2 cursor-pointer hover:scale-125"
                            onClick={() =>
                              navigate("/categories/edit?id=" + value.id)
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
                      <td
                        onClick={() => handlePopular(value.id, value.popular)}
                        className="py-[2%] w-[1%] pl-[2%] border-t-[1px] text-center lg:text-lg md:text-md text-sm font-bold cursor-pointer hover:scale-105 items-center justify-center"
                      >
                        <FormControlLabel
                          className={"mx-auto"}
                          control={<Android12Switch checked={value.popular} />}
                        />
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

export default CategoryList;
