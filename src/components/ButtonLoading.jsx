import React from "react";

const ButtonLoading = () => {
  return (
    <center>
      <div className="flex justify-center items-center bg-transparent">
        <div className="animate-spin rounded-full h-6 w-6 my-[2px] mx-5 border-t-2 border-blue-500"></div>
      </div>
    </center>
  );
};

export default ButtonLoading;
