import React, {useEffect, useState} from "react";
import {Dialog} from "@mui/material";
import JoditEditor from "jodit-react";

const RejectModal = ({open, setOpen, rejectFunction}) => {
    const [clicked, setClicked] = useState(false);
    const [detail, setDetail] = useState()


    const handleClose = () => {
        setOpen(!open);
    };
    const handleRequest = () => {
        rejectFunction(detail);
        setClicked(true);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            PaperProps={{style: {borderRadius: 20, padding: 15}}}
            style={{zIndex: 99999}}
            maxWidth={'md'}
            fullWidth={true}
        >
            <div className="relative w-full bg-white">
                <div
                    onClick={() => handleClose()}
                    className="absolute right-2 top-2 cursor-pointer"
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </div>
                <div className=" py-7 px-5 text-center">
                    <h3 className="font-bold pb-4">Write your message</h3>

                    <JoditEditor
                        value={detail}
                        onChange={(e) => setDetail(e)}

                    />
                    <div className="mt-5">
                        <button
                            onClick={() => handleClose()}
                            className="w-[120px] mr-1 rounded-xl border-gray-800 border-[1px] py-2 text-black font-medium hover:bg-gray-200 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleRequest()}
                            className="w-[120px] ml-1 rounded-xl bg-[#12947c] text-white py-2 font-medium hover:bg-[#12948f]"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default RejectModal;
