import React, { useState } from "react";
import { IMAGE_PATH } from "../../../utils/constants";
import { deleteDocument } from "../../../api/reducers/contractor";
import { useDispatch } from "react-redux";
import ButtonLoading from "../../../components/ButtonLoading";
import DeleteModal from "../../../components/DeleteModal";
import deleteImage from "../../../components/assets/delete.png";

const Documents = ({ id, response }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleDelete = () => {
    dispatch(deleteDocument(deleteID));
  };

  return (
    <>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        deleteFunction={handleDelete}
        deleting={response.deleting}
      />
      <div className={`flex flex-row flex-wrap gap-5 mt-6 `}>
        {response?.contractorDetails?.documents?.map((value) => (
          <div
            className={`flex flex-col flex-wrap text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] border-[1px] rounded-2xl bg-gray-50 w-[200px]`}
          >
            <div className={`flex flex-col py-6 justify-center items-center`}>
              <img
                className="w-20 h-20"
                src={`${IMAGE_PATH}${value.file}`}
                alt=""
              />
              <span className={`mt-2 font-bold px-3`}>{value.title}</span>
            </div>
            <div
              onClick={() => initiateDelete(value.id)}
              className="w-8 mx-auto cursor-pointer hover:scale-125 pb-2"
            >
              <img src={deleteImage} alt="Delete" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Documents;
