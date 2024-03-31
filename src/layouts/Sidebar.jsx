import React, { forwardRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdSpeakerNotes } from "react-icons/md";
import { FaBloggerB, FaUserAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { RiPagesFill, RiSendPlaneFill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";

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
  ]);

  const handleSelection = (index) => {
    let op = [...open];
    op[index] = !op[index];
    setOpen(op);
  };

  return (
    <div
      ref={ref}
      className="mt-[-4rem] fixed w-[260px] h-[full] bg-white  border-gray-300 border-r-[1px]  shadow-2xl max-md:w-[40%] overflow-auto no-scrollbar"
    >
      <div className="flex flex-col mt-[2rem] mb-[1rem]">
        <h3 className={`text-[27px] text-gray-700 ml-10 font-semibold mb-6 `}>
          HELPERZZ
        </h3>
        <div className="mx-4">
          {/*//DASHBOARD*/}
          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname === "/" ? "text-[#0D14FD]" : "text-gray-700"
              } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD]`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <IoMdHome className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Dashboard
              </span>
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => handleSelection(0)}
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname.includes("/requests")
                  ? "text-[#0D14FD]"
                  : "text-gray-700"
              } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <RiSendPlaneFill className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Requests
              </span>
              <svg
                className={`w-3 h-3 ${
                  open[0] ? "-rotate-180 duration-300" : "rotate-0 duration-300"
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

          <div>
            <button
              type="button"
              onClick={() => handleSelection(1)}
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname.includes("/categories")
                  ? "text-[#0D14FD]"
                  : "text-gray-700"
              } transition duration-75 rounded-lg group bg-[#f2f9ff] hover:text-[#0D14FD] mt-3`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <BiSolidCategory className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Categories
              </span>
              <svg
                className={`w-3 h-3 ${
                  open[1] ? "-rotate-180 duration-300" : "rotate-0 duration-300"
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
              onClick={() => handleSelection(2)}
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname.includes("/contractors")
                  ? "text-[#0D14FD]"
                  : "text-gray-700"
              } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <FaUserGroup className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Contractors
              </span>
              <svg
                className={`w-3 h-3 ${
                  open[2] ? "-rotate-180 duration-300" : "rotate-0 duration-300"
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
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname.includes("/customers")
                  ? "text-[#0D14FD]"
                  : "text-gray-700"
              } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <FaUserGroup className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Customers
              </span>
              <svg
                className={`w-3 h-3 ${
                  open[3] ? "-rotate-180 duration-300" : "rotate-0 duration-300"
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
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname.includes("/blogs")
                  ? "text-[#0D14FD]"
                  : "text-gray-700"
              } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <FaBloggerB className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Blogs
              </span>
              <svg
                className={`w-3 h-3 ${
                  open[4] ? "-rotate-180 duration-300" : "rotate-0 duration-300"
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
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname.includes("/costGuides")
                  ? "text-[#0D14FD]"
                  : "text-gray-700"
              } transition duration-75 rounded-lg group bg-blue-50  hover:text-[#0D14FD] mt-3`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <RiPagesFill className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Cost Guides
              </span>
              <svg
                className={`w-3 h-3 ${
                  open[5] ? "-rotate-180 duration-300" : "rotate-0 duration-300"
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
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname.includes("/testimonials")
                  ? "text-[#0D14FD]"
                  : "text-gray-700"
              } transition duration-75 rounded-lg group bg-[#f2f9ff] hover:text-[#0D14FD] mt-3`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <MdSpeakerNotes className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Testimonials
              </span>
              <svg
                className={`w-3 h-3 ${
                  open[6] ? "-rotate-180 duration-300" : "rotate-0 duration-300"
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

          <div className="mb-8">
            <button
              type="button"
              onClick={() => handleSelection(7)}
              className={`flex items-center w-[85%] p-2 mx-auto text-base ${
                location.pathname.includes("/users")
                  ? "text-[#0D14FD]"
                  : "text-gray-700"
              } transition duration-75 rounded-lg group bg-[#f2f9ff]  hover:text-[#0D14FD] mt-3`}
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <FaUserAlt className={`text-xl mx-[6px] text-gray-700`} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Users
              </span>
              <svg
                className={`w-3 h-3 ${
                  open[7] ? "-rotate-180 duration-300" : "rotate-0 duration-300"
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
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
