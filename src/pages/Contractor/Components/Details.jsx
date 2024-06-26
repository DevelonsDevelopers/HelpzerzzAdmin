import React, {useEffect, useState} from "react";
import JoditEditor from "jodit-react";
import {
    addContractorDetails,
    detailsSuccessListener,
    editContractorDetails,
} from "../../../api/reducers/contractor";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getActiveCategories} from "../../../api/reducers/category";
import ButtonLoading from "../../../components/ButtonLoading";
import cityService from "../../../api/services/cityService";
import subcategoryService from "../../../api/services/subcategoryService";
import Select from "react-select";

const Details = ({id, response}) => {

    const [assignLoading, setAssignLoading] = useState(false);
    const [subcategory, setSubcategory] = useState([])
    const [subcategoryValue, setSubcategoryValue] = useState([])
    const [onceDone, setOnceDone] = useState(false)

    const names = [
        "company_name",
        "category",
        "postal_code",
        "skills",
        // "service_areas",
        // "availability_days",
        // "availability_hours",
        // "website",
        "trust_seal",
        "city",
        "address",
        "description",
        "subcategories",
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
    ]);
    const [detailsData, setDetailsData] = useState({
        contractor: id,
        company_name: "",
        subcategories: "",
        address: "",
        postal_code: "",
        category: "",
        skills: "",
        website: "",
        description: "",
        trust_seal: 0,
        city: "",
    });


    useEffect(() => {
        if (id) {
            setDetailsData((data) => ({...data, contractor: parseInt(id)}));
        }
    }, [id]);

    const getSubcategoryByCategory = async (category) => {
        try {
            const response = await subcategoryService.byCategory(category);
            setSubcategory(response.subcategories);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (detailsData.category) {
            getSubcategoryByCategory(detailsData.category)
        }
    }, [detailsData.category])

    const [edit, setEdit] = useState(false);

    const categoryResponse = useSelector((state) => state.category);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cities, setCities] = useState([]);

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await cityService.fetchAll();
                setCities(response.cities);
                console.log("cities ", response);
            } catch (error) {
                console.error(error);
            }
        };
        getCities();
    }, []);

    useEffect(() => {
        if (!onceDone) {
            if (subcategory.length > 0) {
                if (detailsData.subcategories) {
                    let arr = [];
                    detailsData.subcategories.split(",").map(value => {
                        let sub = subcategory.filter(v => parseInt(v.id) === parseInt(value))
                        arr.push({label: sub[0].name, value: sub[0].id})
                    })
                    setSubcategoryValue(arr)
                    setOnceDone(true)
                }
            }
        }
    }, [subcategory, detailsData.subcategories]);

    useEffect(() => {
        let subs = []
        if (subcategoryValue.length > 0) {
            subcategoryValue.map(value => {
                subs.push(value.value)
            })
            setDetailsData((data) => ({...data, subcategories: subs}));
            let tempErrors = [...error];
            tempErrors[9] = false;
            setErrors(tempErrors);
        } else {
            let tempErrors = [...error];
            tempErrors[9] = true;
            setErrors(tempErrors);
        }
    }, [subcategoryValue]);

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
        setDetailsData((data) => ({...data, [e.target.name]: e.target.value}));
    };

    const handleSubmit = (e) => {
        let tempErrors = [...error];
        for (let i = 0; i < names?.length; i++) {
            let name = names[i];
            tempErrors[i] = detailsData[name]?.length === 0;
        }
        setErrors(tempErrors);
        if (!tempErrors.includes(true)) {
            setAssignLoading(true);
            if (edit) {
                dispatch(editContractorDetails(detailsData)).then((res) => {
                    setAssignLoading(false);
                    console.log(res);
                });
            } else {
                dispatch(addContractorDetails(detailsData)).then((res) => {
                    setAssignLoading(false);
                    console.log(res);
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
                            className={`${
                                error[0] ? "border-red-500" : ""
                            } pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1`}
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
                            className={`${
                                error[1] ? "border-red-500" : ""
                            } pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                            id="grid-state"
                        >
                            <option hidden>Select Category</option>
                            {categoryResponse.activeCategories.map((value) => (
                                <option value={value.id}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='w-[100%] px-5 py-2'>
                    <label className="block text-[12px] ml-3 font-medium uppercase">
                        Subcategories
                    </label>
                    <Select
                        placeholder="Select category first"
                        required
                        value={subcategoryValue}
                        onChange={(e) => setSubcategoryValue(e)}
                        className={`${
                            error[1] ? "border-red-500" : ""
                        } pl-4 block py-[0px] w-full text-sm bg-gray-50 rounded-[9px] border-[0px]`}
                        options={subcategory.map((value, index) => (
                            {label: value.name, value: value.id}
                        ))}
                        isMulti={true}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                border: 'none',
                            }),
                            menu: (provided) => ({
                                ...provided,
                                border: 'none',
                            }),
                            multiValue: (provided) => ({
                                ...provided,
                                borderRadius: '9px',
                            }),
                        }}
                    />


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
                            className={`${
                                error[2] ? "border-red-500" : ""
                            } pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1`}
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
                            className={`${
                                error[3] ? "border-red-500" : ""
                            } pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1`}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {/* <div className="w-[100%] px-5 py-2 mt-2">
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
          </div> */}
                    {/* <div className="w-[100%] px-5 py-2 mt-2">
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
                `${error[4] ? 'border-red-500' : ''} pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1`
              }
            />
          </div> */}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {/* <div className="w-[100%] px-5 py-2 mt-2">
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
                `${error[5] ? 'border-red-500' : ''} pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1`
              }
            />
          </div> */}
                    <div className="w-[100%] px-5 py-2 mt-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            Website (Optional)
                        </label>
                        <input
                            type="text"
                            name="website"
                            placeholder="Enter Your Website"
                            value={detailsData.website}
                            onChange={(e) => handleChange(e)}
                            className={
                                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
                            }
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-[100%] px-5 py-2 mt-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            Trust Seal
                        </label>
                        <select
                            name={names[4]}
                            value={detailsData.trust_seal}
                            onChange={(e) => handleChange(e)}
                            className={`${
                                error[4] ? "border-red-500" : ""
                            } pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                            id="grid-state"
                        >
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                    <div className="w-[100%] px-5 py-2 mt-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            City
                        </label>
                        <select
                            name={names[5]}
                            value={detailsData.city}
                            onChange={(e) =>
                                setDetailsData({...detailsData, city: parseInt(e.target.value)})
                            }

                            className={` ${
                                error[5] ? "border-red-500" : ""
                            } pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                            id="grid-state"
                        >
                            <option hidden>Select City</option>
                            {cities.map((value) => (
                                <option value={parseInt(value.id)}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-[100%] px-5 py-2 mt-2">
                    <label className="block text-[12px] ml-3 font-medium uppercase">
                        Address
                    </label>
                    <input
                        type="text"
                        name={names[6]}
                        value={detailsData.address}
                        className={`${
                            error[6] ? "border-red-500" : ""
                        } pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                        placeholder="Enter Contractor Address"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="w-[100%] px-5 py-2 mt-8">
                    <label className="block text-[12px] ml-3 font-medium uppercase">
                        Description
                    </label>
                    <div
                        className={`${
                            error[7] ? "border-red-500" : ""
                        } rounded-[5px] border-[1px]`}
                    >
                        <JoditEditor
                            // ref={editor}
                            value={detailsData.description}
                            onChange={(e) =>
                                setDetailsData((data) => ({...data, description: e}))
                            }
                            tabIndex={1}
                            name={names[8]}
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        disabled={assignLoading}
                        onClick={(e) => handleSubmit(e)}
                        className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
                    >
                        {assignLoading ? <ButtonLoading/> : "Submit"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Details;
