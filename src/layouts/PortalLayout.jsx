import React, { Fragment, useState, useEffect, useRef } from "react";
import Topbar from "./Topbar";
import { Transition } from "@headlessui/react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const PortalLayout = ({ children }) => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const sidebarRef = useRef(true);

  useEffect(() => {
    function handleResize() {
      setShowNav(window.innerWidth >= 748);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("sidebar-toggle") &&
        window.innerWidth < 748
      ) {
        setShowNav(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNav]);

  return (
    <div>
      {location.pathname === "/login" ? (
        children
      ) : (
        <div>
          <Topbar showNav={showNav} setShowNav={setShowNav} />
          <Transition
            as={Fragment}
            show={showNav}
            enter="transform transition duration-[400ms]"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform duration-[400ms] transition ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div ref={sidebarRef}>
              <Sidebar />
            </div>
          </Transition>
          <main
            className={`bg-gray-100 pt-6 transition-all duration-[400ms] ${
              showNav ? "lg:pl-56 md:pl-[22%]" : ""
            }`}
          >
            <div className="bg-gray-100 px-4 md:px-16 min-h-screen max-h-[100%] pb-[4rem] ">
              {children}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default PortalLayout;
