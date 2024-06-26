import React, {useEffect, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    approveContractor,
    approveRejectListener,
    contractorDetails,
    rejectContractor,
} from "../../api/reducers/contractor";
import Loading from "../../components/Loading";
import Details from "./Components/Details";
import Awards from "./Components/Awards";
// import Badges from "./Components/Badges";
import Projects from "./Components/Projects";
import Reviews from "./Components/Reviews";
import Areas from "./Components/Areas";
import Highlights from "./Components/Highlights";
import Languages from "./Components/Languages";
import Leads from "./Components/Leads";
import Documents from "./Components/Documents";
import RequestInfoModal from "../../components/RequestInfoModal";
import AcceptModal from "../../components/AcceptModal";
import RejectModal from "../../components/RejectModal";
import emailService from "../../api/services/emailService";
import SEO from "./Components/Seo";
import Profile from "./Components/Profile";

const ContractorDetails = () => {

    const [tabValue, setTabValue] = React.useState(0);
    const [ID, setID] = useState();
    const [requestOpen, setRequestOpen] = useState(false);
    const [acceptOpen, setAcceptOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const response = useSelector((state) => state.contractor);

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);

    useEffect(() => {
        if (params.get("id")) {
            dispatch(contractorDetails(params.get("id")));
            setID(params.get("id"));
        }
    }, []);

    useEffect(() => {
        if (response.approveReject) {
            navigate("/contractors");
            dispatch(approveRejectListener());
        }
    }, [response.approveReject]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    console.log(response);

    return (
        <>
            <RequestInfoModal
                open={requestOpen}
                setOpen={setRequestOpen}
                requestInfoFunction={(content) => emailService.infoContractor({
                    email: response.contractorDetails?.contractor?.email,
                    content: content
                }).then(res => navigate('/contractors'))}
            />
            <AcceptModal
                open={acceptOpen}
                setOpen={setAcceptOpen}
                acceptFunction={(content) => dispatch(approveContractor({
                    id: response.contractorDetails?.contractor?.id,
                    content: content
                }))}
            />
            <RejectModal
                open={rejectOpen}
                setOpen={setRejectOpen}
                rejectFunction={(content) => dispatch(rejectContractor({
                    id: response.contractorDetails?.contractor?.id,
                    content: content
                }))}
            />
            {response.detailsLoading ? (
                <Loading/>
            ) : (
                <div>
                    <h1 className="text-center text-[25px] font-[800] mt-5 uppercase">
                        {response.contractorDetails?.details?.company_name
                            ? response.contractorDetails?.details.company_name
                            : "-"}
                    </h1>
                    <h5 className="text-center text-[15px] font-[400] mt-[2px]">
                        {response.contractorDetails?.details?.address
                            ? response.contractorDetails?.details.address
                            : "-"}
                    </h5>
                    {response.contractorDetails?.contractor?.checked === 0 ?
                        <div className="flex justify-center items-center text-center gap-2 mt-6">
                            <button
                                onClick={() => setAcceptOpen(!acceptOpen)}
                                className="flex bg-[#12947c] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl  items-center sm:text-base text-xs justify-center hover:scale-110"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => setRejectOpen(!rejectOpen)}
                                className="flex bg-[#fd3d3a] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl  items-center sm:text-base text-xs justify-center hover:scale-110"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => setRequestOpen(!requestOpen)}
                                className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl items-center sm:text-base text-xs justify-center hover:scale-110"
                            >
                                Request Info
                            </button>
                        </div>
                        : ''
                    }

                    <Box
                        sx={{width: "95%", bgcolor: "background.paper"}}
                        className="mx-auto rounded-xl flex mt-[1.5rem] items-center justify-center"
                    >
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            centered
                            variant="scrollable"
                        >
                            <Tab label="Details"/>
                            <Tab label="Profile"/>
                            {/* <Tab label="Affiliations" /> */}
                            <Tab label="Awards"/>
                            {/* <Tab label="Badges" /> */}
                            <Tab label="Projects"/>
                            <Tab label="Reviews"/>
                            <Tab label="Service Areas"/>
                            <Tab label="Highlights"/>
                            <Tab label="Languages"/>
                            <Tab label="Leads"/>
                            <Tab label="Documents"/>
                            <Tab label="SEO"/>
                        </Tabs>
                    </Box>
                    <div className=" mt-[1rem] rounded-xl md:px-[2rem] pt-5 pb-16 flex flex-col">
                        {tabValue === 0 ? <Details id={ID} response={response}/> : null}
                        {tabValue === 1 ? <Profile id={ID}/> : null}
                        {/* {tabValue === 1 ? (
              <Affiliations id={ID} response={response} />
            ) : null} */}
                        {tabValue === 2 ? <Awards id={ID} response={response}/> : null}
                        {/* {tabValue === 3 ? <Badges id={ID} response={response} /> : null} */}
                        {tabValue === 3 ? <Projects id={ID} response={response}/> : null}
                        {tabValue === 4 ? <Reviews id={ID} response={response}/> : null}
                        {tabValue === 5 ? <Areas id={ID} response={response}/> : null}
                        {tabValue === 6 ? <Highlights id={ID} response={response}/> : null}
                        {tabValue === 7 ? <Languages id={ID} response={response}/> : null}
                        {tabValue === 8 ? <Leads id={ID} response={response}/> : null}
                        {tabValue === 9 ? <Documents id={ID} response={response}/> : null}
                        {tabValue === 10 ? <SEO id={ID} response={response}/> : null}
                    </div>
                </div>
            )}
        </>
    );
};
export default ContractorDetails;
