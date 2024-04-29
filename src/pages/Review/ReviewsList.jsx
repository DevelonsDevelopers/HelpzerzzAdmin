import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import moment from "moment";
import { Rating } from "@mui/material";
import DeleteModal from "../../components/DeleteModal";
import {
  approveReview,
  getReviews,
  rejectReview,
  deleteReview,
} from "../../api/reducers/review";
import deleteImage from "../../components/assets/delete.png";

const ReviewsList = ({ search }) => {
  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);
  const [deleteID, setDeleteID] = useState();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReviews());
  }, []);

  useEffect(() => {
    setSearchData(response.reviews);
  }, [response.reviews]);

  useEffect(() => {
    if (search) {
      setData(
        searchData.filter((value) => {
          return (
            value.title.toLowerCase().includes(search.toLowerCase()) ||
            value.review.toLowerCase().includes(search.toLowerCase()) ||
            value.company_name.toLowerCase().includes(search.toLowerCase())
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
    dispatch(deleteReview(deleteID));
  };

  console.log(response);

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
                Manage Reviews
              </h1>
            </div>
            <div className="overflow-auto min-w-[300px]">
              <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                <thead>
                  <tr className="text-sm leading-normal">
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%] text-left pl-[2%]">
                      Timeline
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[4%]">
                      Contractor Name
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[4%]">
                      Title
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[3%] text-left pl-[2%]">
                      Review
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
                  {data.map((value) => (
                    <tr className="text-[#000000] text-sm w-full">
                      <td className="border-t-[1px] pl-[2%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                          {moment(value.created_date).format("ll")}
                        </div>
                      </td>
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
                                  className={`w-[80px] py-1 bg-[#12947c] rounded-lg uppercase text-[12px] font-bold text-white cursor-pointer`}
                                  onClick={() =>
                                    dispatch(rejectReview(value.id))
                                  }
                                >
                                  Approved
                                </button>
                              ) : (
                                <button
                                  className={`w-[80px] py-1 bg-[#fd3d3a] rounded-lg uppercase text-[12px] font-bold text-white cursor-pointer`}
                                  onClick={() =>
                                    dispatch(approveReview(value.id))
                                  }
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
                          className="w-8 ml-2 cursor-pointer hover:scale-125"
                          onClick={() => initiateDelete(value.id)}
                        >
                          <img src={deleteImage} alt="Delete" />
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
