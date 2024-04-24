import React from "react";
import moment from "moment";
const Leads = ({ id, response }) => {
  console.log(response);
  return (
    <>
      {/* {id, user, subcategory, postal_code, home_type, time, details, status, created_at}) */}
      <div>
        <div className="flex flex-row flex-wrap gap-5 mt-6 ">
          {response?.contractorDetails?.leads?.map((value) => (
            <div className="flex flex-wrap w-[280px] min-h-[300px] text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] rounded-lg text-[#000000] text-sm py-5 justify-center px-4">
              <div className="flex flex-col w-full">
                <span className={`font-bold text-center mb-2`}>
                  {value.user}
                </span>
                <span className={`font-bold text-left`}>
                  {value.subcategory}
                </span>

                <span className="flex text-left w-full justify-between align-center mt-2 ">
                  <span className={`font-bold text-left`}>
                    {value.postal_code}
                  </span>
                  <span className={`text-gray-500 text-sm`}>
                    {moment(value.created_date).format("ll")}
                  </span>
                </span>

                <div className="pt-[2%] text-left text-base font-semibold">
                  {value?.home_type}
                </div>
                <div className="pt-[2%] text-left text-base font-semibold">
                  {value?.time}
                </div>
                <div className="py-[2%] text-left text-sm">
                  {value?.details}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Leads;
