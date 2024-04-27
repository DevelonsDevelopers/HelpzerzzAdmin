import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  deleteCostGuide,
  getCostGuides,
  updateCostGuideFeature,
  updateCostGuideStatus,
} from "../../api/reducers/costGuide";
import DeleteModal from "../../components/DeleteModal";
import { FormControlLabel } from "@mui/material";
import { Android12Switch, BpCheckbox } from "../../utils/components";
import { IoAdd } from "react-icons/io5";
import editImage from "../../components/assets/edit.png";
import deleteImage from "../../components/assets/delete.png";

const CostGuideList = () => {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const response = useSelector((state) => state.costGuide);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getCostGuides());
    }
  }, [dispatch]);

  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleDelete = () => {
    dispatch(deleteCostGuide(deleteID));
  };

  const handleStatus = (id, val) => {
    let status = 0;
    if (val === 0) {
      status = 1;
    }
    dispatch(updateCostGuideStatus({ id, status }));
  };

  const handleFeatured = (id, val) => {
    let featured = 0;
    if (val === 0) {
      featured = 1;
    }
    dispatch(updateCostGuideFeature({ id, featured }));
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
          <div className="w-full flex flex-col justify-center">
            <div className="flex justify-between w-[100%] m-auto">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                Manage Cost guides
              </h1>
              <button
                onClick={() => navigate("/costGuides/add")}
                className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
              >
                Add Cost-Guide
                <IoAdd className="ml-3" />
              </button>
            </div>
            <div className="overflow-auto min-w-[300px]">
              <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                <thead>
                  <tr className="text-sm leading-normal w-full">
                    <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[2%]">
                      ID
                    </th>
                    <th className="py-[2%] bg-gray-50 text-left text-lg w-[3%]">
                      Name
                    </th>
                    <th className="py-[2%] bg-gray-50 text-left text-lg w-[2%]">
                      Subtitle
                    </th>
                    <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">
                      Featured
                    </th>
                    <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">
                      Status
                    </th>
                    <th className="py-[2%] bg-gray-50 text-center text-lg w-[2%]">
                      Actions
                    </th>
                    <th className="py-[2%] bg-gray-50 rounded-tr-xl text-center text-lg w-[1%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {response?.costGuides.map((value) => (
                    <tr className="text-[#000000] text-sm w-[100%]">
                      <td className="border-t-[1px]">
                        <div className="py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center min-w-[50px]">
                          {value?.id}
                        </div>
                      </td>

                      <td className="border-t-[1px]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center min-w-[100px]">
                          {value.title}
                        </div>
                      </td>

                      <td className="border-t-[1px]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center min-w-[150px]">
                          {value?.subtitle}
                        </div>
                      </td>

                      <td
                        onClick={() => handleFeatured(value.id, value.featured)}
                        className={`py-[2%] w-[1%] border-t-[1px] justify-center text-[15px] font-bold cursor-pointer hover:scale-105 items-center ${
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
                        className="py-[2%] w-[1%] border-t-[1px] text-center text-[8px] pl-[3%] font-bold cursor-pointer hover:scale-105 items-center justify-center"
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
                              navigate("/costGuides/edit?id=" + value.id)
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

export default CostGuideList;
