import React, { useEffect, useState } from "react";
import { IMAGE_PATH } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import editImage from "../../../components/assets/edit.png";
import deleteImage from "../../../components/assets/delete.png";
import {
  addBadge,
  addProject,
  deleteProject,
  projectSuccessListener,
} from "../../../api/reducers/contractor";
import { getSubcategories } from "../../../api/reducers/subcategory";
import FileResizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      700,
      700,
      "png",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

const Projects = ({ id, response }) => {
  const names = ["title", "details", "subcategory", "date"];

  const [errors, setErrors] = useState([false, false, false, false]);
  const [projectData, setProjectData] = useState({
    contractor: 0,
    title: "",
    details: "",
    subcategory: "",
    date: "",
    images: "",
  });
  const [add, setAdd] = useState(false);
  const [file, setFile] = useState();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [limitLength, setLimitLength] = useState();
  const [invalidFile, setInvalidFile] = useState(false);

  const subcategoryResponse = useSelector((state) => state.subcategory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!subcategoryResponse.fetched) {
      dispatch(getSubcategories());
    }
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      setProjectData((data) => ({ ...data, contractor: parseInt(id) }));
    }
  }, [id]);

  useEffect(() => {
    if (response.projectSuccess) {
      navigate("/contractors");
      dispatch(projectSuccessListener());
    }
  }, [response.projectSuccess]);

  const handleFileChange = async (event) => {
    const localfiles = event.target.files;
    let isValidFile = true;
    const newImageUrls = [];
    let imgs = [...files];
    for (const f of localfiles) {
      const img = await resizeFile(f);
      imgs.push(img);
    }
    setFiles(imgs);

    if (images.length + localfiles.length > 8) {
      setLimitLength(true);
      return;
    }

    Array.from(localfiles).forEach((file) => {
      if (
        file.type.match("image/jpeg") ||
        file.type.match("image/png") ||
        file.type.match("image/gif") ||
        file.type.match("image/svg+xml")
      ) {
        const fileURL = URL.createObjectURL(file);
        newImageUrls.push(fileURL);
      } else {
        isValidFile = false;
      }
    });

    if (isValidFile) {
      setInvalidFile(false);
      setImages((prevImages) => [...prevImages, ...newImageUrls]);
    } else {
      setInvalidFile(true);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      setProjectData((data) => ({ ...data, images: "contain" }));
    }
  }, [files]);

  const handleChange = (e) => {
    let tempErrors = [...errors];
    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setProjectData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    let tempErrors = [...errors];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = projectData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      dispatch(addProject({ files: files, project: projectData }));
    }
  };

  return (
    <div>
      {add ? (
        <div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-2 flex-wrap">
            <div className="min-w-[250px]">
              <div className="w-[100%] px-5 py-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Title
                </label>
                <input
                  value={projectData.title}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name={names[0]}
                  placeholder="Enter Title Here"
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                    errors[0] ? "border-red-600" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="w-[100%] px-5 py-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Details
                </label>
                <input
                  value={projectData.details}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name={names[1]}
                  placeholder="Enter Details Here"
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                    errors[1] ? "border-red-600" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="w-[100%] px-5 py-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Date
                </label>
                <input
                  value={projectData.date}
                  onChange={(e) => handleChange(e)}
                  type="date"
                  name={names[3]}
                  placeholder="Enter Date Here"
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                    errors[3] ? "border-red-600" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="w-[100%] px-5 py-2 mt-2">
                <label className="block text-[12px] ml-3 font-medium uppercase">
                  Subcategory
                </label>
                <select
                  name={names[2]}
                  value={projectData.subcategory}
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                  id="grid-state"
                >
                  <option hidden>Select Category</option>
                  {subcategoryResponse.subcategories.map((value) => (
                    <option value={value.id}>{value.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="min-w-[250px] w-[100%] ">
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col items-center justify-center w-full h-60 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-[2.0rem] ${
                    !files ? "border-red-600" : "border-gray-300"
                  }`}
                >
                  {projectData.images ? (
                    <>
                      {files ? (
                        <>
                          <div className={`grid grid-cols-4 gap-2`}>
                            {images.map((value) => (
                              <img
                                src={`${value}`}
                                alt=""
                                className={`rounded-lg w-[80px] h-[80px] py-[2px] object-cover`}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        <img
                          src={`${IMAGE_PATH}${projectData.image}`}
                          alt=""
                          className={`rounded-lg object-contain w-[80px] h-[80px] py-[2px]`}
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
                    name={names[3]}
                    className="hidden"
                    onChange={(e) => handleFileChange(e)}
                    multiple={true}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => handleSubmit()}
              className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-[1200px]">
            <button
              onClick={() => setAdd(true)}
              className="flex bg-[#0D14FD] cursor-pointer py-2 sm:px-[1rem] px-2 text-white font-[500] rounded-xl ml-auto items-center sm:text-lg text-xs justify-center hover:scale-110 max-w-[900px]"
            >
              Add Project
            </button>
          </div>
          <div className={`flex flex-row flex-wrap gap-5 mt-6`}>
            {response?.contractorDetails?.projects?.map((value) => (
              <div
                className={`flex flex-col flex-wrap text-center shadow-[rgba(0,0,15,0.05)_0px_0px_10px_5px] rounded-2xl bg-gray-50 max-w-[320px] p-4`}
              >
                <span
                  className={`min-h-[60px] mt-2 font-bold text-left text-lg`}
                >
                  {value.title}
                </span>
                {/* <span className={`mt-1 font-medium text-[12px]`}>
                  {value.subtitle}
                </span> */}
                <div
                  className={` flex flex-col py-6 justify-center items-center`}
                >
                  <div className={`grid grid-cols-3 gap-2`}>
                    {value.images.map((img) => (
                      <img
                        className="w-24 h-24 rounded-xl"
                        src={`${IMAGE_PATH}${img.image}`}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-left pb-3">
                  <div className="w-8 ml-1 cursor-pointer hover:scale-125">
                    <img src={editImage} alt="Edit" />
                  </div>
                  <div
                    onClick={() => dispatch(deleteProject(value.id))}
                    className="w-8 ml-5 cursor-pointer hover:scale-125"
                  >
                    <img src={deleteImage} alt="Delete" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
