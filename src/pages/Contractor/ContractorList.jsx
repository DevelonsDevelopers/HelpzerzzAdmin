import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  deleteContractor,
  getContractors,
  updateContractorFeature,
  updateContractorStatus,
} from "../../api/reducers/contractor";
import DeleteModal from "../../components/DeleteModal";
import { FormControlLabel } from "@mui/material";
import { Android12Switch, BpCheckbox } from "../../utils/components";
import { IoAdd } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";

const ContractorList = () => {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();

  const response = useSelector((state) => state.contractor);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getContractors());
    }
  }, [dispatch]);

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
    dispatch(updateContractorStatus({ id, status }));
  };

  const handleFeatured = (id, val) => {
    let featured = 0;
    if (val === 0) {
      featured = 1;
    }
    dispatch(updateContractorFeature({ id, featured }));
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
            <div className="flex justify-center w-[90%] m-auto">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                Contractors
              </h1>
              <button
                onClick={() => navigate("/contractors/add")}
                className="flex bg-[#0D14FD] cursor-pointer py-2 px-[1rem] text-white font-[500] rounded-xl ml-auto items-center justify-center hover:scale-110"
              >
                Add Contractor
                <IoAdd className="ml-3" />
              </button>
            </div>
            <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
              <thead>
                <tr className="text-sm leading-normal w-full">
                  <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[2%] ">
                    ID
                  </th>
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[3%] text-left">
                    Name
                  </th>
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left">
                    Email
                  </th>
                  <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%]">
                    Featured
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
                {response?.contractors.map((value) => (
                  <tr className="text-[#000000] text-sm w-[100%]">
                    <td className="py-[2%] w-[2%] lg:text-lg md:text-md text-sm font-medium border-t-[1px] text-center">
                      {value?.id}
                    </td>
                    <td className="border-t-[1px]">
                      <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                        {value.name}
                      </div>
                    </td>
                    <td className=" border-t-[1px]">
                      <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                        {value?.email}
                      </div>
                    </td>
                    <td
                      onClick={() => handleFeatured(value.id, value.featured)}
                      className={`py-[2%] w-[1%] border-t-[1px] justify-center text-[15px] font-bold cursor-pointer hover:scale-105 items-center ${
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
                      className="border-t-[1px] cursor-pointer hover:scale-105"
                    >
                      <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium w-[50px] mx-auto justify-center">
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
                          className="w-6 mr-2 cursor-pointer hover:scale-125"
                          onClick={() =>
                            navigate("/contractors/edit?id=" + value.id)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="black"
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
                          className="w-6 ml-2 cursor-pointer hover:scale-125"
                          onClick={() => initiateDelete(value.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="black"
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
                    <td className="py-[2%] w-[1%] border-t-[1px]">
                      <div
                        className="flex items-center lg:text-lg md:text-md text-sm justify-center text-center text-blue-700 cursor-pointer hover:scale-110"
                        onClick={() =>
                          navigate("/contractors/details?id=" + value.id)
                        }
                      >
                        <div className="flex">
                          Details <AiOutlineArrowRight className="ml-2 mt-1" />
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

export default ContractorList;
