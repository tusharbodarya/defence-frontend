import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../utils/AuthContext";
import Swal from "sweetalert2";
import Participant from "./Participant'sProfile/Participant";

const KeyGovtOfficersProfileCard = ({
    company_name,
    main_participant_name,
    mainParticipantName,
    description,
    participant,
    img,
    responsibility,
    product
}) => {
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);

    // Handle meeting request action with role checks
    const handleRequestMeetingClick = () => {
        Swal.fire({
            title: "The event is over",
            text: "",
            icon: "info",
            confirmButtonText: "OK",
            showCancelButton: false, // Disable the cancel button
            showDenyButton: false, // Disable the deny button
            customClass: {
                confirmButton: "swal-confirm-button", // Optional: Apply custom styles if needed
            },
        });
        // if (!authToken) {
        //     Swal.fire({
        //         title: "Access Restricted",
        //         text: "To request a meeting, please log in or register for an account.",
        //         icon: "warning",
        //         showDenyButton: true,
        //         showCloseButton: true,
        //         confirmButtonText: "Login",
        //         denyButtonText: "Register",
        //         customClass: {
        //             confirmButton: "swal-confirm-button",
        //             denyButton: "swal-deny-button",
        //             closeButton: "swal-close-button",
        //         },
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             navigate("/login");
        //         } else if (result.isDenied) {
        //             navigate("/register");
        //         }
        //     });
        // } else {
        //     window.open("https://meetings.defencepartners.in/", "_blank");
        // }
    };

    const handleViewProfileClick = (participantName) => {
        if (!participantName) {
            Swal.fire({
                icon: "info",
                title: "Profile Not Available",
                text: "Profile data is currently not available.",
            });
        } else {
            const encodedName = encodeURIComponent(participantName);
            navigate(`/frontenddisplay/${encodedName}`);
        }
    };


    // Safely parse business activity and products
    const responsibilityOfficer = Array.isArray(responsibility) ? responsibility : JSON.parse(responsibility || "[]");

    const mainBusinessProductList = Array.isArray(product) ? product : JSON.parse(product || "[]");

    // Parse JSON safely and fallback to string if parsing fails
    const parseJsonSafely = (input, defaultValue = []) => {
        try {
            const parsed = JSON.parse(input);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            return input ? [input] : defaultValue;
        }
    };




    return (
        <div className="rounded-2xl xl:rounded-3xl border-[1px] border-iconborder/25 p-3 xl:p-6 flex flex-col justify-between h-full">
            <div className="flex justify-center items-center">
                <div className="relative w-full h-0 pb-[120%] overflow-hidden rounded-2xl xl:rounded-3xl">
                    <img
                        src={img}
                        alt={company_name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="text-sm md:text-base lg:text-lg py-2 flex-grow">
                <h3 className="text-xl font-semibold truncate-2 text-center">
                    {company_name}
                </h3>
                <div className="text-black/50">
                    <div className="truncate-2">{main_participant_name}</div>
                    <div className="truncate">{description}</div>
                    <div className="truncate">{mainParticipantName}</div>
                    <div className=" truncate ">
                        <ul
                            className="overflow-hidden capitalize "
                            style={{ maxHeight: '1.5rem', lineHeight: '1.5rem' }} // Two rows of list items with 1.5rem line height
                        >
                            {responsibilityOfficer.filter(product => product).length > 0 ? (
                                responsibilityOfficer
                                    .filter(product => product && product.trim() && product !== 'null') // Filter out null, empty strings, and the string 'null'
                                    .map((product, index) => (
                                        <li key={index}>{product}</li>
                                    ))
                            ) : (
                                ""
                            )}
                        </ul>
                    </div>
                    <div className=" truncate-2-lines ">
                        <ul
                            className=" capitalize overflow-hidden"
                            style={{ maxHeight: '3rem', lineHeight: '1.5rem' }} // Two rows of list items with 1.5rem line height
                        >
                            {mainBusinessProductList.filter(product => product).length > 0 ? (
                                mainBusinessProductList.filter(product => product && product.trim() && product !== "null").map((product, index) => (
                                    <li key={index} className="inline"> {product.toLowerCase()}, </li>
                                ))
                            ) : (
                                ""
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center space-y-2 w-full mt-4">
                {/* Buttons for authenticated and non-authenticated users */}
                <button
                    onClick={() =>
                        handleViewProfileClick(participant)
                    }
                    className="w-full bg-white border-[1px] border-blue-500 text-blue-500 py-2 px-4 rounded-full"
                >
                    View Short Profile
                </button>
                {!authToken ? (
                    <button
                        onClick={handleRequestMeetingClick}
                        className="w-full border-[1px] border-blue-500 text-white bg-blue-500 py-2 px-4 rounded-full"
                    >
                        Request Meeting
                    </button>
                ) : (
                    <a
                        href="https://meetings.defencepartners.in/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full text-white border-[1px] border-blue-500 bg-blue-500 py-2 px-4 rounded-full text-center"
                    >
                        Request Meeting
                    </a>
                )}
            </div>
        </div>
    );
};

export default KeyGovtOfficersProfileCard;
