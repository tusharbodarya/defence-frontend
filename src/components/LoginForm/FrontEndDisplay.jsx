import React, { useContext, useEffect, useState } from "react";

import string from "../../constants/string";
import blankProfile from "../../assets/blankprofile.png";
import RequestMeeting from "./RequestMeeting";
import { useNavigate, useParams } from "react-router-dom";
import { getKeyGovServicesOfficer } from "../../apiEndpoints"; // Adjust the import path as necessary
import Swal from "sweetalert2";
import { AuthContext } from "../../utils/AuthContext";

const FrontEndDisplay = () => {
  const { name } = useParams();
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken, email, logout } = useContext(AuthContext); // Access context values
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        setLoading(true);
        const response = await getKeyGovServicesOfficer();

        if (response.success) {
          const matchedParticipant = response.data.find(
            (p) =>
              p?.main_participant_name?.toLowerCase() ===
              decodeURIComponent(name).toLowerCase()
          );
          console.log(matchedParticipant);

          if (matchedParticipant) {
            setParticipant(matchedParticipant);
          } else {
            setError("Participant not found");
          }
        } else {
          setError("Failed to fetch participant data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchParticipant();
  }, [name]);

  // Safely parse business activity and products
  const subjectResponsibility = Array.isArray(participant?.main_subjects)
    ? participant?.main_subjects
    : JSON.parse(participant?.main_subjects || "[]");

  const serviceOfficer = Array.isArray(participant?.products_services)
    ? participant?.products_services
    : JSON.parse(participant?.products_services || "[]");

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
  };
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }
  return (
    <section className="">
      <div className="relative">
        <div className="bg-footerblue p-20  xl:p-28 my-4 mb-[22rem] sm:mb-[24rem] xl:mb-[32rem]"></div>
        <div className="absolute flex flex-col lg:gap-4 w-[90%] sm:w-[85%] items-center top-[20%] sm:top-[50%] left-1/2 transform -translate-x-1/2 p-2 h-[29rem] sm:h-[28rem] xl:h-[40rem]">
          <div className="h-[50%]">
            <div className="inline overflow-hidden h-full rounded-full">
              <img
                src={
                  participant?.main_participant_image
                    ? `${process.env.REACT_APP_BASE_URI}/storage/${participant?.main_participant_image}`
                    : blankProfile
                }
                alt={participant?.main_participant_name}
                className="border-4 border-white rounded-full w-60 xl:w-80 h-60 xl:h-80"
              />
            </div>
          </div>
          <div className="inline text-center h-[50%] overflow-auto">
            <div className="text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-4xl sm:py-2 font-semibold">
              {participant?.user?.title ? participant?.user?.title : " "}{" "}
              {" " +
                participant?.user?.first_name +
                " " +
                participant?.user?.last_name}
            </div>
            {/* <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl pb-1">
              {participant?.user.title}
            </div> */}
            <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl sm:pb-1">
              {participant?.main_participant_designation}
            </div>
            <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl sm:pb-1">
              {participant?.branch_name}
            </div>
            {/* <div className='text-xs md:text-sm lg:text-base xl:text-base 2xl:text-lg text-black/50'>
                            {string.loginkeyprofilemini}
                        </div> */}
            <div className="flex justify-center my-2 gap-2">
              <button
                onClick={handleRequestMeetingClick}
                className="rounded-full text-textblue ring-2 ring-textblue text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl py-1 2xl:py-2 px-2 lg:px-3"
              >
                View Full Profile
              </button>
              <button
                onClick={handleRequestMeetingClick}
                className="bg-textblue rounded-full text-white text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl py-1 2xl:py-2 px-2 lg:px-3"
              >
                Request Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center font-poppins xl:py-12">
        <div className="container 3xl:w-[70%] px-4 xl:px-20 pb-40">
          <div className="flex flex-col gap-4">
            <div className="border-[1px] border-iconborder/25 rounded-xl xl:rounded-3xl p-4 uppercase">
              <RequestMeeting
                img={participant?.main_participant_image}
                title={string?.mainparticipant}
                name={participant?.main_participant_name}
                designation={participant?.main_participant_designation}
                org={participant?.main_participant_org || ""}
                service={participant?.main_participant_service || ""}
                designation2={string?.reqmeetdesignation2}
                designation1={string?.reqmeetdesignation1}
                btn={string?.reqmeetbtn}
                profileBtn={"View Full Profile"}
              />
            </div>
            {participant?.substitute_participant_name && (
              <div className="border-[1px] border-iconborder/25 rounded-xl xl:rounded-3xl p-4 uppercase">
                <RequestMeeting
                  img={participant?.substitute_participant_image}
                  title={string.secondparticipant}
                  name={participant?.substitute_participant_name}
                  designation={participant?.substitute_participant_designation}
                  org={participant?.substitute_participant_org || ""}
                  service={participant?.substitute_participant_service || ""}
                  designation2={string.reqmeetdesignation2}
                  designation1={string.reqmeetdesignation1}
                  btn={string.reqmeetbtn}
                  profileBtn={"View Full Profile"}
                />
              </div>
            )}
            <div className="border-[1px] border-iconborder/25 rounded-xl xl:rounded-3xl p-4">
              <div className="relative font-EBGaramond text-center mb-8 ">
                <h2 className=" text-left text-base lg:text-xl  2xl:text-2xl uppercase py-1">
                  {string.loginkeycard3}
                </h2>
                <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="w-full sm:w-[50%]">
                  <div className="text-black/50 text-xs lg:text-sm xl:text-base 2xl:text-lg uppercase">
                    {string.loginkeycard3label1}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                    {participant?.branch_name}
                  </div>
                </div>
                <div className="w-full sm:w-[50%]">
                  <div className="text-black/50 text-xs lg:text-sm xl:text-base 2xl:text-lg uppercase">
                    {string.loginkeycard3label2}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                    {participant?.branch_service}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-[1px] border-iconborder/25 rounded-xl xl:rounded-3xl p-4">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="w-full sm:w-[50%]">
                  <div className="text-black/50 text-xs lg:text-sm xl:text-base 2xl:text-lg uppercase">
                    {string.reqmeetlabel3}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                    {/* {JSON.parse(participant?.main_subjects).join(", ")} */}
                    <ul
                      className="list-disc list-inside scrollbar-hide"
                    // style={{ maxHeight: '6rem', lineHeight: '1rem sm:1.5rem' }} // Two rows of list items with 1.5rem line height
                    >
                      {subjectResponsibility.length > 0
                        ? subjectResponsibility.map((product, index) => (
                          <li className="inline" key={index}>
                            {product},{" "}
                          </li>
                        ))
                        : "N/A"}
                    </ul>
                  </div>
                </div>
                <div className="w-full sm:w-[50%]">
                  <div className="text-black/50 text-xs lg:text-sm xl:text-base 2xl:text-lg uppercase">
                    {string.reqmeetlabel4}
                  </div>
                  <div
                    onClick={() => console.log(participant?.products_services)}
                    className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
                  >
                    {/* {JSON.parse(participant?.products_services).join(", ")} */}
                    <ul
                      className=" list-disc list-inside scrollbar-hide"
                    // style={{ maxHeight: '6rem', lineHeight: '1rem sm:1.5rem' }} // Two rows of list items with 1.5rem line height
                    >
                      {serviceOfficer.length > 0
                        ? serviceOfficer.map((product, index) => (
                          <li className="inline" key={index}>
                            {product},{" "}
                          </li>
                        ))
                        : "N/A"}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontEndDisplay;
