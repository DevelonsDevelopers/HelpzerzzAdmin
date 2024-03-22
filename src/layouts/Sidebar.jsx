import React, {forwardRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {TbCategory} from "react-icons/tb";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {FaRegUser} from "react-icons/fa";



const Sidebar = forwardRef(({}, ref) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [selected, setSelected] = useState('')

    const handleSelection = (val) => {
        if (selected === val){
            setSelected('')
        } else {
            setSelected(val)
        }
    }

    return (
        <div ref={ref}
             className="mt-[-4rem] fixed w-64 h-full bg-white rounded-r-[1.4rem] shadow-sm max-md:w-[40%] overflow-auto no-scrollbar">
            <div className="flex flex-col mt-[2rem]">

                {/*//DASHBOARD*/}
                <div>
                    <button type="button" onClick={() => navigate('/')}
                            className="flex items-center w-[85%] p-2 mx-auto text-base text-gray-900 transition duration-75 rounded-lg group bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <TbCategory/>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Dashboard</span>
                    </button>
                </div>

                <div>
                    <button type="button" onClick={() => handleSelection('category')}
                            className="flex items-center w-[85%] p-2 mx-auto text-base text-gray-900 transition duration-75 rounded-lg group bg-blue-50 hover:bg-blue-100 hover:text-blue-700 mt-3"
                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <TbCategory/>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Categories</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>

                    <ul id="dropdown-example" className={`${selected === 'category' ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/categories')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100  w-[84%] m-auto hover:font-bold">List </a>
                        </li>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/categories/add')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100 w-[84%] m-auto hover:font-bold">Add</a>
                        </li>

                    </ul>

                </div>

                <div>
                    <button type="button" onClick={() => handleSelection('contractor')}
                            className="flex items-center w-[85%] p-2 mx-auto text-base text-gray-900 transition duration-75 rounded-lg group bg-blue-50 hover:bg-blue-100 hover:text-blue-700 mt-3"
                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <FaRegUser/>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Contractors</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <ul id="dropdown-example" className={`${selected === 'contractor' ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/contractors')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100  w-[84%] m-auto hover:font-bold">List </a>
                        </li>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/contractors/add')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100 w-[84%] m-auto hover:font-bold">Add</a>
                        </li>

                    </ul>
                </div>

                <div>
                    <button type="button" onClick={() => handleSelection('blog')}
                            className="flex items-center w-[85%] p-2 mx-auto text-base text-gray-900 transition duration-75 rounded-lg group bg-blue-50 hover:bg-blue-100 hover:text-blue-700 mt-3"
                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <FaRegUser/>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Blogs</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <ul id="dropdown-example" className={`${selected === 'blog' ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/blogs')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100  w-[84%] m-auto hover:font-bold">List </a>
                        </li>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/blogs/add')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100 w-[84%] m-auto hover:font-bold">Add</a>
                        </li>

                    </ul>
                </div>

                <div>
                    <button type="button" onClick={() => handleSelection('costGuide')}
                            className="flex items-center w-[85%] p-2 mx-auto text-base text-gray-900 transition duration-75 rounded-lg group bg-blue-50 hover:bg-blue-100 hover:text-blue-700 mt-3"
                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <FaRegUser/>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Cost Guides</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <ul id="dropdown-example" className={`${selected === 'costGuide' ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/costGuides')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100  w-[84%] m-auto hover:font-bold">List </a>
                        </li>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/costGuides/add')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100 w-[84%] m-auto hover:font-bold">Add</a>
                        </li>

                    </ul>
                </div>

                <div>
                    <button type="button" onClick={() => handleSelection('user')}
                            className="flex items-center w-[85%] p-2 mx-auto text-base text-gray-900 transition duration-75 rounded-lg group bg-blue-50 hover:bg-blue-100 hover:text-blue-700 mt-3"
                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <FaRegUser/>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Users</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <ul id="dropdown-example" className={`${selected === 'user' ? '' : 'hidden'} py-2 space-y-2`}>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/users')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100  w-[84%] m-auto hover:font-bold">List </a>
                        </li>
                        <li>
                            <a onClick={(e) => {
                                e.preventDefault()
                                navigate('/users/add')
                            }}
                               className="cursor-pointer flex items-center p-2 text-[13px] text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 bg-gray-100 w-[84%] m-auto hover:font-bold">Add</a>
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    )
});

export default Sidebar;
