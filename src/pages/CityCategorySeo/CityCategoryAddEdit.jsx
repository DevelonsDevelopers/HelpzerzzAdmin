import React, { useEffect, useState } from "react";
import ButtonLoading from "../../components/ButtonLoading";
import { useLocation, useNavigate } from "react-router-dom";
import seoService from "../../api/services/seoService";
import toast from "react-hot-toast";

const CityCategoryAddEdit = ({ edit = false }) => {
  const [assignLoading, setAssignLoading] = useState();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const [editFormData, setEditFormData] = useState();

  // console.log('params' , params.get('cityid'));
  // console.log('params' , params.get('categoryid'));

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: params.get("cityid"),
    category: params.get("categoryid"),
    meta_title: "",
    meta_description: "",
    page_description: "",
  });

  useEffect(() => {
    if (edit) {
      seoService.fetch(params.get("seoid")).then((res) => {
        console.log("res of fetch seo ",res );
      });
    }
  }, []);

  useEffect(() => {
    if (edit) {
      setFormData({
        ...formData,
        meta_title: editFormData?.meta_title,
        meta_description: editFormData?.meta_description,
        page_description: editFormData?.page_description,
      });
    }
  },[editFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssignLoading(true);
    if (edit) {
        seoService
        .createCityCategorySEO(formData)
        .then((res) => {
          console.log("res of edit", res);
        })
        .catch((error) => {
          console.error("Error creating city category SEO:", error);
        })
        .finally(() => {
          setAssignLoading(false);
          toast.success("city category seo edit successfuly");
          navigate("/cityCategory");
        });

    } else {
      seoService
        .createCityCategorySEO(formData)
        .then((res) => {
          console.log("res of create", res);
        })
        .catch((error) => {
          console.error("Error creating city category SEO:", error);
        })
        .finally(() => {
          setAssignLoading(false);
          toast.success("city category seo added successfuly");
          navigate("/cityCategory");
        });
    }
  };

  return (
    <div>
      <h1 className="text-center text-[25px] font-[800] mt-5 uppercase">
        {edit ? "Edit SEO" : "Create SEO"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto"
      >
        <div className="w-[100%] px-5 py-2 mt-2">
          <label className="block text-[12px] ml-3 font-medium uppercase">
            Meta Title
          </label>
          <input
            type="text"
            required
            value={formData.meta_title}
            onChange={(e) =>
              setFormData({ ...formData, meta_title: e.target.value })
            }
            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
            placeholder="Enter Meta Title"
          />
        </div>
        <div className="w-[100%] px-5 py-2 mt-2">
          <label className="block text-[12px] ml-3 font-medium uppercase">
            Meta Description
          </label>
          <textarea
            type="text"
            required
            rows={5}
            value={formData.meta_description}
            onChange={(e) =>
              setFormData({ ...formData, meta_description: e.target.value })
            }
            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
            placeholder="Enter Meta Description"
          />
        </div>
        <div className="w-[100%] px-5 py-2 mt-2">
          <label className="block text-[12px] ml-3 font-medium uppercase">
            Page Description
          </label>
          <textarea
            type="text"
            required
            rows={5}
            value={formData.page_description}
            onChange={(e) =>
              setFormData({ ...formData, page_description: e.target.value })
            }
            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
            placeholder="Enter Page Description"
          />
        </div>

        <div className="flex justify-center mt-8">
          {assignLoading ? (
            <button
              disabled={assignLoading}
              className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
            >
              <ButtonLoading />
            </button>
          ) : (
            <input
              type="submit"
              value={"Submit"}
              disabled={assignLoading}
              className="bg-blue-600 cursor-pointer text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CityCategoryAddEdit;
