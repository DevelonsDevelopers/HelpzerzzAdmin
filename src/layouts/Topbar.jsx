import React, {Fragment, useEffect, useState} from 'react';
import {HiMenuAlt2} from "react-icons/hi";
import {Popover, Transition} from "@headlessui/react";
import {CiUser} from "react-icons/ci";
import {FaBell} from "react-icons/fa";
import {IoSearchOutline} from "react-icons/io5";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";



const Topbar = ({showNav, setShowNav}) => {

    const [openMenu, setOpenMenu] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('helperzz-jwt-auth-token');
        if (!token) {
            navigate('/login')
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('helperzz-jwt-auth-token');
        navigate('/login')
    }

    return (
        <div
            className={`w-full h-16 flex bg-white justify-between items-center transition-all duration-[400ms] ${showNav ? 'pl-[13rem] max-sm:pl-[14rem]' : ""}`}>
            <div className='pl-4 md:pl-16'>
                <HiMenuAlt2 className='h-8 w-10 max-md:h-[20px] max-md:w-[20px] text-gray-700 cursor-pointer'
                            onClick={() => setShowNav(!showNav)}/>
            </div>
            <div className="flex w-full font-[600]">
                <input type="search" name="search" id="search" placeholder="Search Here"
                       className="font-light border-[1px] border-gray-400 w-[95%] mx-auto pl-[1rem] pr-[1rem] rounded-3xl py-2 text-[14px] mt-[4px] focus:outline-none focus:ring-0 focus:border-gray-900 peer"/>

            </div>
            <div>
                <div className='items-center md:pr-6 flex gap-6'>

                    <FaBell className="h-6 w-6 mt-[4px]"/>

                    <Popover className="relative">
                        <Popover.Button onClick={() => setOpenMenu(!openMenu)}
                                        className="flex gap-2 outline-none mr-5 md:mr-8 cursor-pointer text-gray-700">
                            <CiUser className='h-8 w-8 border-2 rounded-full border-gray-600 p-2 mt-[4px]'>
                                <div>
                                    <div className='text-left text-gray-700'>Name</div>
                                    <div className='text-left text-gray-700'>Email</div>
                                </div>
                            </CiUser>
                        </Popover.Button>
                        <Transition as={Fragment} enter='transition ease-out duration-100'
                                    enterFrom='transform scale-95' enterTo='transform scale-100'
                                    leave='transition ease-in duration-75' leaveFrom='transform scale-100'
                                    leaveTo='transform scale-95'>
                            <Popover.Panel
                                className="mr-8 md:mr-10 absolute -right-16 max-sm:right-0 z-50 mt-4 bg-white shadow-sm rounded-md max-w-xs max-sm:wi-[230px] w-[250px] py-3">
                                <div>
                                    <>
                                        <center className="mt-5">
                                            {/*<div className="text-[14px] font-[400]">{sessionUser?.name}</div>*/}
                                            {/*<div className="text-[12px] font-[600]">{sessionUser?.email}</div>*/}
                                            <button onClick={() => handleLogout()}
                                                    className="mt-5 text-center w-[50%] rounded bg-[#058ACA] hover:bg-[#046C9C] text-white font-[600] py-1 mb-5 shadow-md text-[0.8rem]">
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
