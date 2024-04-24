import React, { useEffect, useState } from "react";
import { IMAGE_PATH } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addBadge,
  badgeSuccessListener,
} from "../../../api/reducers/contractor";

const Badges = ({ id, response }) => {
  const names = ["title", "subtitle", "date", "image"];

  const [errors, setErrors] = useState([false, false, false, false]);
  const [badgeData, setBadgeData] = useState({
    contractor: 0,
    subtitle: "",
    title: "",
    date: "",
    image: "",
  });
  const [add, setAdd] = useState(false);
  const [file, setFile] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setBadgeData((data) => ({ ...data, contractor: parseInt(id) }));
    }
  }, [id]);

  useEffect(() => {
    if (response.badgeSuccess) {
      navigate("/contractors");
      dispatch(badgeSuccessListener());
    }
  }, [response.badgeSuccess]);

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    if (e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        let tempErrors = [...errors];
        tempErrors[2] = false;
        setErrors(tempErrors);
        setFile(e.target.files[0]);
        setBadgeData((data) => ({ ...data, image: reader.result }));
      };
    }
  };

  const handleChange = (e) => {
    let tempErrors = [...errors];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setBadgeData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    let tempErrors = [...errors];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = badgeData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      dispatch(addBadge({ file: file, badge: badgeData }));
    }
  };

  return (
    <div>
      {add ? (
        <div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-2 flex-wrap">
            <div className="min-w-[250px]">
              <div className="w-[100%] px-5 py-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Title
                </label>
                <input
                  value={badgeData.title}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name={names[0]}
                  placeholder="Enter Title Here"
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                    errors[0] ? "border-red-600" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="w-[100%] px-5 py-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Subtitle
                </label>
                <input
                  value={badgeData.subtitle}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name={names[1]}
                  placeholder="Enter Subtitle Here"
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                    errors[1] ? "border-red-600" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="w-[100%] px-5 py-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Date
                </label>
                <input
                  value={badgeData.date}
                  onChange={(e) => handleChange(e)}
                  type="date"
                  name={names[2]}
                  placeholder="Enter Date Here"
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                    errors[2] ? "border-red-600" : "border-gray-300"
                  }`}
                />
              </div>
            </div>
            <div>
              <div className="min-w-[250px] w-[100%] ">
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full h-60 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-[2.0rem] ${
                    errors[3] ? "border-red-600" : "border-gray-300"
                  }`}
                >
                  {badgeData.image ? (
                    <>
                      {file ? (
                        <img
                          src={`${badgeData.image}`}
                          alt=""
                          className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                        />
                      ) : (
                        <img
                          src={`${IMAGE_PATH}${badgeData.image}`}
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
                    name={names[3]}
                    className="hidden"
                    onChange={convertToBase64}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => handleSubmit()}
              className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => setAdd(true)}
            className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
          >
            Add Badge
          </button>
          <div className={`grid grid-cols-5 gap-2 mt-6`}>
            {response?.contractorDetails?.badges?.map((value) => (
              <div
                className={`flex flex-col text-center border-gray-600 border-[1px] rounded-2xl bg-gray-50`}
              >
                <div
                  className={`flex flex-col py-6 justify-center items-center`}
                >
                  <img
                    className="w-20 h-20"
                    src={`${IMAGE_PATH}${value.image}`}
                    alt=""
                  />
                  <span className={`mt-2 font-bold`}>{value.title}</span>
                  <span className={`mt-1 font-medium text-[12px]`}>
                    {value.subtitle}
                  </span>
                </div>
                <button
                  className={`mb-0 bg-red-700 rounded-b-2xl text-white py-2`}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Badges;
