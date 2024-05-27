import React, { useEffect, useState } from "react";
import { IMAGE_PATH } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addBadge,
  badgeSuccessListener,
  deleteBadge,
} from "../../../api/reducers/contractor";
import deleteImage from "../../../components/assets/delete.png";
import DeleteModal from "../../../components/DeleteModal";
import ButtonLoading from "../../../components/ButtonLoading";

const Badges = ({ id, response }) => {
  const names = ["title", "subtitle", "date", "image"];
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [errors, setErrors] = useState([false, false, false, false]);
  const [assignLoading, setAssignLoading] = useState(false);
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
      setAssignLoading(true);

      dispatch(addBadge({ file: file, badge: badgeData })).then(() => {
        setAssignLoading(false);
      });
    }
  };

  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleDelete = () => {
    dispatch(deleteBadge(deleteID));
  };

  return (
    <div>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        deleteFunction={handleDelete}
        deleting={response.deleting}
      />
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
                    accept="image/*"

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
              disabled={assignLoading}
              onClick={() => handleSubmit()}
              className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
            >
              {assignLoading ? <ButtonLoading /> : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Badges</h3>

            <button
              onClick={() => setAdd(true)}
              className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110"
            >
              Add Badge
            </button>
          </div>
          <div className={`flex flex-row flex-wrap gap-5 mt-3 `}>
            {response?.contractorDetails?.badges?.map((value) => (
              <div
                className={`flex flex-col flex-wrap text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] border-[1px] rounded-2xl bg-gray-50 w-[200px]`}
              >
                <div
                  className={`flex flex-col py-4 justify-center items-center`}
                >
                  <img
                    className="w-20 h-20"
                    src={`${IMAGE_PATH}${value.image}`}
                    alt=""
                  />
                  <span className={`mt-2 font-bold px-3`}>{value.title}</span>
                  <span className={`mt-1 font-medium text-[12px] px-3`}>
                    {value.subtitle}
                  </span>
                </div>
                <div
                  onClick={() => initiateDelete(value.id)}
                  className="w-8 mx-auto cursor-pointer hover:scale-125 pb-2"
                >
                  <img src={deleteImage} alt="Delete" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Badges;
