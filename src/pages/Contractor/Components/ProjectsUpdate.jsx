import React, { useEffect, useState } from "react";
import { IMAGE_PATH } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import editImage from "../../../components/assets/edit.png";
import deleteImage from "../../../components/assets/delete.png";
import {
  addProject,
  deleteProject,
  projectSuccessListener,
} from "../../../api/reducers/contractor";
import { getSubcategories } from "../../../api/reducers/subcategory";
import FileResizer from "react-image-file-resizer";
import DeleteModal from "../../../components/DeleteModal";
import { getCategories } from "../../../api/reducers/category";
import subcategoryService from "../../../api/services/subcategoryService";


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

const ProjectUpdate = () => {
  const location = useLocation();
  const id = 4580;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const names = ["title", "details", "subcategory", "date", "category"];
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [errors, setErrors] = useState([false, false, false, false, false]);
  const [subCategories, setSubCategories] = useState([]);
  const [projectData, setProjectData] = useState({
    contractor: 0,
    title: "",
    details: "",
    subcategory: "",
    date: "",
    images: "",
    category: 0,
  });
  const [add, setAdd] = useState(false);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [limitLength, setLimitLength] = useState();
  const [invalidFile, setInvalidFile] = useState(false);

  const subcategoryResponse = useSelector((state) => state.subcategory);
  const categoryResponse = useSelector((state) => state.category);
  const response = useSelector((state) => state.response);

  useEffect(() => {
    if (!subcategoryResponse.fetched) {
      dispatch(getSubcategories());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (id) {
      setProjectData((data) => ({ ...data, contractor: parseInt(id) }));
    }
  }, [id]);

  useEffect(() => {
    if (response?.projectSuccess) {
      navigate("/contractors");
      dispatch(projectSuccessListener());
    }
  }, [response?.projectSuccess]);

  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  useEffect(() => {
    const fetchSubCategory = async () => {
      const response = await subcategoryService.byCategory(
        projectData?.category
      );
      setSubCategories(response?.subcategories);
    };
    fetchSubCategory();
  }, [projectData?.category]);

  const handleDelete = () => {
    dispatch(deleteProject(deleteID));
  };

  const handleFileChange = async (event) => {
    const localFiles = event.target.files;
    let isValidFile = true;
    const newImageUrls = [];
    let imgs = [...files];
    for (const f of localFiles) {
      const img = await resizeFile(f);
      imgs.push(img);
    }
    setFiles(imgs);

    if (images.length + localFiles.length > 8) {
      setLimitLength(true);
      return;
    }

    Array.from(localFiles).forEach((file) => {
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
                        {images.map((value, index) => (
                          <img
                            key={index}
                            src={value}
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
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h3"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 12v5m0 0H8m2 0h2M10 1v4"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 4a2.571 2.571 0 0 1 3-3 2.571 2.571 0 0 1 3 3"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                  {invalidFile && (
                    <p className="text-red-500 text-xs mt-1">
                      Invalid file format. Please upload an image.
                    </p>
                  )}
                  {limitLength && (
                    <p className="text-red-500 text-xs mt-1">
                      Maximum 8 images are allowed.
                    </p>
                  )}
                </div>
              )}
              <input
                id="dropzone-file"
                name="image"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
            </label>
          </div>

        </div>
      </div>
          <div className="flex w-full">
            <div className="w-[100%] px-5 py-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Category
              </label>
              <select
                value={projectData.category}
                onChange={(e) => handleChange(e)}
                name={names[4]}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                  errors[4] ? "border-red-600" : "border-gray-300"
                }`}
              >
                <option value="">Select Category</option>
                {categoryResponse?.categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[100%] px-5 py-2">
              <label className="block text-[12px] ml-3 font-medium uppercase">
                Subcategory
              </label>
              <select
                value={projectData.subcategory}
                onChange={(e) => handleChange(e)}
                name={names[2]}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1 ${
                  errors[2] ? "border-red-600" : "border-gray-300"
                }`}
              >
                <option value="">Select Subcategory</option>
                {subCategories?.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
      <div className="float-right mt-[1rem]">
        <button
          onClick={() => handleSubmit()}
          className="inline-block text-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-white mr-2"
        >
          {id ? "Update" : "Submit"}
        </button>
        <button
          onClick={() => navigate("/contractors")}
          className="inline-block text-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-white mr-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProjectUpdate;
