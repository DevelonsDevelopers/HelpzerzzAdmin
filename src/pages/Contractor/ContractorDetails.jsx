import React, {useEffect, useState} from 'react';
import JoditEditor from "jodit-react";
import PortalLayout from "../../layouts/PortalLayout";
import {Box, Tab, Tabs} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addContractorDetails,
    contractorDetails,
    detailsSuccessListener,
    editContractorDetails
} from "../../api/reducers/contractor";
import Loading from "../../components/Loading";
import {getActiveCategories} from "../../api/reducers/category";

const ContractorDetails = () => {

        const names = ["company_name", "category", "postal_code", "skills", "service_areas", "availability_days", "availability_hours", "website", "address", "description", "trust_seal"]
        const [error, setErrors] = useState([false, false, false, false, false, false, false, false, false, false, false])
        const [detailsData, setDetailsData] = useState({
            contractor: 0,
            company_name: '',
            address: '',
            postal_code: '',
            category: '',
            skills: '',
            service_areas: '',
            availability_days: '',
            availability_hours: '',
            website: '',
            description: '',
            trust_seal: 0,
        })
        const [tabValue, setTabValue] = React.useState(0);
        const [edit, setEdit] = useState(false)

        const response = useSelector(state => state.contractor)
        const categoryResponse = useSelector(state => state.category)

        const navigate = useNavigate()
        const dispatch = useDispatch()
        const location = useLocation()

        const params = new URLSearchParams(location.search)

        useEffect(() => {
            if (params.get("id")) {
                dispatch(contractorDetails(params.get("id")))
                setDetailsData((data) => ({...data, contractor: parseInt(params.get("id"))}))
            }
        }, []);

        useEffect(() => {
            if (!categoryResponse.activeFetched) {
                dispatch(getActiveCategories())
            }
        }, [categoryResponse.activeFetched]);

        useEffect(() => {
            if (response.contractorDetails?.details) {
                setEdit(true)
                setDetailsData(response.contractorDetails.details)
            }
        }, [response.contractorDetails]);

        const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
        };

        useEffect(() => {
            if (response.detailSuccess) {
                navigate('/contractors')
                dispatch(detailsSuccessListener())
            }
        }, [response.detailSuccess]);

        const handleChange = (e) => {
            let tempErrors = [...error]
            tempErrors[names.indexOf(e.target.name)] = false
            setErrors(tempErrors)
            setDetailsData((data) => ({...data, [e.target.name]: e.target.value}))
        }

        const handleSubmit = (e) => {
            let tempErrors = [...error]
            for (let i = 0; i < names.length; i++) {
                let name = names[i];
                tempErrors[i] = detailsData[name].length === 0;
            }
            setErrors(tempErrors)
            if (!tempErrors.includes(true)) {
                if (edit) {
                    dispatch(editContractorDetails(detailsData))
                } else {
                    dispatch(addContractorDetails(detailsData))
                }
            }
        }

        return (
            <>
                {response.detailsLoading ?
                    <Loading/>
                    :
                    <div>
                        <h1 className='text-center text-[25px] font-[800] mt-5 uppercase'>{response.contractorDetails?.contractor.name}</h1>
                        <h5 className='text-center text-[15px] font-[400] mt-[2px]'>{response.contractorDetails?.contractor.email}</h5>
                        <Box sx={{width: '95%', bgcolor: 'background.paper'}} className="mx-auto rounded-xl mt-[3rem]">
                            <Tabs value={tabValue} onChange={handleTabChange} centered>
                                <Tab label="Details"/>
                                <Tab label="Projects"/>
                                <Tab label="Awards"/>
                            </Tabs>
                        </Box>
                        <div className='bg-white mt-[1rem] rounded-xl px-[8rem] py-16 flex flex-col mx-8'>
                            {tabValue === 0 ?
                                <div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='w-[100%] px-5 py-2'>
                                            <label className='block text-[12px] ml-3 font-medium uppercase'>Company
                                                Name</label>
                                            <input type='text' name={names[0]} placeholder='Enter Your Company Name' value={detailsData.company_name}
                                                   onChange={(e) => handleChange(e)}
                                                   className={'pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1'}/>
                                        </div>
                                        <div className="w-[100%] px-5 py-2 mt-2">
                                            <label className="block text-[12px] ml-3 font-medium uppercase">
                                                Category
                                            </label>
                                            <select
                                                name={names[1]} value={detailsData.category}
                                                onChange={(e) => handleChange(e)}
                                                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                                                id="grid-state">
                                                <option hidden>Select Category</option>
                                                {categoryResponse.activeCategories.map(value => (
                                                    <option value={value.id}>{value.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='w-[100%] px-5 py-2 mt-2'>
                                            <label className='block text-[12px] ml-3 font-medium uppercase'>Postal
                                                Code</label>
                                            <input type='text' name={names[2]} placeholder='Enter Your Postal Code' value={detailsData.postal_code}
                                                   onChange={(e) => handleChange(e)}
                                                   className={'pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1'}/>
                                        </div>
                                        <div className='w-[100%] px-5 py-2 mt-2'>
                                            <label className='block text-[12px] ml-3 font-medium uppercase'>Skill</label>
                                            <input type='text' name={names[3]} placeholder='Enter Your Skill' value={detailsData.skills}
                                                   onChange={(e) => handleChange(e)}
                                                   className={'pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1'}/>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='w-[100%] px-5 py-2 mt-2'>
                                            <label className='block text-[12px] ml-3 font-medium uppercase'>Service
                                                Areas</label>
                                            <input type='text' name={names[4]} placeholder='Example: Toronto, Ottawa.....' value={detailsData.service_areas}
                                                   onChange={(e) => handleChange(e)}
                                                   className={'pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1'}/>
                                        </div>
                                        <div className='w-[100%] px-5 py-2 mt-2'>
                                            <label className='block text-[12px] ml-3 font-medium uppercase'>Availibility
                                                Days</label>
                                            <input type='text' name={names[5]} placeholder='Enter Available Days' value={detailsData.availability_days}
                                                   onChange={(e) => handleChange(e)}
                                                   className={'pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1'}/>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='w-[100%] px-5 py-2 mt-2'>
                                            <label className='block text-[12px] ml-3 font-medium uppercase'>Availibility
                                                Hours</label>
                                            <input type='text' name={names[6]} placeholder='Enter Available Hours' value={detailsData.availability_hours}
                                                   onChange={(e) => handleChange(e)}
                                                   className={'pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1'}/>
                                        </div>
                                        <div className='w-[100%] px-5 py-2 mt-2'>
                                            <label className='block text-[12px] ml-3 font-medium uppercase'>Website
                                                (Optional)</label>
                                            <input type='text' name={names[7]} placeholder='Enter Your Website' value={detailsData.website}
                                                   onChange={(e) => handleChange(e)}
                                                   className={'pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1'}/>
                                        </div>
                                    </div>

                                    <div className="w-[100%] px-5 py-2 mt-2">
                                        <label className="block text-[12px] ml-3 font-medium uppercase">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name={names[8]} value={detailsData.address}
                                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                                            placeholder="Enter Contractor Address"
                                            onChange={(e) => handleChange(e)}/>
                                    </div>
                                    <div className="w-[40%] px-5 py-2 mt-2">
                                        <label className="block text-[12px] ml-3 font-medium uppercase">
                                            Trust Seal
                                        </label>
                                        <select
                                            name={names[10]} value={detailsData.trust_seal}
                                            onChange={(e) => handleChange(e)}
                                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                                            id="grid-state">
                                            <option value={0}>No</option>
                                            <option value={1}>Yes</option>
                                        </select>
                                    </div>
                                    <div className="w-[100%] px-5 py-2 mt-8">
                                        <label className="block text-[12px] ml-3 font-medium uppercase">Description</label>
                                        <div
                                            className={`rounded-[5px] border-[1px]`}>
                                            <JoditEditor
                                                // ref={editor}
                                                value={detailsData.description}
                                                onChange={(e) => setDetailsData((data) => ({...data, description: e}))}
                                                tabIndex={1}
                                                name={names[9]}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        <button onClick={(e) => handleSubmit(e)}
                                                className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase">Submit
                                        </button>
                                    </div>
                                </div>
                                :
                                <div>Good</div>
                            }
                        </div>
                    </div>
                }
            </>
        )
            ;
    }
;

export default ContractorDetails;