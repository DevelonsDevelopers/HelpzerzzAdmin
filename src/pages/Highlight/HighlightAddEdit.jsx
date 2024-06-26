import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IMAGE_PATH } from "../../utils/constants";
import {
  addHighlight,
  getHighlight,
  successListener,
  updateHighlight,
} from "../../api/reducers/highlight";
import ButtonLoading from "../../components/ButtonLoading";
import Loading from "../../components/Loading";

const HighlightAddEdit = ({ edit = false }) => {
  const names = ["highlight", "icon"];
  const [error, setErrors] = useState([false, false]);
  const [assignLoading, setAssignLoading] = useState(false);

  const [highlightData, setHighlightData] = useState({
    highlight: "",
    icon: "",
  });
  const [file, setFile] = useState();

  const response = useSelector((state) => state.highlight);

  console.log(response);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getHighlight());
    }
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        dispatch(getHighlight(params.get("id")));
      }
    }
  }, []);

  useEffect(() => {
    if (edit) {
      if (response.highlight) {
        setHighlightData(response.highlight);
      }
    }
  }, [response.highlight]);

  useEffect(() => {
    if (response.success) {
      navigate("/utils/highlights");
      dispatch(successListener());
    }
  }, [response.success]);

  const handleChange = (e) => {
    let tempErrors = [...error];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setHighlightData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        let tempErrors = [...error];
        tempErrors[1] = false;
        setErrors(tempErrors);
        setHighlightData((p) => ({ ...p, icon: reader.result }));
      };
    }
  };

  const handleSubmit = () => {
    let tempErrors = [...error];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = highlightData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      setAssignLoading(true);

      if (edit) {
        dispatch(
          updateHighlight({ file: file, highlight: highlightData })
        ).then(() => {
          setAssignLoading(false);
        });
      } else {
        dispatch(addHighlight({ file: file, highlight: highlightData })).then(
          () => {
            setAssignLoading(false);
          }
        );
      }
    }
  };

  return (
    <>
      {response.highlightLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-center font-[800] text-[25px] uppercase mt-5">
            Add Highlight
          </h1>
          <div className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
            <div>
              <div className="w-[50%] px-5 py-2 mx-auto">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Highlight
                </label>
                <input
                  value={highlightData.highlight}
                  type="text"
                  name={names[0]}
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                    error[0] ? "border-red-600" : "border-gray-300"
                  }`}
                  placeholder="Enter Highlight Here"
                />
              </div>
            </div>
            <div className="w-[50%] px-5 py-2 mx-auto">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                  error[1] ? "border-red-600" : "border-gray-300"
                }`}
              >
                {highlightData.icon ? (
                  <>
                    {file ? (
                      <img
                        src={`${highlightData.icon}`}
                        alt=""
                        className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                      />
                    ) : (
                      <img
                        src={`${IMAGE_PATH}${highlightData.icon}`}
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
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

                  name={names[1]}
                  className="hidden"
                  onChange={(e) => convertToBase64(e)}
                />
              </label>
            </div>

            <div className="flex justify-center mt-8">
              <button
                disabled={assignLoading}
                onClick={() => handleSubmit()}
                className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
              >
                {assignLoading ? <ButtonLoading /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HighlightAddEdit;
