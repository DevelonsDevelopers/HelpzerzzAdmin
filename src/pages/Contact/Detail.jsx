import { Button } from "@mui/material";
import React, { useState } from "react";
import ContactReplyModal from "../../components/ContactReplyModal";

const Detail = () => {
const [open , setOpen] = useState(false)
 
  return (
    <div>
        <ContactReplyModal  open={open} setOpen={setOpen} />
      <h1 className="text-center font-[600] text-xl uppercase ">
        Contact us Detail
      </h1>
      <div className="flex flex-row-reverse mt-6">
      <Button onClick={() =>  setOpen(!open)} variant="contained" className="mt-2 " >Reply</Button>
      </div>

      <div className="flex-col justify-center  items-center border-[1px] border-gray-400 p-8 rounded-md mt-10">
        <div className="flex gap-2 justify-between">
          <label>First name</label>
          <p>:</p>
          <p>first name </p>
        </div>
        <div className="flex gap-2 justify-between mt-2">
          <label>Last name</label>
          <p>:</p>
          <p>last name </p>
        </div>
        <div className="flex gap-2 justify-between mt-2">
          <label>Company</label>
          <p>:</p>
          <p>company</p>
        </div>
        <div className="flex gap-2 justify-between mt-2">
          <label>Email</label>
          <p>:</p>
          <p>email</p>
        </div>
        <div className="flex gap-2 justify-between mt-2">
          <label>Phone</label>
          <p>:</p>
          <p>phone</p>
        </div>
        <div className="flex gap-2 justify-between mt-2">
          <label>Topic</label>
          <p>:</p>
          <p>Topic</p>
        </div>
        <div className="flex gap-2 justify-between mt-2">
          <label>Type</label>
          <p>:</p>
          <p>Type</p>
        </div>
        <div className="flex gap-2 justify-between mt-2">
          <label>Message</label>
          <p>:</p>
          <p>Message</p>
        </div>
      </div>



    </div>
  );
};

export default Detail;
