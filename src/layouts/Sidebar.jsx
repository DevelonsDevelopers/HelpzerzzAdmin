import React, { forwardRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdSpeakerNotes } from "react-icons/md";
import { FaBloggerB, FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { RiPagesFill, RiSendPlaneFill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";

const Sidebar = forwardRef(({}, ref) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleSelection = (index) => {
    let op = [...open];
    op[index] = !op[index];
    setOpen(op);
  };

  return (
    <>
      <div
        ref={ref}
        className="mt-[-5rem] fixed lg:w-[260px] md:w-[230px] w-[200px] h-full bg-white  border-gray-300 border-r-[1px]  shadow-2xl max-md:w-[180] overflow-auto no-scrollbar"
        style={{ zIndex: 9999 }}
      >
        <div className="flex flex-col mt-[2rem] mb-[1rem] ">
          <h3
            className={`text-[27px] text-gray-700 lg:ml-10 ml-6 font-semibold mb-6 `}
          >
            HELPERZZ
          </h3>
          <div className="lg:mx-4 md:mx-2">
            {/*//DASHBOARD*/}
            <div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className={`flex items-center w-[85%] p-2 mx-auto  lg:text-base md:text-sm ${
                  location.pathname === "/" ? "text-[#0D14FD]" : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD]`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <IoMdHome
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Dashboard
                </span>
              </button>
            </div>
            {/*Requests*/}
            <div>
              <button
                type="button"
                onClick={() => handleSelection(0)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/requests")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <RiSendPlaneFill
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Requests
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[0]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[0] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/requests");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Requests{" "}
                  </a>
                </li>
              </ul>
            </div>
            {/*ContractorRequest*/}
            <div>
              <button
                type="button"
                onClick={() => handleSelection(12)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/contractorrequest")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <RiSendPlaneFill
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Contractor Request
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[12]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[12] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/contractorrequest");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Contractor Requests{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(10)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/reviews")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <MdRateReview
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Reviews
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[10]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[10] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/reviews");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Reviews
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(1)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/categories")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff] hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <BiSolidCategory
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Categories
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[1]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <ul
                id="dropdown-example"
                className={`${open[1] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/categories");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Categories
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/categories/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Category
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/subcategories");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Subcategories{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/subcategories/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Subcategory
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(8)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/cities")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <FaCity
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Cities
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[8]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[8] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/cities");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Cities{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/cities/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add City
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(2)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/contractors")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <FaUserGroup
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Contractors
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[2]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[2] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/contractors");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Contractors{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/contractors/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Contractor
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(3)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/customers")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <FaUserGroup
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Customers
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[3]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[3] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/customers");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Customers{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(4)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/blogs")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <FaBloggerB
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Blogs
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[4]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[4] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/blogs");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Blogs{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/blogs/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(5)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/costGuides")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-blue-50  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <RiPagesFill
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Cost Guides
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[5]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[5] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/costGuides");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Cost Guides{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/costGuides/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Cost Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(6)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/testimonials")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff] hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <MdSpeakerNotes
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Testimonials
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[6]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[6] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/testimonials");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Testimonial{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/testimonials/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Testimonial
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(7)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/users")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <FaUserAlt
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Users
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[7]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[7] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/users");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Users{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/users/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Users
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(9)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/utils")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff] hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <BiSolidCategory
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Utils
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[9]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <ul
                id="dropdown-example"
                className={`${open[9] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/utils/highlights");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Highlights
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/utils/highlights/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Highlight
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/utils/languages");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Languages{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/utils/languages/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Language
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleSelection(11)}
                className={`flex items-center w-[85%] p-2 mx-auto lg:text-base md:text-sm ${
                  location.pathname.includes("/cities")
                    ? "text-[#0D14FD]"
                    : "text-gray-700"
                } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <IoDocumentTextSharp
                  className={`lg:text-xl md:text-lg mx-[6px] text-gray-700`}
                />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Success Story
                </span>
                <svg
                  className={`w-3 h-3 ${
                    open[8]
                      ? "-rotate-180 duration-300"
                      : "rotate-0 duration-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${open[11] ? "" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/story");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50  w-[84%] m-auto hover:font-bold"
                  >
                    Manage Story{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/story/add");
                    }}
                    className="cursor-pointer flex items-center p-2 text-[13px] text-gray-800 transition duration-75 rounded-lg pl-11 group  bg-gray-50 w-[84%] m-auto hover:font-bold"
                  >
                    Add Story
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Sidebar;
