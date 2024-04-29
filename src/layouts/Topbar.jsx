import React, { Fragment, useEffect, useMemo, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { Popover, Transition } from "@headlessui/react";
import { CiUser } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import moment from "moment";

const Topbar = ({ showNav, setShowNav, setSearch }) => {
  const socket = useMemo(() => io("https://api.helperzz.com"), []);

  const [openMenu, setOpenMenu] = useState();
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("helperzz-jwt-auth-token");
    console.log(token);

    if (!token) {
      navigate("/login");
    } else {
      socket.on("newRequest", (value) => {
        const notification = {
          title: "New Service Request",
          message: `${value.subcategory_name} request ${value.time}`,
          time: moment(value.created_at).fromNow(),
        };
        const tempNotifcations = [...notifications];
        if (!tempNotifcations.includes(notification)) {
          tempNotifcations.unshift(notification);
          setNotifications(tempNotifcations);
        }
      });
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("helperzz-jwt-auth-token");
    navigate("/login");
  };

  return (
    <div
      className={`w-full h-20 flex bg-white justify-between shadow-2xl  items-center border-gray-300 border-b-[1px] transition-all duration-[400ms] ${
        showNav ? "pl-[15rem] max-sm:pl-[13rem]" : ""
      }`}
    >
      <div className="pl-4 md:pl-16 ">
        <HiMenuAlt2
          className="h-8 w-10 max-md:h-[20px] max-md:w-[20px] text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex w-full font-[600]">
        {/* <FaMagnifyingGlass /> */}
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="font-light border-[1px] border-gray-300 w-[95%] mx-auto pl-[1rem] pr-[1rem] rounded-3xl py-2 text-[14px] mt-[4px] focus:outline-none focus:ring-0 focus:border-gray-900 peer"
        />
      </div>
      <div>
        <div className="items-center md:pr-6 flex gap-6">
          <Popover className="relative">
            <Popover.Button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex outline-none cursor-pointer text-gray-700"
            >
              <FaBell className="h-6 w-6 mt-[4px]" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Popover.Panel className="mr-8 md:mr-10 absolute -right-16 max-sm:right-0 z-50 mt-4 border-[1px] bg-white shadow-sm rounded-md max-w-xs min-w-[400px] py-3">
                <center className="">
                  <div className="text-lg font-bold mb-3 mt-1">
                    Notifications
                  </div>
                  {notifications.map((value) => (
                    <div className="border-[1px] p-4">
                      <p className="text-left font-bold text-base">
                        {value.title}
                      </p>
                      <div className="flex justify-between">
                        <p className={`text-[12px] text-start`}>
                          {value.message}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {value.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </center>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Popover className="relative">
            <Popover.Button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex gap-2 outline-none mr-5 md:mr-8 cursor-pointer text-gray-700"
            >
              <CiUser className="h-8 w-8 border-2 rounded-full border-gray-600 p-2 mt-[4px]">
                <div>
                  <div className="text-left text-gray-700">Name</div>
                  <div className="text-left text-gray-700">Email</div>
                </div>
              </CiUser>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Popover.Panel className="mr-8 md:mr-10 absolute -right-16 max-sm:right-0 z-50 mt-3 bg-white  border-[1px] shadow-sm rounded-md max-w-xs max-sm:wi-[230px] w-[250px] py-3">
                <div>
                  <>
                    <center className="mt-5">
                      {/* <div className="text-[14px] font-[400]">{sessionUser?.name}</div>
                      <div className="text-[12px] font-[600]">{sessionUser?.email}</div> */}
                      <button
                        onClick={() => handleLogout()}
                        className="mt-5 text-center w-[50%] rounded bg-[#058ACA] hover:bg-[#046C9C] text-white font-[600] py-1 mb-5 shadow-md text-[0.8rem]"
                      >
                        Logout
                      </button>
                    </center>
                  </>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
