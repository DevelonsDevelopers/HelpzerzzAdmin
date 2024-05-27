import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import { Android12Switch } from "../../utils/components";
import { FormControlLabel } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import {getCustomers, updateCustomerStatus} from "../../api/reducers/customer";

const CustomerList = ({ search }) => {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);

  const response = useSelector((state) => state.customer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getCustomers());
    }
  }, [dispatch]);

  useEffect(() => {
    setSearchData(response.customers);
  }, [response.customers]);

  useEffect(() => {
    if (search) {
      setData(
        searchData.filter((value) => {
          return (
            value.name?.toLowerCase().includes(search.toLowerCase()) ||
            value.email?.toLowerCase().includes(search.toLowerCase()) ||
            value.address?.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    } else {
      setData(searchData);
    }
  }, [search, searchData]);

  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleDelete = () => {
    // dispatch(deleteContractor(deleteID))
  };

  const handleStatus = (id, val) => {
    let status = 0;
    if (val === 0) {
        status = 1
    }
    dispatch(updateCustomerStatus({id, status}))
  };

  return (
    <>
      {response.loading ? (
        <Loading />
      ) : (
        <div>
          <DeleteModal
            open={open}
            setOpen={setOpen}
            deleteFunction={handleDelete}
            deleting={response.deleting}
          />
          <div className="w-full flex flex-col justify-center">
            <div className="flex justify-between w-[100%] m-auto">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                Customers
              </h1>
            </div>
            <div className="overflow-auto min-w-[300px]">
              <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                <thead>
                  <tr className="text-sm leading-normal w-full">
                    <th className="py-[2%] bg-gray-50 rounded-tl-xl md:text-lg text-md w-[3%] text-left pl-[4%]">
                      Name
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[4%]">
                      Email
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[3%] text-left">
                      Address
                    </th>
                    <th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">
                      Status
                    </th>
                    {/*<th className="py-[2%] bg-gray-50 md:text-lg text-md w-[1%]">*/}
                    {/*    Actions*/}
                    {/*</th>*/}
                    {/* <th className="py-[2%] bg-gray-50 rounded-tr-xl md:text-lg text-md w-[1%]"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((value) => (
                    <tr className="text-[#000000] text-sm w-[100%]">
                      <td className="border-t-[1px] pl-[4%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                          {value?.name}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[4%] py-[1%]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto  justify-center">
                          {value.email}
                        </div>
                      </td>
                      <td className="border-t-[1px]">
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                          {value?.address}
                        </div>
                      </td>
                      <td
                        onClick={() => handleStatus(value.id, value.status)}
                        className="border-t-[1px] text-center text-[8px] font-bold cursor-pointer hover:scale-105 items-center justify-center pl-[2%]"
                      >
                        <div className="py-[2%] lg:text-lg md:text-md text-sm font-medium mx-auto  justify-center">
                          <FormControlLabel
                            className={"mx-auto"}
                            control={
                              <Android12Switch
                                checked={value.status}
                                color={"success"}
                              />
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerList;
