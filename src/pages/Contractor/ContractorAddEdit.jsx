import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading";
import Loading from "../../components/Loading";

import {
  addContractor,
  getContractor,
  successListener,
  updateContractor,
} from "../../api/reducers/contractor";
import { IMAGE_PATH } from "../../utils/constants";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { PatternFormat } from "react-number-format";

const ContractorAddEdit = ({ edit = false }) => {
  const names = ["name", "email", "phone", "password", "address", "image"];
  const [error, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [contractorData, setContractorData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    image: "",
    status: 1,
    checked: 1,
  });
  const [file, setFile] = useState();
  const [assignLoading, setAssignLoading] = useState(false);

  const [viewPassword, setViewPassword] = useState(true);

  const response = useSelector((state) => state.contractor);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  console.log(response);
  useEffect(() => {
    if (!response.fetched) {
      dispatch(getContractor());
    }
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        dispatch(getContractor(params.get("id")));
      }
    }
  }, []);

  useEffect(() => {
    if (edit) {
      if (response.contractor) {
        setContractorData(response.contractor);
      }
    }
  }, [response.contractor]);

  // useEffect(() => {
  //   if (response.success) {
  //     if (edit) {
  //       navigate("/contractors");
  //     } else {
  //       navigate("/contractors/details?id=" + response.successID);
  //     }
  //     dispatch(successListener());
  //   }
  // }, [response.success]);

  const handleChange = (e) => {
    let tempErrors = [...error];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setContractorData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        let tempErrors = [...error];
        tempErrors[5] = false;
        setErrors(tempErrors);
        setContractorData((p) => ({ ...p, image: reader.result }));
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      setAssignLoading(true);

      if (edit) {
        dispatch(
          updateContractor({ file: file, contractor: contractorData })
        ).then(() => {
          setAssignLoading(false);
          navigate("/contractors");
        });
      } else {
        dispatch(
          addContractor({ file: file, contractor: contractorData })
        ).then(() => {
          setAssignLoading(false);
          navigate("/contractors/details?id=" + response.successID);
        });
      }
  };
  console.log('contractor data' , contractorData);

  return (
    <>
      {/* <center>
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        </center> */}
      {response.contractorLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-center font-[800] text-[25px] uppercase mt-5">
            Add Contractor
          </h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto"
          >
            <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
              <div>
                <div className="w-[100%] px-5 py-2">
                  <label className="block text-[12px] ml-3 font-medium uppercase">
                    Name
                  </label>
                  <input
                    value={contractorData.name}
                    type="text"
                    name={names[0]}
                    required
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[0] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter Contractor Name"
                  />
                </div>

                <div className="w-[100%] px-5 py-2">
                  <label className="block text-[12px] ml-3 font-medium uppercase">
                    Email
                  </label>
                  <input
                    value={contractorData.email}
                    type="email"
                    name={names[1]}
                    required
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[0] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter Contractor Email"
                  />
                </div>

                <div className="w-[100%] px-5 py-2 mt-2">
                  <label className="block text-[12px] ml-3 font-medium uppercase">
                    Phone
                  </label>

                  <PatternFormat
                    type="tel"
                    format="+1 (###) ###-####"
                    name={names[2]}
                    value={contractorData?.phone}
                    placeholder="Enter Contractor Phone"
                    onChange={(e) => handleChange(e)}
                     className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[2] ? "border-red-600" : "border-gray-300"
                    }`}
                    required
                  />
                  {/* <input
                    value={contractorData.phone}
                    type="number"
                    name={names[2]}
                    required
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[2] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter Contractor Phone"
                  /> */}
                </div>

                {!edit ? (
                  <div className="w-[100%] px-5 py-2">
                    <label className="block text-[12px] ml-3 font-medium uppercase">
                      password
                    </label>
                    <input
                      value={contractorData.password}
                      type={viewPassword ? "password" : "text"}
                      name={names[3]}
                      required
                      onChange={(e) => handleChange(e)}
                      className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                        error[0] ? "border-red-600" : "border-gray-300"
                      }`}
                      placeholder="Enter Password"
                    />
                    {viewPassword ? (
                      <div
                        className="w-6 cursor-pointer ml-auto mt-[-2rem] mr-3 text-xl"
                        onClick={() => setViewPassword(false)}
                      >
                        <IoIosEyeOff />
                      </div>
                    ) : (
                      <div
                        className="w-6 cursor-pointer ml-auto mt-[-2rem] mr-3 text-xl"
                        onClick={() => setViewPassword(true)}
                      >
                        <IoMdEye />
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
              <div>
                <div className="w-[100%] px-5 py-2">
                  <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                      error[5] ? "border-red-600" : "border-gray-300"
                    }`}
                  >
                    {contractorData.image ? (
                      <>
                        {file ? (
                          <img
                            src={`${contractorData.image}`}
                            alt=""
                            className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                          />
                        ) : (
                          <img
                            src={`${IMAGE_PATH}${contractorData.image}`}
                            alt=""
                            className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                          />
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 ">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="dropzone-file"
                      accept="image/*"
                    
                      name={names[5]}
                      className="hidden"
                      onChange={(e) => convertToBase64(e)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Address
              </label>
              <input
                value={contractorData.address}
                type="text"
                required
                name={names[4]}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                  error[2] ? "border-red-600" : "border-gray-300"
                }`}
                placeholder="Enter Contractor Address"
              />
            </div>

            <div className="flex justify-center mt-8">
              {assignLoading ? (
                <button
                  disabled={assignLoading}
                  className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
                >
                  <ButtonLoading />
                </button>
              ) : (
                <input
                  type="submit"
                  value={"Submit"}
                  disabled={assignLoading}
                  className="bg-blue-600 cursor-pointer text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
                />
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ContractorAddEdit;
