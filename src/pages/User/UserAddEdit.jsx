import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addUser,
  getUser,
  successListener,
  updateUser,
} from "../../api/reducers/user";

const UserAddEdit = ({ edit = false }) => {
  const names = ["name", "username", "email", "password"];
  const [error, setErrors] = useState([false, false, false, false]);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const response = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        dispatch(getUser(params.get("id")));
      }
    }
  }, []);

  useEffect(() => {
    if (edit) {
      if (response.user) {
        setUserData(response.user);
      }
    }
  }, [response.user]);

  useEffect(() => {
    if (response.success) {
      navigate("/users");
      dispatch(successListener());
    }
  }, [response.success]);

  const handleChange = (e) => {
    let tempErrors = [...error];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setUserData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    let tempErrors = [...error];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = userData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      if (edit) {
        dispatch(updateUser(userData));
      } else {
        dispatch(addUser(userData));
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center text-[25px] font-[800] mt-5 uppercase">
          Add User
        </h1>
        <div className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
          <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Name
              </label>
              <input
                type="text"
                name={names[0]}
                value={userData.name}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                UserName
              </label>
              <input
                type="text"
                name={names[1]}
                value={userData.username}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter Your Username"
              />
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Email
              </label>
              <input
                type="email"
                name={names[2]}
                value={userData.email}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="w-[100%] px-5 py-2 mt-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Password
              </label>
              <input
                type="password"
                name={names[3]}
                value={userData.password}
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                placeholder="Enter Your Password"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAddEdit;
