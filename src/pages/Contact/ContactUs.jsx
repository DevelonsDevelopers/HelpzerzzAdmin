import React, { useEffect } from 'react'
import DeleteModal from '../../components/DeleteModal'
import { useDispatch, useSelector } from 'react-redux'
import contact, { getContactUs } from '../../api/reducers/contact'
import deleteImage from "../../components/assets/delete.png";
import Loading from '../../components/Loading'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {

const navigate = useNavigate()
 const dispatch = useDispatch()

const response = useSelector((state) =>  state.contact)


useEffect(() => {
    dispatch(getContactUs());
  }, [dispatch]);

  return (
    <div>
<>
      {response.loading ? (
        <Loading />
      ) : (
        <div>
          {/* <DeleteModal
            open={open}
            setOpen={setOpen}
            deleteFunction={handleDelete}
            deleting={response.deleting}
          /> */}
          <div className="w-full flex flex-col justify-center">
            <div className="flex justify-between w-[100%] m-auto">
              <h1 className="lg:text-3xl md:text-2xl text-xl font-[700]">
                Manage Contact us
              </h1>
            </div>
            <div className="overflow-auto min-w-[300px]">
              <table className="rounded-xl p-5 bg-white w-[100%] m-auto mt-6 shadow-lg">
                <thead>
                  <tr className="text-sm leading-normal">
                    <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[2%]">
                      id
                    </th>
                    <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%]">
                      Name
                    </th>
                    <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%]">
                      company
                    </th>
                    <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[2%] text-left pl-[1%]">
                      email
                    </th>
                    <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[1%] text-left pl-[1%]">
                      topic
                    </th>
                    <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[1%]">
                      type
                    </th>
                    <th className="py-[1.5%] bg-gray-50 md:text-lg text-md w-[1%]">
                      Actions
                    </th>
                    <th className="py-[1.5%] bg-gray-50 rounded-tr-xl md:text-lg text-md w-[1%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {response.data.map((value) => (
                    <tr className="text-[#000000] text-sm w-full">
                      <td className="border-t-[1px] pl-[2%]">
                        <div className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                          {value.id}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[1%]">
                        <div className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium mx-auto justify-center">
                          {value.first_name}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[1%]">
                        <div className="lg:text-lg md:text-md text-sm font-medium mx-auto justify-center line-clamp-1 text-ellipsis">
                          {value.company}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[1%]">
                        <div className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium  mx-auto  justify-center">
                          {value.email}
                        </div>
                      </td>
                      <td className="border-t-[1px] pl-[1%]">
                        <div className="py-[1.5%] lg:text-lg md:text-md text-sm font-medium  mx-auto justify-center">
                          {value.topic}
                        </div>
                      </td>
                      <td className="py-[1.5%] border-t-[1px] text-center font-bold lg:text-lg md:text-md text-sm hover:scale-110">
                        <p
                          className={`w-[100px] mx-auto text-sm rounded-2xl py-1 px-2 cursor-pointer `} >
                          {value.type}
                        </p>
                      </td>
                      <td className="py-[1.5%] border-t-[1px]">
                        <div className="flex items-center justify-center">
                          <div
                            className="w-8  cursor-pointer hover:scale-125"
                            // onClick={() => initiateDelete(value.id)}
                          >
                            <img src={deleteImage} alt="Delete" />
                          </div>
                        </div>
                      </td>
                      <td className="py-[1.5%] border-t-[1px]">
                        <div
                          className="flex items-center justify-center text-center text-blue-700 cursor-pointer hover:scale-110"
                          onClick={() =>
                            navigate("/contact/details?id=" + value.id)
                          }
                        >
                          <div className="flex lg:text-lg md:text-md text-sm">
                            Details{" "}
                            <AiOutlineArrowRight className="ml-2 mt-1" />
                          </div>
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
    </div>
  )
}

export default ContactUs
