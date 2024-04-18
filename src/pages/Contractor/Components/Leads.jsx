import React from 'react';

const Leads = ({ id, response }) => {

    return (
        <>
            <div>
                <div className="w-full flex flex-col justify-center">
                    <div className={`grid grid-cols-2 gap-2`}>
                        {response?.contractorDetails?.leads?.map((value) => (
                            <div className="border-gray-600 border-[1px] rounded-lg text-[#000000] text-sm w-[100%]">
                                <div
                                    className="py-[2%] text-center text-md font-bold mx-auto  justify-center min-w-[50px]">
                                    {value?.home_type}
                                </div>
                                <div
                                    className="py-[2%] text-center text-lg font-semibold mx-auto  justify-center min-w-[50px]">
                                    {value?.time}
                                </div>
                                <div
                                    className="py-[2%] text-center text-sm font-medium mx-auto  justify-center min-w-[50px]">
                                    {value?.details}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Leads;
