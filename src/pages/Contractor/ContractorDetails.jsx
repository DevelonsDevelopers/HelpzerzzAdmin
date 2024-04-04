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
import Details from "./Components/Details";
import Affiliations from "./Components/Affiliations";
import Awards from "./Components/Awards";
import Badges from "./Components/Badges";
import Projects from "./Components/Projects";
import Reviews from "./Components/Reviews";

const ContractorDetails = () => {

        const [tabValue, setTabValue] = React.useState(0);
        const [ID, setID] = useState()

        const response = useSelector(state => state.contractor)

        const dispatch = useDispatch()
        const location = useLocation()

        const params = new URLSearchParams(location.search)

        useEffect(() => {
            if (params.get("id")) {
                dispatch(contractorDetails(params.get("id")))
                setID(params.get("id"))
            }
        }, []);

        // useEffect(() => {
        //     if (!categoryResponse.activeFetched) {
        //         dispatch(getActiveCategories())
        //     }
        // }, [categoryResponse.activeFetched]);
        //
        // useEffect(() => {
        //     if (response.contractorDetails?.details) {
        //         setEdit(true)
        //         setDetailsData(response.contractorDetails.details)
        //     }
        // }, [response.contractorDetails]);

        const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
        };

        // useEffect(() => {
        //     if (response.detailSuccess) {
        //         navigate('/contractors')
        //         dispatch(detailsSuccessListener())
        //     }
        // }, [response.detailSuccess]);

        // const handleChange = (e) => {
        //     let tempErrors = [...error]
        //     tempErrors[names.indexOf(e.target.name)] = false
        //     setErrors(tempErrors)
        //     setDetailsData((data) => ({...data, [e.target.name]: e.target.value}))
        // }
        //
        // const handleSubmit = (e) => {
        //     let tempErrors = [...error]
        //     for (let i = 0; i < names.length; i++) {
        //         let name = names[i];
        //         tempErrors[i] = detailsData[name].length === 0;
        //     }
        //     setErrors(tempErrors)
        //     if (!tempErrors.includes(true)) {
        //         if (edit) {
        //             dispatch(editContractorDetails(detailsData))
        //         } else {
        //             dispatch(addContractorDetails(detailsData))
        //         }
        //     }
        // }

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
                                <Tab label="Affiliations"/>
                                <Tab label="Awards"/>
                                <Tab label="Badges"/>
                                <Tab label="Projects"/>
                                <Tab label="Reviews"/>
                            </Tabs>
                        </Box>
                        <div className='bg-white mt-[1rem] rounded-xl px-[8rem] py-16 flex flex-col mx-8'>
                            {tabValue === 0 ?
                                <Details id={ID} response={response}/>
                                :
                                null
                            }
                            {tabValue === 1 ?
                                <Affiliations id={ID} response={response}/>
                                :
                                null
                            }
                            {tabValue === 2 ?
                                <Awards id={ID} response={response}/>
                                :
                                null
                            }
                            {tabValue === 3 ?
                                <Badges id={ID} response={response}/>
                                :
                                null
                            }
                            {tabValue === 4 ?
                                <Projects id={ID} response={response}/>
                                :
                                null
                            }
                            {tabValue === 5 ?
                                <Reviews id={ID} response={response}/>
                                :
                                null
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
