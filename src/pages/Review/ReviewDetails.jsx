import React, {useEffect, useState} from "react";
import {IoSearchSharp} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {
    acceptRequest,
    getRequest,
    rejectRequest,
} from "../../api/reducers/request";
import {assignContractor} from "../../api/reducers/contractor";
import Loading from "../../components/Loading";
import moment from "moment";
import ButtonLoading from "../../components/ButtonLoading";
import {
    acceptContractorRequest,
    rejectContractorRequest,
    singleContractorRequest,
} from "../../api/reducers/contractorRequest";
import {approveReview, getReview, rejectReview} from "../../api/reducers/review";
import {Rating} from "@mui/material";

const ReviewDetails = () => {
    const [reviewData, setReviewData] = useState();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const response = useSelector((state) => state.review);

    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    useEffect(() => {
        if (params.get("id")) {
            dispatch(getReview(params.get("id")));
        }
    }, []);

    useEffect(() => {
        if (response.review) {
            console.log(response.review)
            setReviewData(response.review);
        }
    }, [response.review]);

    const handleRejectClick = () => {
        setShowConfirmation(true);
    };

    const handleRejectConfirm = () => {
        setShowConfirmation(false);
        dispatch(rejectReview(reviewData?.id));
    };

    const handleRejectCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            {response.contractorRequestLoading ? (
                <Loading/>
            ) : (
                <div>
                    <h1 className="lg:text-3xl md:text-2xl text-xl font-[700] mt-5 ml-[3%]">
                        Review Detail
                    </h1>

                    <div
                        className="bg-white md:mt-[3rem] mt-3 rounded-xl lg:px-[3rem] px-2 md:py-16 py-8 flex flex-col md:mx-5 mx-auto">
                        {reviewData?.status === 0 && (
                            <div className="flex justify-center items center mx-auto gap-4 mb-5">
                                <button
                                    className="md:text-lg text-md bg-green-800 text-white font-semibold ml-auto mt-auto sm:px-7 px-3 rounded-lg py-2"
                                    onClick={() =>
                                        dispatch(approveReview(reviewData?.id))
                                    }
                                >
                                    ACCEPT
                                </button>
                                <button
                                    className="md:text-lg text-md bg-red-700 text-white font-semibold ml-auto mt-auto sm:px-7 px-3 rounded-lg py-2"
                                    onClick={handleRejectClick}
                                >
                                    REJECT
                                </button>
                            </div>
                        )}


                        {showConfirmation && (
                            <div
                                className=" absolute top-[60%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-[400px] p-4 h-[220px] border-2 border-gray-600 justify-center items-center  rounded-md "
                                style={{alignContent: "center"}}
                            >
                                <p className="lg:text-2xl font-semibold md:text-xl text-center">
                                    Are you sure you want to reject request?
                                </p>
                                <div className="mt-6 mb-4 justify-center flex gap-2">
                                    <button
                                        onClick={handleRejectConfirm}
                                        className="md:text-md text-sm bg-red-700 text-white font-semibold mt-auto px-7 rounded-lg py-2"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={handleRejectCancel}
                                        className="md:text-md text-sm bg-gray-600 text-white font-semibold mt-auto px-7 rounded-lg py-2"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mx-10 flex-wrap">
                            <div className="border-2 border-gray-300 bg-gray-50 rounded-2xl lg:p-6 p-3">
                                <h1 className="text-right font-semibold">
                                    {moment(reviewData?.created_date).format("ll")}
                                </h1>
                                <div className="border-[1px] border-gray-500 bg-white rounded-2xl shadow-md p-4 my-2 ">
                                    <div className="flex justify-between p-2">
                                        <h1 className="text-sm md:text-base  text-left w-[40%]">
                                            Title :
                                        </h1>
                                        <h1 className="text-sm md:text-base font-medium text-right w-[60%]">
                                            {reviewData?.title}
                                        </h1>
                                    </div>
                                    <div className="flex justify-between p-2 text-sm md:text-base ">
                                        <h1 className="text-sm md:text-base  text-left w-[40%]">
                                            Postal Code :
                                        </h1>
                                        <h1 className="font-medium">{reviewData?.postal_code}</h1>
                                    </div>
                                    <div className="text-sm md:text-lg flex justify-between items-center p-2">
                                        <h1 className="text-sm md:text-base  text-left w-[40%]">
                                            Status :
                                        </h1>
                                        <h1
                                            className={`rounded-md px-5 py-1 !text-sm text-white font-semibold ${
                                                reviewData?.status === 1
                                                    ? "bg-green-700"
                                                    : reviewData?.status === 2
                                                        ? "bg-red-700"
                                                        : "bg-gray-500"
                                            }`}
                                        >
                                            {reviewData?.status === 1
                                                ? "Accepted"
                                                : reviewData?.status === 2
                                                    ? "Rejected"
                                                    : "Pending"}
                                        </h1>
                                    </div>
                                    <div className="flex justify-between p-2">
                                        <h1 className="text-sm md:text-base  text-left w-[40%]">
                                            Review :
                                        </h1>
                                        <h1 className="text-sm md:text-lg text-right w-[60%]">
                                            {reviewData?.review}
                                        </h1>
                                    </div>
                                </div>
                                <div className="border-[1px] border-gray-500 bg-white rounded-2xl shadow-md p-4 my-2 ">
                                    <div className="flex justify-between p-2">
                                        <h1>Price :</h1>
                                        <h1>{reviewData?.price}</h1>
                                    </div>
                                    <div className="flex justify-between p-2">
                                        <h1>Satisfaction :</h1>
                                        <h1><Rating value={reviewData?.satisfaction} size="small" readOnly /></h1>
                                    </div>
                                    <div className="flex justify-between p-2">
                                        <h1 className="text-left w-[40%]">Recommendation :</h1>
                                        <h1 className="text-right w-[60%]"><Rating value={reviewData?.recommendation} size="small" readOnly /></h1>
                                    </div>
                                    <div className="flex justify-between p-2">
                                        <h1 className="text-left w-[40%]">Rating :</h1>
                                        <h1 className="text-right w-[60%]">
                                            <Rating value={reviewData?.rating} size="small" readOnly />
                                        </h1>
                                    </div>
                                </div>
                                {/*<div className="border-[1px] border-gray-500 bg-white rounded-2xl shadow-md p-4 my-2 ">*/}
                                {/*    <h1>Detail :</h1>*/}
                                {/*    <h1 className="ml-2 mt-4">{requestData?.details}</h1>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewDetails;
