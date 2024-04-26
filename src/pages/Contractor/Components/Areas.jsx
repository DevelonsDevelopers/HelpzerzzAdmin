import React from "react";
import { useDispatch } from "react-redux";
import { assignArea, unAssignArea } from "../../../api/reducers/contractor";

const Areas = ({ id, response }) => {
  const dispatch = useDispatch();

  const Assign = (city) => {
    dispatch(assignArea({ contractor: id, city: city }));
  };

  const unAssign = (id) => {
    dispatch(unAssignArea(id));
  };

  return (
    <>
      {/* <div>
        <div className="w-full flex flex-col justify-center">
          <div className={`flex flex-row flex-wrap gap-5 mt-6 `}>
            {response?.contractorDetails?.areas?.map((value) => (
              <div
                className={`flex flex-col flex-wrap text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] border-[1px] rounded-2xl bg-gray-50 w-full p-5`}
              >
                <div className="py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center ">
                  {value?.name} - {value.state_code}
                </div>
                <div className="relative bottom-0 py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center ">
                  {value.assigned === 0 ? (
                    <button
                      className={`rounded-md bg-black px-10 py-1 text-white`}
                      onClick={() => Assign(value.id)}
                    >
                      Assign
                    </button>
                  ) : (
                    <button
                      onClick={() => unAssign(value.assigned)}
                      className={`rounded-md bg-[#12947c] px-10 py-1 text-white`}
                    >
                      Assigned
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div>
        <div className="overflow-auto min-w-[300px]">
          <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
            <thead>
              <tr className="text-sm leading-normal w-full">
                <th className="py-[2%] bg-gray-50 rounded-tl-xl w-[3%] pl-[3%]"></th>
                <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[4%] pl-[3%] text-left">
                  Postal Code
                </th>
                <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[4%] text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {response?.contractorDetails?.areas?.map((value) => (
                <tr className="text-[#000000] text-sm w-[100%] ">
                  <td className=" border-t-[1px]"></td>
                  <td className=" border-t-[1px] pl-[3%] cursor-pointer">
                    <div className="py-[2%] md:text-base text-sm font-semibold mx-auto min-w-[80px]">
                      {value?.name} - {value.state_code}
                    </div>
                  </td>
                  <td className=" border-t-[1px]">
                    <div className="py-[2%] text-[#12947c] md:text-base text-sm font-semibold mx-auto min-w-[80px]">
                      {value.assigned === 0 ? (
                        <button
                          className={`rounded-md bg-black px-10 py-1 text-white`}
                          onClick={() => Assign(value.id)}
                        >
                          Assign
                        </button>
                      ) : (
                        <button
                          onClick={() => unAssign(value.assigned)}
                          className={`rounded-md bg-[#12947c] px-10 py-1 text-white`}
                        >
                          Assigned
                        </button>
                      )}
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

export default Areas;
