import React from "react";
import { IMAGE_PATH } from "../../../utils/constants";
import { Rating } from "@mui/material";
import moment from "moment";

const Reviews = ({ id, response }) => {
  console.log(response);
  return (
    <div>
      <div className={`flex flex-row flex-wrap gap-5 mt-6 `}>
        {response?.contractorDetails?.reviews?.map((value) => (
          <div
            className={`flex flex-wrap w-[280px] text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] border-[1px] rounded-2xl bg-gray-50`}
          >
            <div className={` flex flex-col py-3 justify-center px-4`}>
              <span className="flex text-left w-full justify-between align-center mt-2 ">
                <span className={`font-bold text-left`}>{value.title}</span>
                <span>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAc0lEQVR4nNXTwQ2CQBAF0HdXaxDKMNgY2ohgC0ABWgxQiWaTPex9jOJP5voymfzh33LANc8+At3xytNFoGcBPSJQgwUzTraQGhNGVBFoKm40fgoaIlCVN0nI0RZyxporkKrw+0L2BXSLQOlRL2ixi0DfzxsZ/B2yf+xpkAAAAABJRU5ErkJggg==" />
                </span>
              </span>
              <div className="text-left flex">
                <Rating value={value.rating} size="small" readOnly />
                <p className="text-gray-500 text-sm px-5">
                  {moment(value.created_date).format("ll")}
                </p>
              </div>
              <div className={`grid grid-cols-3 gap-2 mt-2`}>
                {value.images.map((img) => (
                  <img
                    className="w-20 h-20 rounded-xl"
                    src={`${IMAGE_PATH}${img.image}`}
                    alt=""
                  />
                ))}
              </div>{" "}
              <span
                className={`mt-2 min-h-[90px] text-left font-medium text-[12px]`}
              >
                {value.review}
              </span>
              {value.status === 0 ? (
                <div className={`mt-5 gap-2 text-white font-bold text-[12px]`}>
                  <button
                    className={`w-[40%] py-2 bg-[#12947c] rounded-lg mr-1 uppercase`}
                  >
                    Approve
                  </button>
                  <button
                    className={`w-[40%] py-2 bg-[#fd3d3a] rounded-lg ml-1 uppercase`}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <>
                  {value.status === 1 ? (
                    <button
                      className={`w-[200px] py-2 bg-green-700 rounded-lg mr-1 uppercase mt-5 text-[12px] font-bold text-white cursor-not-allowed`}
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      className={`w-[200px] py-2 bg-red-700 rounded-lg mr-1 uppercase mt-5 text-[12px] font-bold text-white cursor-not-allowed`}
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
