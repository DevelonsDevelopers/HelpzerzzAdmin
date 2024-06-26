import React, { useState } from "react";
import deleteImage from "../../../components/assets/delete.png";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal";
import { useDispatch } from "react-redux";
import {deleteContractor, deleteContractorLeads} from "../../../api/reducers/contractor";

const Leads = ({ id, response }) => {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleDelete = () => {
    dispatch(deleteContractorLeads(deleteID));
  };

  console.log(response);
  return (
    <>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        deleteFunction={handleDelete}
        deleting={response.deleting}
      />
      {/* {id, user, subcategory, postal_code, home_type, time, details, status, created_at}) */}
      <div>
        <div className="overflow-auto min-w-[300px]">
          <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
            <thead>
              <tr className="text-sm leading-normal w-full">
                <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[2%] pl-[3%] text-left">
                  Customer
                </th>
                <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[2%] pl-[3%] text-left">
                  SubCategory
                </th>
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left">
                  Time Frame
                </th>
                <th className="py-[2%] bg-gray-50 md:text-lg   text-md w-[3%] text-left">
                  Message
                </th>
                {/* <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                  Manage
                </th> */}
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {response?.contractorDetails?.leads?.map((value) => (
                <tr className="text-[#000000] text-sm w-[100%] ">
                  <td
                    className=" border-t-[1px] pl-[3%] text-blue-700 underline cursor-pointer"
                    onClick={() => navigate("/requests/details?id=" + value.id)}
                  >
                    <div className="py-[2%] md:text-base text-sm font-semibold mx-auto min-w-[80px]">
                      {value.customer_name}
                    </div>
                  </td>
                  <td className=" border-t-[1px] pl-[3%] ">
                    <div className="py-[2%] md:text-base text-sm font-semibold mx-auto min-w-[80px]">
                      {value.subcategory_name}
                    </div>
                  </td>
                  <td className=" border-t-[1px]">
                    <div className="py-[2%] text-[#12947c] md:text-base text-sm font-semibold mx-auto min-w-[80px]">
                      {value?.time}
                    </div>
                  </td>
                  <td className=" border-t-[1px]">
                    <div className=" md:text-base text-sm font-semibold mx-auto min-w-[80px] line-clamp-1 text-ellipsis">
                      {value?.details}
                    </div>
                  </td>

                  {/* <td className="py-[1%] w-[2%] border-t-[1px]">
                    <div className="flex items-center justify-center">
                      <div className="w-7 mr-2 cursor-pointer hover:scale-125">
                        <img src={editImage} alt="Edit" />
                      </div>
                    </div>
                  </td> */}
                  <td className="py-[2%] w-[1%] border-t-[1px]">
                    <div className="flex items-center justify-center">
                      <div
                        className="w-8 ml-2 cursor-pointer hover:scale-125"
                        onClick={() => initiateDelete(value.id)}
                      >
                        <img src={deleteImage} alt="Delete" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leads;
