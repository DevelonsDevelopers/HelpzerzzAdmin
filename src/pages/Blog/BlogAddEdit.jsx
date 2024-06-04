import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addBlog,
  getBlog,
  successListener,
  updateBlog,
} from "../../api/reducers/blog";
import JoditEditor from "jodit-react";
import { IMAGE_PATH } from "../../utils/constants";
import ButtonLoading from "../../components/ButtonLoading";
import Loading from "../../components/Loading";

const BlogAddEdit = ({ edit = false }) => {
  const names = ["title", "category", "author", "subtitle", "content", "image" , "seo_title" , "seo_description"];
  const [error, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    author: "",
    subtitle: "",
    content: "",
    image: "",
    seo_title:"" ,
    seo_description :""
  });
  const [file, setFile] = useState();
  const [assignLoading, setAssignLoading] = useState(false);
  const response = useSelector((state) => state.blog);

  console.log(response);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (!response.fetched) {
      dispatch(getBlog());
    }
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        dispatch(getBlog(params.get("id")));
      }
    }
  }, []);

  useEffect(() => {
    if (edit) {
      if (response.blog) {
        setBlogData(response.blog);
      }
    }
  }, [response.blog]);

  useEffect(() => {
    if (response.success) {
      navigate("/blogs");
      dispatch(successListener());
    }
  }, [response.success]);

  const handleChange = (e) => {
    let tempErrors = [...error];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setBlogData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        let tempErrors = [...error];
        tempErrors[4] = false;
        setErrors(tempErrors);
        setBlogData((p) => ({ ...p, image: reader.result }));
      };
    }
  };

  const handleSubmit = () => {
    let tempErrors = [...error];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = blogData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      setAssignLoading(true);
      if (edit) {
        dispatch(updateBlog({ file: file, blog: blogData })).then(() => {
          setAssignLoading(false);
        });
      } else {
        dispatch(addBlog({ file: file, blog: blogData })).then(() => {
          setAssignLoading(false);
        });
      }
    }
  };

  return (
    <>
      {/* <center>
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        </center> */}
      {response.blogLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-center font-[800] text-[25px] uppercase mt-5">
            Add Blog
          </h1>
          <div className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[8rem] px-2 md:py-16 py-8 flex flex-col md:mx-8 mx-auto">
            <div className="lg:grid lg:grid-cols-2 flex-wrap mt-3">
              <div>
                <div className="w-[100%] px-5 py-2">
                  <label className="block text-[12px] ml-3 font-medium uppercase">
                    Title
                  </label>
                  <input
                    value={blogData.title}
                    type="text"
                    name={names[0]}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[0] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter Blog Title"
                  />
                </div>
                <div className="w-[100%] px-5 py-2 mt-2">
                  <label className="block text-[12px] ml-3 font-medium uppercase">
                    Category
                  </label>
                  <select
                    name={names[1]}
                    value={blogData.category}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[1] ? "border-red-600" : "border-gray-300"
                    }`}
                    id="grid-state"
                  >
                    <option hidden>Select Category</option>
                    <option>Update</option>
                    <option>Improvement</option>
                    <option>Design</option>
                  </select>
                </div>

                <div className="w-[100%] px-5 py-2 mt-2">
                  <label className="block text-[12px] ml-3 font-medium uppercase">
                    Author
                  </label>
                  <input
                    value={blogData.author}
                    type="text"
                    name={names[2]}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[2] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter Blog Author"
                  />
                </div>

                <div className="w-[100%] px-5 py-2 mt-2">
                  <label className="block text-[12px] ml-3 font-medium uppercase">
                    Subtitle
                  </label>
                  <input
                    value={blogData.subtitle}
                    type="text"
                    name={names[3]}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                      error[3] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter Blog Subtitle"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="w-[100%] px-5 py-2">
                  <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                      error[5] ? "border-red-600" : "border-gray-300"
                    }`}
                  >
                    {blogData.image ? (
                      <>
                        {file ? (
                          <img
                            src={`${blogData.image}`}
                            alt=""
                            className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                          />
                        ) : (
                          <img
                            src={`${IMAGE_PATH}${blogData.image}`}
                            alt=""
                            className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                          />
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 ">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="dropzone-file"
                      accept="image/*"
                      name={names[5]}
                      className="hidden"
                      onChange={(e) => convertToBase64(e)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="w-[100%] px-5 py-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Content
              </label>
              <div
                className={`rounded-[5px] border-[1px] ${
                  error[4] ? "border-red-600" : "border-gray-300"
                }`}
              >
                <JoditEditor
                  // ref={editor}
                  value={blogData.content}
                  name={names[4]}
                  tabIndex={1}
                  onChange={(v) =>
                    handleChange({ target: { name: names[4], value: v } })
                  }
                />
              </div>
            </div>
            <h2 className="mt-2 text-center font-semibold text-[12px] text-lg  uppercase">
              Seo
            </h2>

            <div className='flex gap-3'>
              <div className="w-[100%] px-5 py-2 mt-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Title
                </label>
                <input
                    value={blogData.seo_title}
                    type="text"
                    name={names[6]}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                        error[6] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter seo title"
                />
              </div>
              <div className="w-[100%] px-5 py-2 mt-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Description
                </label>
                <input
                    value={blogData.subtitle}
                    type="text"
                    name={names[7]}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${
                        error[7] ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Enter seo description"
                />
              </div>

            </div>


            <div className="flex justify-center mt-8">
              <button
                disabled={assignLoading}
                onClick={() => handleSubmit()}
                className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
              >
                {assignLoading ? <ButtonLoading /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogAddEdit;
