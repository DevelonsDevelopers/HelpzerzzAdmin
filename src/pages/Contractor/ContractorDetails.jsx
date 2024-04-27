import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { contractorDetails } from "../../api/reducers/contractor";
import Loading from "../../components/Loading";
// import { getActiveCategories } from "../../api/reducers/category";
import Details from "./Components/Details";
// import Affiliations from "./Components/Affiliations";
import Awards from "./Components/Awards";
// import Badges from "./Components/Badges";
import Projects from "./Components/Projects";
import Reviews from "./Components/Reviews";
import Areas from "./Components/Areas";
import Highlights from "./Components/Highlights";
import Languages from "./Components/Languages";
import Leads from "./Components/Leads";
import Documents from "./Components/Documents";

const ContractorDetails = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [ID, setID] = useState();

  const response = useSelector((state) => state.contractor);

  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (params.get("id")) {
      dispatch(contractorDetails(params.get("id")));
      setID(params.get("id"));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  console.log(response);
  return (
    <>
      {response.detailsLoading ? (
        <Loading />
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
          <div className="flex justify-center items-center text-center gap-2 mt-6">
            <button className="flex bg-[#12947c] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl  items-center sm:text-base text-xs justify-center hover:scale-110">
              Accept
            </button>
            <button className="flex bg-[#fd3d3a] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl  items-center sm:text-base text-xs justify-center hover:scale-110">
              Reject
            </button>
            <button className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl items-center sm:text-base text-xs justify-center hover:scale-110">
              Request Info
            </button>
          </div>

          <Box
            sx={{ width: "95%", bgcolor: "background.paper" }}
            className="mx-auto rounded-xl flex mt-[1.5rem] items-center justify-center"
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              variant="scrollable"
            >
              <Tab label="Details" />
              {/* <Tab label="Affiliations" /> */}
              <Tab label="Awards" />
              {/* <Tab label="Badges" /> */}
              <Tab label="Projects" />
              <Tab label="Reviews" />
              <Tab label="Service Areas" />
              <Tab label="Highlights" />
              <Tab label="Languages" />
              <Tab label="Leads" />
              <Tab label="Documents" />
            </Tabs>
          </Box>
          <div className=" mt-[1rem] rounded-xl md:px-[2rem] pt-5 pb-16 flex flex-col">
            {tabValue === 0 ? <Details id={ID} response={response} /> : null}
            {/* {tabValue === 1 ? (
              <Affiliations id={ID} response={response} />
            ) : null} */}
            {tabValue === 1 ? <Awards id={ID} response={response} /> : null}
            {/* {tabValue === 3 ? <Badges id={ID} response={response} /> : null} */}
            {tabValue === 2 ? <Projects id={ID} response={response} /> : null}
            {tabValue === 3 ? <Reviews id={ID} response={response} /> : null}
            {tabValue === 4 ? <Areas id={ID} response={response} /> : null}
            {tabValue === 5 ? <Highlights id={ID} response={response} /> : null}
            {tabValue === 6 ? <Languages id={ID} response={response} /> : null}
            {tabValue === 7 ? <Leads id={ID} response={response} /> : null}
            {tabValue === 8 ? <Documents id={ID} response={response} /> : null}
          </div>
        </div>
      )}
    </>
  );
};
export default ContractorDetails;
