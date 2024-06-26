import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addCity,
  getCity,
  successListener,
  updateCity,
} from "../../api/reducers/city";
import ButtonLoading from "../../components/ButtonLoading";

const CityAddEdit = ({ edit = false }) => {
  const names = ["name", "state_code", "country_code", "longitude", "latitude"];
  const [error, setErrors] = useState([false, false, false, false, false]);
  const [assignLoading, setAssignLoading] = useState(false);

  const [cityData, setCityData] = useState({
    name: "",
    state_code: "",
    country_code: "",
    longitude: "",
    latitude: "",
    tag: "",
  });

  const response = useSelector((state) => state.city);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getCity());
    }
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        dispatch(getCity(params.get("id")));
      }
    }
  }, []);

  useEffect(() => {
    if (edit) {
      if (response.city) {
        setCityData(response.city);
      }
    }
  }, [response.city]);

  useEffect(() => {
    if (response.success) {
      navigate("/cities");
      dispatch(successListener());
    }
  }, [response.success]);

  const handleChange = (e) => {
    let tempErrors = [...error];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setCityData((data) => ({ ...data, [e.target.name]: e.target.value }));
    if (e.target.name === "name") {
      let tag = e.target.value.toLowerCase().replaceAll(" ", "-");
      setCityData((data) => ({ ...data, tag: tag }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = [...error];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = cityData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      setAssignLoading(true);
      if (edit) {
        dispatch(updateCity(cityData)).then(() => {
          setAssignLoading(false);
        });
      } else {
        dispatch(addCity(cityData)).then(() => {
          setAssignLoading(false);
        });
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center text-[25px] font-[800] mt-5 uppercase">
          {edit ? "Edit City" : "Add City"}
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto"
        >
          <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Name
              </label>
              <input
                type="text"
                name={names[0]}
                required
                value={cityData.name}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter Name Here"
              />
            </div>
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                State Code
              </label>
              <input
                type="text"
                name={names[1]}
                required
                value={cityData.state_code}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter State Code Here"
              />
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-3 flex-wrap mt-3">
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Country Code
              </label>
              <input
                type="text"
                name={names[2]}
                required
                value={cityData.country_code}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter Country Code Here"
              />
            </div>
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Longitude
              </label>
              <input
                type="text"
                name={names[3]}
                required
                value={cityData.longitude}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter Longitude Here"
              />
            </div>
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Latitude
              </label>
              <input
                type="text"
                name={names[4]}
                required
                value={cityData.latitude}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter Latitude Here"
              />
            </div>
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
    </>
  );
};

export default CityAddEdit;
