import React from 'react'
import deleteImage from "../../components/assets/delete.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const ContractorRequestList = () => {
   const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex justify-between w-[100%] m-auto">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
          Manage Contractor Requests
        </h1>
      </div>
       <div className="overflow-auto min-w-[300px]">
          <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
          <thead>
              <tr className="text-sm leading-normal">
                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[2%]">
                  Date
                </th>
                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[3%] text-left pl-[1%]">
                  Customer Name
                </th>
                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%]">
                  Message
                </th>
                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[1%]">
                  Status
                </th>
                <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[1%]">
                  Actions
                </th>
                <th className="py-[1.5%] bg-gray-50 rounded-tr-xl md:text-lg text-md w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
                <tr className="text-[#000000] text-sm w-full">
                  <td className="border-t-[1px] pl-[2%]">
                    <div className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                      21
                    </div>
                  </td>
                  <td className="border-t-[1px] pl-[3%]">
                    <div className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                      Jhon Doe
                    </div>
                  </td>
                  <td className="border-t-[1px] pl-[2%]">
                    <div className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                      NA
                    </div>
                  </td>
                  <td className="py-[1.5%] border-t-[1px] text-center font-bold lg:text-lg md:text-md text-sm hover:scale-110">
                    <p
                      className={`w-[100px] mx-auto rounded-2xl py-1 px-2 text-white bg-[#16dbcc]`}
                    >
                      Active
                    </p>
                  </td>
                  <td className="py-[1.5%] border-t-[1px]">
                    <div className="flex items-center justify-center">
                      <div
                        className="w-8  cursor-pointer hover:scale-125"
                        onClick={() => {}}
                      >
                        <img src={deleteImage} alt="Delete" />
                      </div>
                    </div>
                  </td>
                  <td className="py-[1.5%] border-t-[1px]">
                    <div
                      className="flex items-center justify-center text-center text-blue-700 cursor-pointer hover:scale-110"
                      onClick={() =>
                        {}
                      }
                    >
                      <div className="flex lg:text-lg md:text-md text-sm" 
                      onClick={() =>
                            navigate("/contractorrequests/details")
                          }
                      >
                        Details{" "}
                        <AiOutlineArrowRight className="ml-2 mt-1" />
                      </div>
                    </div>
                  </td>
                </tr>
            </tbody>
          </table>
       </div>
    </div>
  )
}

export default ContractorRequestList