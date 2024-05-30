import React from 'react'
import ButtonLoading from '../../components/ButtonLoading'
import { IoIosEyeOff } from 'react-icons/io'

const SeoAddEdit = ({edit = false}) => {
  return (
    <div>
       <div>
          <h1 className="text-center text-[25px] font-[800] mt-5 uppercase">
            Add Seo tags
          </h1>
          <form
            // onSubmit={(e) => handleSubmit(e)}
            className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto"
          >
            <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
              <div className="w-[100%] px-5 py-2 mt-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Header name
                </label>
                <input
                  type="text"
                //   name={names[0]}
                  required
                //   value={userData.name}
                //   onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] `}
                  placeholder="Enter Header Name"
                />
              </div>
              <div className="w-[100%] px-5 py-2 mt-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Meta description
                </label>
                <input
                  type="text"
                //   name={names[1]}
                  required
                //   value={userData.username}
                //   onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                  placeholder="Enter Meta Desctiption"
                />
              </div>
            </div>
            <div className="mt-3">
              <div className="w-[100%] px-5 py-2 mt-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Meta content
                </label>
                <input
                  type="email"
                //   name={names[2]}
                  required
                //   value={userData.email}
                //   onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                  placeholder="Enter Meta Content"
                />
              </div>
             
            </div>
            <div className="flex justify-center mt-8">
              {/* {assignLoading ? (
                <button className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase">
                  <ButtonLoading />
                </button>
              ) : ( */}
                <input
                  type="submit"
                  value={"Submit"}
                //   disabled={assignLoading}
                  className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
                />
            {/* //   )} */}
            </div>
          </form>
        </div>
    </div>
  )
}

export default SeoAddEdit
