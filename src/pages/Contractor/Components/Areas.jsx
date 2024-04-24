import React from "react";
import { useDispatch } from "react-redux";
import { assignArea } from "../../../api/reducers/contractor";

const Areas = ({ id, response }) => {
  const dispatch = useDispatch();

  const Assign = (city) => {
    dispatch(assignArea({ contractor: id, city: city }));
  };

  return (
    <>
      <div>
        <div className="w-full flex flex-col justify-center">
          <div className={`flex flex-row flex-wrap gap-5 mt-6 `}>
            {response?.contractorDetails?.areas?.map((value) => (
              <div
                className={`flex flex-col flex-wrap text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] border-[1px] rounded-2xl bg-gray-50 w-[200px] p-5`}
              >
                <div className="py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center min-w-[50px] min-h-[100px]">
                  {value?.name} - {value.state_code}
                </div>
                <div className="relative bottom-0 py-[2%] lg:text-lg text-center md:text-md text-sm font-medium mx-auto  justify-center min-w-[50px]">
                  {value.assigned === 0 ? (
                    <button
                      className={`rounded-md bg-black px-10 py-1 text-white`}
                      onClick={() => Assign(value.id)}
                    >
                      Assign
                    </button>
                  ) : (
                    <button
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
      </div>
    </>
  );
};

export default Areas;
