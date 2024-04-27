import React, { Fragment, useState } from "react";
import { IMAGE_PATH } from "../../../utils/constants";
import { Rating } from "@mui/material";
import moment from "moment";
import { Popover, Transition } from "@headlessui/react";
import DeleteModal from "../../../components/DeleteModal";
import { useDispatch } from "react-redux";
import {
  approveContractorReview,
  deleteContractorReview,
  rejectContractorReview,
} from "../../../api/reducers/contractor";
import { deleteReview } from "../../../api/reducers/review";

const Reviews = ({ id, response }) => {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [openMenu, setOpenMenu] = useState();

  const dispatch = useDispatch();

  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleDelete = () => {
    dispatch(deleteContractorReview(deleteID));
  };

  return (
    <div>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        deleteFunction={handleDelete}
        deleting={response.deleting}
      />
      <div className={`flex flex-row flex-wrap gap-5 mt-6 `}>
        {response?.contractorDetails?.reviews?.map((value) => (
          <div
            className={`flex flex-wrap w-[280px] min-h-[350px] text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] border-[1px] rounded-2xl bg-gray-50`}
          >
            <div className={`flex flex-col py-3 justify-center px-4`}>
              <span className="flex text-left w-full justify-between align-center mt-2 ">
                <span className={`font-bold text-left`}>{value.title}</span>
                <Popover className="">
                  <Popover.Button onClick={() => setOpenMenu(!openMenu)}>
                    <span>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAc0lEQVR4nNXTwQ2CQBAF0HdXaxDKMNgY2ohgC0ABWgxQiWaTPex9jOJP5voymfzh33LANc8+At3xytNFoGcBPSJQgwUzTraQGhNGVBFoKm40fgoaIlCVN0nI0RZyxporkKrw+0L2BXSLQOlRL2ixi0DfzxsZ/B2yf+xpkAAAAABJRU5ErkJggg==" />
                    </span>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform scale-95"
                    enterTo="transform scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform scale-100"
                    leaveTo="transform scale-95"
                  >
                    <Popover.Panel className="absolute right-0 border-[1px]  max-sm:right-0 z-50 bg-white shadow-sm rounded-md max-w-xs max-sm:w-[100px] w-[100px] py-4">
                      <center className="flex flex-col gap-2">
                        {/* <button className="text-[14px] font-[500]">Edit</button> */}
                        <button
                          className="text-[14px] font-[500] cursor-pointer"
                          onClick={() => initiateDelete(value.id)}
                        >
                          Delete
                        </button>
                      </center>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </span>
              <div className="text-left flex pt-2">
                <Rating value={value.rating} size="small" readOnly />
                <p className="text-gray-500 text-sm px-5">
                  {moment(value.created_date).format("ll")}
                </p>
              </div>
              <div className={`grid grid-cols-3 gap-2 mt-2 h-[70px]`}>
                {value.images.map((img) => (
                  <img
                    className="w-20 h-20 rounded-xl"
                    src={`${IMAGE_PATH}${img.image}`}
                    alt=""
                  />
                ))}
              </div>{" "}
              <span
                className={`mt-2 py-3 min-h-[100px] text-left font-medium text-[12px]`}
              >
                {value.review}
              </span>
              {value.status === 0 ? (
                <div
                  onClick={() => dispatch(approveContractorReview(value.id))}
                  className={`px-4 mt-5 gap-2 text-white font-bold text-[12px]`}
                >
                  <button
                    className={`w-[100px] py-2 bg-[#12947c] rounded-lg mr-1 uppercase`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => dispatch(rejectContractorReview(value.id))}
                    className={`w-[100px] py-2 bg-[#fd3d3a] rounded-lg ml-1 uppercase`}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <>
                  {value.status === 1 ? (
                    <button
                      className={` w-[100px] flex justify-center items-center py-2 bg-[#12947c] rounded-lg mr-1 uppercase text-[12px] font-bold text-white cursor-not-allowed`}
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      className={`w-[100px] flex justify-center items-center py-2 bg-[#fd3d3a] rounded-lg ml-1 uppercase text-[12px] font-bold text-white cursor-not-allowed`}
                    >
                      Rejected
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
