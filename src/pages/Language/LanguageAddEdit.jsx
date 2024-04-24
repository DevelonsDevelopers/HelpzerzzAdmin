import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addLanguage,
  getLanguage,
  successListener,
  updateLanguage,
} from "../../api/reducers/language";
import Loading from "../../components/Loading";

const LanguageAddEdit = ({ edit = false }) => {
  const names = ["language"];
  const [error, setErrors] = useState([false]);
  const [languageData, setLanguageData] = useState({
    language: "",
  });

  const response = useSelector((state) => state.language);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getLanguage());
    }
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        dispatch(getLanguage(params.get("id")));
      }
    }
  }, []);

  useEffect(() => {
    if (edit) {
      if (response.language) {
        setLanguageData(response.language);
      }
    }
  }, [response.language]);

  useEffect(() => {
    if (response.success) {
      navigate("/utils/languages");
      dispatch(successListener());
    }
  }, [response.success]);

  const handleChange = (e) => {
    let tempErrors = [...error];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setLanguageData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    let tempErrors = [...error];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = languageData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      if (edit) {
        dispatch(updateLanguage(languageData));
      } else {
        dispatch(addLanguage(languageData));
      }
    }
  };

  return (
    <>
      {response.languageLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-center font-[800] text-[25px] uppercase mt-5">
            Add Language
          </h1>
          <div className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
            <div className="min-w-[250px]">
              <div>
                <div className="sm:w-[50%] w-full px-5 py-2 mt-2 mx-auto">
                  <label className="block text-[12px] ml-3 font-medium uppercase">
                    Language
                  </label>
                  <input
                    value={languageData.language}
                    type="text"
                    name={names[0]}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[0] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter language Here"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => handleSubmit()}
                className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageAddEdit;
