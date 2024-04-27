import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Rating } from "@mui/material";
import {
  approveReview,
  getReviews,
  rejectReview,
} from "../../api/reducers/review";

const ReviewsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReviews());
  }, []);

  console.log(response);

  return (
    <>
      {response.loading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-full flex flex-col justify-center">
            <div className="flex justify-between w-[100%] m-auto">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                Manage Reviews
              </h1>
            </div>
            <div className="overflow-auto min-w-[300px]">
              <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                <thead>
                  <tr className="text-sm leading-normal">
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[4%]">
                      Contractor Name
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[4%]">
                      Title
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[3%] text-left pl-[2%]">
                      Review
                    </th>

                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[2%]">
                      Timeline
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%] text-left pl-[2%]">
                      Rating
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                      Status
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {response?.reviews?.map((value) => (
                    <tr className="text-[#000000] text-sm w-full">
                      <td className="border-t-[1px] pl-[4%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                          {value.company_name}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[4%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                          {value.title}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[2%]">
                        <div className="lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center line-clamp-2 text-ellipsis">
                          {value.review}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[2%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                          {moment(value.created_date).format("ll")}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[2%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                          <Rating value={value.rating} size="small" readOnly />
                        </div>
                      </td>
                      <td className="py-[2%] border-t-[1px]">
                        <div className="flex items-center justify-center">
                          {value.status == 0 ? (
                            <div
                              className={`gap-2 text-white font-bold text-[12px] flex`}
                            >
                              <button
                                onClick={() =>
                                  dispatch(approveReview(value.id))
                                }
                                className={`w-[40px] rounded-full py-1 bg-[#12947c] ml-1 uppercase items-center justify-center flex`}
                              >
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbklEQVR4nO2SMQqAMAxFcwlF738SF0XqZAaP80Ts0CGiYIQiedCp5TX5fJEgqAagBUZg+EqunMze8gZYs3wDupBL3bEAE7AczTDuyrao9ebJB8kS4CG/iKB3z9yYVl9PfrOJf1uKTVI+PpMH/2MH9hcTVXzIhEwAAAAASUVORK5CYII=" />
                              </button>
                              <button
                                onClick={() => dispatch(rejectReview(value.id))}
                                className={`w-[40px] rounded-full bg-[#fd3d3a] ml-1 uppercase items-center justify-center flex`}
                              >
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAArElEQVR4nO2UUQrCMBQEWynUXkMs6vWr9iO3EPQ8I49GUHgmKzbiR/ez2czktSVVteQvAzTAHqiF7ip2GxW+Bi5MOQNdotsBY+zanlYRbHlN8CQRbmvP2ahTDCkJPnyQ4BHQAidPklqTBYlThjfPPoNnJpkHLkjC1/DigqKvqOhHpuRvCtQ5AP50R1VwUE6HL9mpl93tcSryl511LFfbq05hkl4qT/1ehi/5ee7tVF1U73rqfgAAAABJRU5ErkJggg==" />
                              </button>
                            </div>
                          ) : (
                            <>
                              {value.status == 1 ? (
                                <button
                                  className={`w-[80px] py-1 bg-[#12947c] rounded-lg uppercase text-[12px] font-bold text-white cursor-not-allowed`}
                                >
                                  Approved
                                </button>
                              ) : (
                                <button
                                  className={`w-[80px] py-1 bg-[#fd3d3a] rounded-lg uppercase text-[12px] font-bold text-white cursor-not-allowed`}
                                >
                                  Rejected
                                </button>
                              )}
                            </>
                          )}
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
                            Details
                            <AiOutlineArrowRight className="ml-2 mt-1" />
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

export default ReviewsList;
