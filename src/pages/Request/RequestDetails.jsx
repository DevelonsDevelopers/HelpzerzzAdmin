import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequest } from "../../api/reducers/request";
import {
  assignContractor,
  getAllAssignedContractors,
} from "../../api/reducers/contractor";

const data = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

const RequestDetails = () => {
  const [requestData, setRequestData] = useState();
  const [action, setAction] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const response = useSelector((state) => state.request);
  const contractorResponse = useSelector((state) => state.contractor);

  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (params.get("id")) {
      dispatch(getRequest(params.get("id")));
      dispatch(getAllAssignedContractors(params.get("id")));
    }
  }, []);

  useEffect(() => {
    if (response.request) {
      setRequestData(response.request);
    }
  }, [response.request]);

  const assign = (request, contractor) => {
    dispatch(assignContractor({ request, contractor }));
  };

  const handleRejectClick = () => {
    setShowConfirmation(true);
  };

  const handleRejectConfirm = () => {
    setShowConfirmation(false);
    setAction("rejected");
  };

  const handleRejectCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div>
        <h1 className="lg:text-3xl md:text-2xl text-xl font-[700] mt-5 ml-[3%]">
          Request Detail
        </h1>

        <div className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
          {action === null && (
            <div className="flex justify-center items center mx-auto gap-4 mb-5">
              <button
                className="md:text-lg text-md bg-green-800 text-white font-semibold ml-auto mt-auto sm:px-7 px-3 rounded-lg py-2"
                onClick={() => setAction("accepted")}
              >
                ACCEPTED
              </button>
              <button
                className="md:text-lg text-md bg-red-700 text-white font-semibold ml-auto mt-auto sm:px-7 px-3 rounded-lg py-2"
                onClick={handleRejectClick}
              >
                REJECTED
              </button>
            </div>
          )}

          {showConfirmation && (
            <div
              className=" absolute top-[60%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-[400px] p-4 h-[220px] border-2 border-gray-600 justify-center items-center  rounded-md "
              style={{ alignContent: "center" }}
            >
              <p className="lg:text-2xl font-semibold md:text-xl text-center">
                Are you sure you want to reject request?
              </p>
              <div className="mt-6 mb-4 justify-center flex gap-2">
                <button
                  onClick={handleRejectConfirm}
                  className="md:text-md text-sm bg-red-700 text-white font-semibold mt-auto px-7 rounded-lg py-2"
                >
                  Yes
                </button>
                <button
                  onClick={handleRejectCancel}
                  className="md:text-md text-sm bg-gray-600 text-white font-semibold mt-auto px-7 rounded-lg py-2"
                >
                  No
                </button>
              </div>
            </div>
          )}

          <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex-wrap">
            <div className="border-2 rounded-xl lg:p-6 p-3 min-w-[290px]">
              <h1 className="text-right">{requestData?.created_at}</h1>
              <div className="border-2 rounded-xl p-4 my-2 ">
                <div className="flex justify-between p-2">
                  <h1 className="text-sm md:text-lg text-left w-[40%]">
                    Home type :
                  </h1>
                  <h1 className="text-sm md:text-lg text-right w-[60%]">
                    {requestData?.home_type}
                  </h1>
                </div>
                <div className="flex justify-between p-2 text-sm md:text-lg">
                  <h1 className=" text-left w-[40%]">Postal Code :</h1>
                  <h1>{requestData?.postal_code}</h1>
                </div>
                <div className="text-sm md:text-lg flex justify-between p-2">
                  <h1>Status :</h1>
                  <h1>{requestData?.status}</h1>
                </div>
                <div className="flex justify-between p-2">
                  <h1 className="text-sm md:text-lg text-left w-[40%] ">
                    Subcategory :
                  </h1>
                  <h1 className="text-sm md:text-lg text-right w-[60%]">
                    {requestData?.subcategory_name}
                  </h1>
                </div>
              </div>
              <div className="border-2 rounded-xl p-4 my-2 text-sm md:text-lg">
                <div className="flex justify-between p-2">
                  <h1>Name :</h1>
                  <h1>{requestData?.name}</h1>
                </div>
                <div className="flex justify-between p-2">
                  <h1>Phone :</h1>
                  <h1>{requestData?.phone}</h1>
                </div>
                <div className="flex justify-between p-2">
                  <h1 className="text-left w-[40%]">Email :</h1>
                  <h1 className="text-right w-[60%]">{requestData?.email}</h1>
                </div>
                <div className="flex justify-between p-2">
                  <h1 className="text-left w-[40%]">Address :</h1>
                  <h1 className="text-right w-[60%]">{requestData?.address}</h1>
                </div>
              </div>
              <div className="text-sm md:text-lg border-2 rounded-xl p-4 my-2">
                <h1>Detail :</h1>
                <h1 className="ml-2 mt-4">{requestData?.details}</h1>
              </div>
            </div>

            {/*Contracotrs List*/}
            <div className="border-2 rounded-xl lg:p-6 p-3 bg-gray-50 min-w-[290px]">
              {action === "accepted" ? (
                <>
                  <div className="w-[90%] ml-auto mr-auto mb-4">
                    <input
                      type={"text"}
                      className="border-2 rounded-xl w-[100%] py-2 px-10"
                      placeholder="Search Contractor"
                    />
                    <IoSearchSharp
                      className="mt-[-2rem] ml-2 text-gray-800"
                      size={20}
                      color="gray"
                    />
                  </div>
                  <div className="h-[60vh] overflow-y-auto">
                    {contractorResponse.assignedContractors?.map((value) => (
                      <div className="flex justify-between mt-6 bg-white rounded-xl p-4">
                        <div>
                          <h1 className="text-[18px]">{value.company_name}</h1>
                          <h1 className="text-[13px]">{value.address}</h1>
                        </div>
                        <button
                          disabled={value.assigned !== 0}
                          className={`${
                            value.assigned !== 0
                              ? "bg-green-500 text-white cursor-not-allowed"
                              : "bg-black text-white"
                          } ml-auto mt-auto px-4 rounded-lg py-[3px]`}
                          onClick={() =>
                            assign(params.get("id"), value.contractor)
                          }
                        >
                          {value.assigned !== 0 ? "Assigned" : "Assign"}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              {action === "rejected" ? (
                <div
                  className="text-center text-3xl font-bold h-full justify-center items-center flex"
                  style={{ alignContent: "center" }}
                >
                  Your request has been rejected!
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;
