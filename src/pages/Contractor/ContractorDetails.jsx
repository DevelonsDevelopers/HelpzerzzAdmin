import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import PortalLayout from "../../layouts/PortalLayout";
import { Box, Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addContractorDetails,
  contractorDetails,
  detailsSuccessListener,
  editContractorDetails,
} from "../../api/reducers/contractor";
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
          <Box
            sx={{ width: "95%", bgcolor: "background.paper" }}
            className="mx-auto rounded-xl flex mt-[3rem] items-center justify-center"
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
