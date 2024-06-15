import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ButtonLoading from "../../../components/ButtonLoading";
import {useNavigate} from "react-router-dom";
import {addContractorSeo, editContractorSeo, seoSuccessListener} from "../../../api/reducers/contractor";


const SEO = ({ id, response }) => {
    const [assignLoading, setAssignLoading] = useState(false);

    const names = [
        "title",
        "description"
    ];
    const [error, setErrors] = useState([
        false,
        false,
    ]);
    const [seoData, setSeoData] = useState({
        contractor: "",
        title: "",
        description: "",
        page_description: ""
    });

    useEffect(() => {
        if (id) {
            setSeoData((data) => ({ ...data, contractor: parseInt(id) }));
        }
    }, [id]);

    const [edit, setEdit] = useState(false);

    const categoryResponse = useSelector((state) => state.category);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (response.contractorDetails?.seo) {
            setEdit(true);
            setSeoData(response.contractorDetails.seo);
        }
    }, [response.contractorDetails]);

    useEffect(() => {
        if (response.seoSuccess) {
            navigate("/contractors");
            dispatch(seoSuccessListener());
        }
    }, [response.seoSuccess]);

    const handleChange = (e) => {
        let tempErrors = [...error];
        tempErrors[names.indexOf(e.target.name)] = false;
        setErrors(tempErrors);
        setSeoData((data) => ({ ...data, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        let tempErrors = [...error];
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            tempErrors[i] = seoData[name].length === 0;
        }
        setErrors(tempErrors);
        if (!tempErrors.includes(true)) {
            setAssignLoading(true);
            if (edit) {
                dispatch(editContractorSeo(seoData)).then(() => {
                    setAssignLoading(false);
                });
            } else {
                dispatch(addContractorSeo(seoData)).then(() => {
                    setAssignLoading(false);
                });
            }
        }
    };

    return (
        <>
            <div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="w-[100%] px-5 py-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            name={names[0]}
                            placeholder="Enter Your Title"
                            value={seoData.title}
                            onChange={(e) => handleChange(e)}
                            className={
                                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
                            }
                        />
                    </div>

                    <div className="w-[100%] px-5 py-2">
                        <label className="block text-[12px] ml-3 font-medium uppercase">
                            Meta Description
                        </label>
                        <input
                            type="text"
                            name={names[1]}
                            placeholder="Enter Your Description"
                            value={seoData.description}
                            onChange={(e) => handleChange(e)}
                            className={
                                "pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] focus:border-black focus:outline-none mt-1"
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        disabled={assignLoading}
                        onClick={(e) => handleSubmit(e)}
                        className="bg-blue-600 text-white py-2 px-8 rounded-xl font-semibold text-[15px] uppercase"
                    >
                        {assignLoading ? <ButtonLoading /> : "Submit"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SEO;
