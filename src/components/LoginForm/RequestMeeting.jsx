import React, { useContext } from "react";
import Swal from "sweetalert2";
import blankProfile from "../../assets/blankprofile.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../utils/AuthContext.js";

const RequestMeeting = ({
  title, userTitle, name, img, designation, designation1, designation2, name1, name2, org, service, btn, profileBtn,
}) => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

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
    //   Swal.fire({
    //     title: "Access Restricted",
    //     text: "To request a meeting, please log in or register for an account.",
    //     icon: "warning",
    //     showCancelButton: false, // Disable the default cancel button
    //     confirmButtonText: "Login",
    //     denyButtonText: "Register",
    //     showDenyButton: true,
    //     showCloseButton: true, // Show the close button
    //     customClass: {
    //       confirmButton: "swal-confirm-button",
    //       denyButton: "swal-deny-button",
    //       closeButton: "swal-close-button", // Custom class for the close button
    //     },
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       navigate("/login");
    //     } else if (result.isDenied) {
    //       navigate("/register");
    //     }
    //   });
    // } else {
    //   window.open("https://meetings.defencepartners.in/", "_blank");
    // }
  };

  const safeJsonParse = (jsonString, fallbackValue = null) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return fallbackValue;
    }
  };


  // Safely parse business activity and products
  const businessActivityList = Array.isArray(name1) ? name1 : JSON.parse(name1 || "[]");

  const mainBusinessProductList = Array.isArray(name2) ? name2 : JSON.parse(name2 || "[]");

  const handleProfileClick = () => {
    if (!authToken) {
      Swal.fire({
        title: "Access Restricted",
        text: "To view the profile, please log in or register for an account.",
        icon: "warning",
        showCancelButton: false, // Disable the default cancel button
        confirmButtonText: "Login",
        denyButtonText: "Register",
        showDenyButton: true,
        showCloseButton: true, // Show the close button
        customClass: {
          confirmButton: "swal-confirm-button",
          denyButton: "swal-deny-button",
          closeButton: "swal-close-button", // Custom class for the close button
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

  return (
    <div className="flex flex-col sm:flex-row gap-4 ">
      <div className="sm:w-[30%] lg:w-[20%] flex justify-center items-center">
        <img
          src={
            img
              ? `${process.env.REACT_APP_BASE_URI}/storage/${img}`
              : blankProfile
          }
          alt=""
          className="rounded-xl w-60 h-auto"
        />
      </div>
      <div className="flex flex-col justify-between gap-3 w-full lg:w-[80%] ">
        <div className="relative font-EBGaramond text-left">
          <h2 className="text-base lg:text-xl xl:text-2xl 2xl:text-3xl uppercase text-footerblue lg:pb-2">
            {title}
          </h2>
          <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
        </div>
        <div className="space-y-4">
          <div>
            <p onClick={() => console.log(userTitle)} className="font-semibold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {userTitle}{" "}{name}
            </p>
            <p className="text-black/50 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {designation}
            </p>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="w-[50%] ">
              <div className="text-black/50 text-xs lg:text-sm xl:text-base 2xl:text-lg">
                {designation1}
              </div>
              <div className="truncate-2 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl ">
                {!org ? (
                  <ul
                  // className={`scrollbar-hide  ${org ? "overflow-hidden" : "overflow-auto"} `}
                  // style={{ maxHeight: '3rem', lineHeight: '1.5rem' }} // Two rows of list items with 1.5rem line height
                  >
                    {businessActivityList.length > 0 ? (
                      businessActivityList.map((product, index) => (
                        <li key={index} className="inline-block">{product === "null" ? "" : product}
                          {index !== businessActivityList.length - 1 && <span>, &nbsp; </span>} {/* Add space after each item except the last one */}
                        </li>
                      ))
                    ) : (
                      "N/A"
                    )}
                  </ul>
                ) : (
                  <div>{org}</div>
                )}
              </div>
            </div>
            <div className="w-[50%]">
              <div className="text-black/50 text-xs lg:text-sm xl:text-base 2xl:text-lg">
                {designation2}
              </div>
              <div className="truncate-2 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl ">
                {!service ? (
                  <ul
                  // className={` scrollbar-hide ${service ? "overflow-hidden" : "overflow-auto"} `}
                  //style={{ maxHeight: '3rem', lineHeight: '1.5rem' }} // Two rows of list items with 1.5rem line height
                  >
                    {mainBusinessProductList.length > 0 ? (
                      mainBusinessProductList.map((product, index) => (
                        <li className="inline-block" key={index}>
                          {product === "null" ? " " : product}
                          {index !== mainBusinessProductList.length - 1 && <span>, &nbsp; </span>} {/* Add space after each item except the last one */}
                        </li>
                      ))
                    ) : (
                      "N/A"
                    )}
                  </ul>
                ) : (
                  <div>{service}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRequestMeetingClick}
            className="rounded-full text-textblue ring-2 ring-textblue text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl py-1 2xl:py-2 px-2 lg:px-3"
          >
            {profileBtn}
          </button>
          <button
            onClick={handleRequestMeetingClick}
            className="bg-textblue rounded-full ring-2 ring-textblue text-white text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl py-1 2xl:py-2 px-2 lg:px-3"
          >
            {btn}
          </button>
        </div>
      </div>
    </div >
  );
};

export default RequestMeeting;
