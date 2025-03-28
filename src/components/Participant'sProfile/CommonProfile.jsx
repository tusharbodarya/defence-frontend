import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import Swal from "sweetalert2";

const CommonProfile = ({
  company_name,
  profile,
  main_participant_name,
  designation,
  description,
  business_activity,
  product,
  img,
}) => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  // Handle meeting request action with role checks
  const handleRequestMeetingClick = () => {
    if (!authToken) {
      Swal.fire({
        title: "Access Restricted",
        text: "To request a meeting, please log in or register for an account.",
        icon: "warning",
        showDenyButton: true,
        showCloseButton: true,
        confirmButtonText: "Login",
        denyButtonText: "Register",
        customClass: {
          confirmButton: "swal-confirm-button",
          denyButton: "swal-deny-button",
          closeButton: "swal-close-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.isDenied) {
          navigate("/register");
        }
      });
    } else {
      window.open("https://meetings.defencepartners.in/", "_blank");
    }
  };

  // Navigate to company profile page
  const handleCompanyProfile = () => {
    navigate(
      `/companyprofile?company=${encodeURIComponent(
        company_name
      )}&profile=${encodeURIComponent(profile)}`
    );
  };

  // Parse JSON safely and fallback to string if parsing fails
  const parseJsonSafely = (input, defaultValue = []) => {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return input ? [input] : defaultValue;
    }
  };

  // Safely parse business activity and products
  const businessActivityList = Array.isArray(business_activity) ? business_activity : JSON.parse(business_activity || "[]");

  const mainBusinessProductList = Array.isArray(product) ? product : JSON.parse(product || "[]");

  // Convert lists to comma-separated strings
  // const businessActivityString = businessActivityList.join(", ");
  // const mainBusinessProductString = mainBusinessProductList.join(", ");

  return (
    <div className="rounded-2xl xl:rounded-3xl border-[1px] border-iconborder/25 p-3 xl:p-4 flex flex-col justify-between h-full">
      <div className="flex justify-center items-center">
        <div className="relative w-full h-0 pb-[65%] overflow-hidden rounded-2xl xl:rounded-3xl">
          <img
            src={img}
            alt={`${company_name} logo`}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-sm md:text-base lg:text-lg py-2 flex-grow">
        <h3 className="text-xl font-semibold truncate-2 text-center">{company_name}</h3>
        <div className="text-black/50">
          <div className="truncate-2">{description}</div>
          <div className="truncate">{main_participant_name}</div>
          <div className="truncate">{designation}</div>
          <div className="truncate">
            <ul
              className="overflow-hidden scrollbar-hide truncate "
              style={{ maxHeight: '1.5rem', lineHeight: '1.5rem' }} // Two rows of list items with 1.5rem line height
            >
              {
                businessActivityList.filter(product => product).length > 0 ? (
                  businessActivityList.filter(product => product && product.trim() && product !== "null").map((product, index) => (
                    <li className="inline" key={index}> {product},</li>
                  ))
                ) : (
                  ""
                )
              }
            </ul>
            {/* {businessActivityString} */}
          </div>
          <div className="truncate-2-lines">
            <ul
              className="overflow-hidden capitalize scrollbar-hide "
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
          onClick={handleCompanyProfile}
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

export default CommonProfile;
