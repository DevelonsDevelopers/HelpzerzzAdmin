import React from 'react';
import PortalLayout from "../../layouts/PortalLayout";

const UserAddEdit = () => {
    return (
        <>
            <div>
                <h1 className='text-center text-[25px] font-[800] mt-5 uppercase'>Add Users</h1>
                <div className='bg-white mt-[3rem] rounded-xl px-[8rem] py-16 flex flex-col mx-8'>
                    <div className="w-[100%] px-5 py-2 mt-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            Name
                        </label>
                        <input
                            type="text"
                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                            placeholder="Enter Your Name"/>
                    </div>
                    <div className="w-[100%] px-5 py-2 mt-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            UserName
                        </label>
                        <input
                            type="text"
                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                            placeholder="Enter Your UserName"/>
                    </div>
                    <div className="w-[100%] px-5 py-2 mt-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                            placeholder="Enter Your Email Address"/>
                    </div>
                    <div className="w-[100%] px-5 py-2 mt-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            Password
                        </label>
                        <input
                            type="password"
                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                            placeholder="Enter Your Password"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserAddEdit;
