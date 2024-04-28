import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import {
  addContractorDetails,
  detailsSuccessListener,
  editContractorDetails,
} from "../../../api/reducers/contractor";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActiveCategories } from "../../../api/reducers/category";
import ButtonLoading from "../../../components/ButtonLoading";

const Details = ({ id, response }) => {
  const [assignLoading, setAssignLoading] = useState(false);
 
  const names = [
    "company_name",
    "category",
    "postal_code",
    "skills",
    "service_areas",
    "availability_days",
    "availability_hours",
    "website",
    "address",
    "description",
    "trust_seal",
  ];
  const [error, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [detailsData, setDetailsData] = useState({
    contractor: id,
    company_name: "",
    address: "",
    postal_code: "",
    category: "",
    skills: "",
    service_areas: "",
    availability_days: "",
    availability_hours: "",
    website: "",
    description: "",
    trust_seal: 0,
  });

  useEffect(() => {
    if (id) {
      setDetailsData((data) => ({ ...data, contractor: parseInt(id) }));
    }
  }, [id]);

  const [edit, setEdit] = useState(false);

  const categoryResponse = useSelector((state) => state.category);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categoryResponse.activeFetched) {
      dispatch(getActiveCategories());
    }
  }, [categoryResponse.activeFetched]);

  useEffect(() => {
    if (response.contractorDetails?.details) {
      setEdit(true);
      setDetailsData(response.contractorDetails.details);
    }
  }, [response.contractorDetails]);

  useEffect(() => {
    if (response.detailSuccess) {
      navigate("/contractors");
      dispatch(detailsSuccessListener());
    }
  }, [response.detailSuccess]);

  const handleChange = (e) => {
    let tempErrors = [...error];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setDetailsData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    let tempErrors = [...error];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = detailsData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      setAssignLoading(true);
      if (edit) {
        dispatch(editContractorDetails(detailsData)).then(() => {
          setAssignLoading(false);
        });
      } else {
        dispatch(addContractorDetails(detailsData)).then(() => {
          setAssignLoading(false);
        });
      }
    }
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-2">
          <div className="w-[100%] px-5 py-2">
            <label className="block text-[12px] ml-3 font-medium uppercase">
              Company Name
            </label>
            <input
              type="text"
              name={names[0]}
              placeholder="Enter Your Company Name"
              value={detailsData.company_name}
              onChange={(e) => handleChange(e)}
              className={
                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
              }
            />
          </div>

          <div className="w-[100%] px-5 py-2 mt-2">
            <label className="block text-[12px] ml-3 font-medium uppercase">
              Category
            </label>
            <select
              name={names[1]}
              value={detailsData.category}
              onChange={(e) => handleChange(e)}
              className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
              id="grid-state"
            >
              <option hidden>Select Category</option>
              {categoryResponse.activeCategories.map((value) => (
                <option value={value.id}>{value.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="w-[100%] px-5 py-2 mt-2">
            <label className="block text-[12px] ml-3 font-medium uppercase">
              Postal Code
            </label>
            <input
              type="text"
              name={names[2]}
              placeholder="Enter Your Postal Code"
              value={detailsData.postal_code}
              onChange={(e) => handleChange(e)}
              className={
                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
              }
            />
          </div>
          <div className="w-[100%] px-5 py-2 mt-2">
            <label className="block text-[12px] ml-3 font-medium uppercase">
              Skill
            </label>
            <input
              type="text"
              name={names[3]}
              placeholder="Enter Your Skill"
              value={detailsData.skills}
              onChange={(e) => handleChange(e)}
              className={
                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="w-[100%] px-5 py-2 mt-2">
            <label className="block text-[12px] ml-3 font-medium uppercase">
              Service Areas
            </label>
            <input
              type="text"
              name={names[4]}
              placeholder="Example: Toronto, Ottawa....."
              value={detailsData.service_areas}
              onChange={(e) => handleChange(e)}
              className={
                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
              }
            />
          </div>
          <div className="w-[100%] px-5 py-2 mt-2">
            <label className="block text-[12px] ml-3 font-medium uppercase">
              Availibility Days
            </label>
            <input
              type="text"
              name={names[5]}
              placeholder="Enter Available Days"
              value={detailsData.availability_days}
              onChange={(e) => handleChange(e)}
              className={
                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="w-[100%] px-5 py-2 mt-2">
            <label className="block text-[12px] ml-3 font-medium uppercase">
              Availibility Hours
            </label>
            <input
              type="text"
              name={names[6]}
              placeholder="Enter Available Hours"
              value={detailsData.availability_hours}
              onChange={(e) => handleChange(e)}
              className={
                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
              }
            />
          </div>
          <div className="w-[100%] px-5 py-2 mt-2">
            <label className="block text-[12px] ml-3 font-medium uppercase">
              Website (Optional)
            </label>
            <input
              type="text"
              name={names[7]}
              placeholder="Enter Your Website"
              value={detailsData.website}
              onChange={(e) => handleChange(e)}
              className={
                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
              }
            />
          </div>
        </div>

        <div className="w-[100%] px-5 py-2 mt-2">
          <label className="block text-[12px] ml-3 font-medium uppercase">
            Address
          </label>
          <input
            type="text"
            name={names[8]}
            value={detailsData.address}
            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
            placeholder="Enter Contractor Address"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-[40%] px-5 py-2 mt-2">
          <label className="block text-[12px] ml-3 font-medium uppercase">
            Trust Seal
          </label>
          <select
            name={names[10]}
            value={detailsData.trust_seal}
            onChange={(e) => handleChange(e)}
            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
            id="grid-state"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>
        <div className="w-[100%] px-5 py-2 mt-8">
          <label className="block text-[12px] ml-3 font-medium uppercase">
            Description
          </label>
          <div className={`rounded-[5px] border-[1px]`}>
            <JoditEditor
              // ref={editor}
              value={detailsData.description}
              onChange={(e) =>
                setDetailsData((data) => ({ ...data, description: e }))
              }
              tabIndex={1}
              name={names[9]}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            disabled={assignLoading}
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
          >
            {assignLoading ? <ButtonLoading /> : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Details;
