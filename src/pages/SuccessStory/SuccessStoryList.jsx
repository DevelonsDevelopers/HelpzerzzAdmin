import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  deleteStory,
  getStories,
  updateStoryPopular,
  updateStoryStatus,
} from "../../api/reducers/successStory";
import DeleteModal from "../../components/DeleteModal";
import { FormControlLabel } from "@mui/material";
import { Android12Switch, BpCheckbox } from "../../utils/components";
import { IoAdd } from "react-icons/io5";
import editImage from "../../components/assets/edit.png";
import deleteImage from "../../components/assets/delete.png";

const SuccessStoryList = ({ search }) => {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);

  const response = useSelector((state) => state.successStory);

  console.log(response);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!response.fetched) {
    dispatch(getStories());
    // }
  }, [dispatch]);

  useEffect(() => {
    setSearchData(response.stories);
  }, [response.stories]);

  useEffect(() => {
    if (search) {
      setData(
        searchData.filter((value) => {
          return (
            value.company_name.toLowerCase().includes(search.toLowerCase()) ||
            value.company_address
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            value.name.toLowerCase().includes(search.toLowerCase())
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
    dispatch(deleteStory(deleteID));
  };

  const handleStatus = (id, val) => {
    let status = 0;
    if (val === 0) {
      status = 1;
    }
    dispatch(updateStoryStatus({ id, status }));
  };

  const handleFeatured = (id, val) => {
    let featured = 0;
    if (val === 0) {
      featured = 1;
    }
    dispatch(updateStoryPopular({ id, featured }));
  };
  //   {loading, storyLoading, deleting, noData, success, fetched, stories, story, error, storyError}
  //   {id, title, subtitle, description, youtube_link, popular, status, created_at})
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
            <div className="flex justify-center w-[100%] m-auto">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                Success Stories
              </h1>

              <button
                onClick={() => navigate("/story/add")}
                className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
              >
                Add Story
                <IoAdd className="ml-3" />
              </button>
            </div>

            <div className="overflow-auto min-w-[300px]">
              <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                <thead>
                  <tr className="text-sm leading-normal w-full">
                    <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[2%] pl-[3%] text-left">
                      Title
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left">
                      Sub-Title
                    </th>

                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%] text-left">
                      Thumbnail
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                      Popular
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                      Status
                    </th>
                    <th className="py-[2%] bg-gray-50 rounded-tr-xl md:text-lg text-md w-[1%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((value) => (
                    <tr className={`text-[#000000] text-sm w-[100%] `}>
                      <td
                        className={`py-[2%] w-[3%] lg:text-lg md:text-md text-sm font-medium border-t-[1px] pl-[3%] min-w-[50px] `}
                      >
                        {value.title}
                      </td>
                      <td className="border-t-[1px] ">
                        <div
                          className={`py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto min-w-[150px] `}
                        >
                          {value.subtitle}
                        </div>
                      </td>
                      <td className=" border-t-[1px]">
                        <div className="py-[2%] lg:text-sm md:text-sm text-sm font-bold mx-auto min-w-[80px]">
                          {" "}
                          <iframe
                            width="100"
                            height="60"
                            src="https://www.youtube.com/embed/tmg6d3T_T6Q"
                            title="thumnail"
                          ></iframe>{" "}
                        </div>
                      </td>
                      <td
                        onClick={() => handleFeatured(value.id, value.popular)}
                        className={`py-[2%] w-[1%] border-t-[1px] text-[15px] font-bold cursor-pointer hover:scale-105 items-center `}
                      >
                        <center>
                          <BpCheckbox
                            className="mx-auto"
                            checked={value.popular}
                          />
                        </center>
                      </td>
                      <td
                        onClick={() => handleStatus(value.id, value.status)}
                        className="border-t-[1px] cursor-pointer hover:scale-105 pl-[1%]"
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
                            className="w-8 mr-2 cursor-pointer hover:scale-125"
                            onClick={() =>
                              navigate("/story/edit?id=" + value.id)
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

export default SuccessStoryList;
