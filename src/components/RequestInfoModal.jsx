import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";

const RequestInfoModal = ({ open, setOpen, requestInfoFunction }) => {
  const [clicked, setClicked] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
  const handleRequest = () => {
    requestInfoFunction();
    setClicked(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      PaperProps={{ style: { borderRadius: 20, padding: 15 } }}
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
        <div className="w-[350px] py-7 px-5 text-center">
          <h3 className="font-bold pb-4">Write your message to request info</h3>
          <textarea
            value=""
            name=""
            minLength="30"
            maxLength="500"
            rows="7"
            placeholder="Enter details here"
            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1}`}
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

export default RequestInfoModal;
