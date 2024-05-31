import React, { useEffect, useState } from "react";
import deleteImage from "../../components/assets/delete.png";
import editImage from "../../components/assets/edit.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSeo } from "../../api/reducers/seo";

const ManageSeo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const response = useSelector((state) => state.seo);

useEffect(() => {
  dispatch(getSeo())
},[dispatch])



  return (
    <div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex justify-between w-[100%] m-auto">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
            Manage SEO
          </h1>
        </div>
        <div className="overflow-auto min-w-[300px]">
          <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
            <thead>
              <tr className="text-sm leading-normal">
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[2%]">
                  ID
                </th>
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                  Page
                </th>
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                  Route
                </th>
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                  Title
                </th>
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                  Description
                </th>
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%] ">
                  Meta Content
                </th>

                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              {response.data.map((value) => (
              <tr className="text-[#000000] text-sm w-full">
                <td className="border-t-[1px] pl-[2%]">
                  <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                    {value.id}
                  </div>
                </td>

                <td className="border-t-[1px] pl-[1%]">
                  <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                  {value.page_name}
                  </div>
                </td>
                <td className="border-t-[1px] pl-[1%]">
                  <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                  {value.route}
                  </div>
                </td>
                <td className="border-t-[1px] pl-[1%]">
                  <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                  {value.title}
                  </div>
                </td>

                <td className="border-t-[1px] pl-[1%]">
                  <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                    {value.meta_description}
                  </div>
                </td>

                <td className="border-t-[1px] pl-[1%]">
                  <div className="lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center line-clamp-2 text-ellipsis">
                   {value.meta_content}
                  </div>
                </td>

                <td className="py-[2%] w-[1%] border-t-[1px]">
                  <div className="flex items-center justify-center">
                    <div
                      className="w-8 mr-2 cursor-pointer hover:scale-125"
                      onClick={() => navigate("/seo/edit?id=" + value.id)}
                    >
                      <img src={editImage} alt="Edit" />
                    </div>
                    <div
                      className="w-8 ml-2 cursor-pointer hover:scale-125"
                      // onClick={() => initiateDelete(value.id)}
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
  );
};

export default ManageSeo;
