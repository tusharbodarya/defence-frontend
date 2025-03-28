import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player"; // Import react-player
import blankProfile from "./../../assets/blankprofile.png";
import download from "../../assets/download.png";
import dummyVideo from "../../assets/company35.png"; // Dummy image for when no video is available
import video from './../../assets/video.png'
import RequestMeeting from "./RequestMeeting";
import { useLocation } from "react-router-dom";
import { getUserListByRole } from "../../apiEndpoints";

const CompanyProfile = () => {
  const location = useLocation();
  const [participants, setParticipants] = useState([]);

  // Extract query parameters
  const params = new URLSearchParams(location.search);
  const companyName = decodeURIComponent(params.get("company"));
  const profile = decodeURIComponent(params.get("profile"));

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await getUserListByRole(profile);
        if (response.success) {
          // Filter the data based on the company value
          const filteredParticipants = response.data.filter(
            (participant) => participant.user.company === companyName
          );
          setParticipants(filteredParticipants);
        } else {
          console.error("Failed to fetch officers:", response.message);
        }
      } catch (error) {
        console.error("Error fetching officers:", error);
      }
    };
    fetchOfficers();
  }, [profile, companyName]);

  // Get the primary and secondary profiles if available
  const mainProfile = participants[0]?.main_profile;
  const otherProfile = participants[0]?.other_profile?.[0];

  return (
    <section className="mb-20">
      <div className="relative">
        {/* Header Section */}
        <div className="flex justify-center">
          <div className="absolute container px-4 sm:px-0 top-[4.5rem]">
            <div className="bg-keygovtbg p-4 md:p-8 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl w-full rounded-xl flex items-center justify-between">
              <div>
                To view full profile and to request for meetings, you must be
                registered and logged in.
              </div>
              <button className="border-[1px] border-textblue bg-white rounded-full py-2 px-4 text-textblue">
                <a href="/register">Register</a>
              </button>
            </div>
          </div>
        </div>

        {/* Company Logo Section */}
        <div className="bg-footerblue p-20 mt-[8rem]  mb-[18rem] sm:mb-[20rem] lg:mb-[22rem] xl:mb-[24rem]"></div>
        <div className="absolute top-[10%] sm:top-[13%] md:top-[15%] lg:top-[14%] w-[90%] sm:w-[85%] left-1/2 transform -translate-x-1/2 h-[10rem] ">
          <div className=" rounded-3xl overflow-hidden bg-white border-4 lg:border-6 border-white w-72 h-full mx-auto">
            <img
              src={
                participants[0]?.company?.company_logo
                  ? `${process.env.REACT_APP_BASE_URI}/storage/${participants[0]?.company?.company_logo}`
                  : blankProfile
              }
              alt="Company Logo"
              className="w-full h-full"
              onClick={() => console.log(participants)
              }
            />
          </div>
          {/* Company Name and Description */}
          <div className="sm:inline text-center  h-full ">
            <div className="relative text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-4xl my-2  uppercase font-EBGaramond">
              {participants[0]?.company?.name || "Company Name"}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
            </div>
            {participants[0]?.company_description && (
              <div className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl mb-2 text-black/50 max-h-[10rem]  overflow-auto text-justify scrollbar-hide">
                {participants[0]?.company_description}
              </div>
            )}
          </div>
        </div>

        <div className="container 3xl:w-[70%] px-4 sm:px-0 mx-auto pt-20 xl:pt-0 space-y-8 ">
          {/* Participant Details Section */}
          <div className="flex flex-col gap-8">
            {/* Main Profile */}
            {mainProfile && (
              <div className="border-[1px] border-iconborder/25 rounded-xl p-4">
                <RequestMeeting
                  title={"Main Business Participant"}
                  userTitle={participants[0]?.user?.title || " "}
                  name={mainProfile?.main_business_name || "Participant Name"}
                  img={mainProfile?.main_business_image}
                  designation={
                    mainProfile?.main_business_designation || "Designation"
                  }
                  name1={
                    mainProfile?.main_business_activities || ""
                  }
                  name2={
                    mainProfile?.main_business_products || ""
                  }
                  designation2={"Product/Services"}
                  designation1={"Main Business Activities"}
                  profileBtn={"View Full Profile"}
                  btn={"Request Meeting"}
                />
              </div>
            )}

            {/* Other Profile */}
            {otherProfile && (
              <div className="border-[1px] border-iconborder/25 rounded-xl p-4">
                <RequestMeeting
                  title={"Second Business Participant"}
                  name={otherProfile?.main_business_name || "Participant Name"}
                  img={otherProfile?.main_business_image}
                  designation={
                    otherProfile?.main_business_designation || "Designation"
                  }
                  name1={
                    otherProfile?.main_business_activities || ""
                  }
                  name2={
                    otherProfile?.main_business_products || ""
                  }
                  designation2={"Product/Services"}
                  designation1={"Main Business Activities"}
                  profileBtn={"View Full Profile"}
                  btn={"Request Meeting"}
                />
              </div>
            )}
          </div>

          {/* Video and Brochure Section */}
          <div className="flex flex-col px-4 sm:px-0 sm:flex-row justify-between gap-8 lg:gap-12">
            {/* Video Section */}
            <div className="relative w-full h-60 md:h-80 lg:h-96 xl:[27rem] sm:w-[68%] lg:w-[50%] mx-auto">
              {participants[0]?.company_video ? (
                <div className="relative w-auto h-60 md:h-80 lg:h-96 xl:h-[27rem] rounded-xl overflow-hidden">
                  <ReactPlayer
                    url={`${process.env.REACT_APP_BASE_URI}/storage/${participants[0]?.company_video}`}
                    controls
                    width="100%"
                    height="100%"
                    fallback={<img src={dummyVideo} alt="Dummy Video" />}
                  />
                  <p className="absolute">{ }</p>
                </div>
              ) : (
                <div className="relative w-auto h-60 md:h-80 lg:h-96 xl:h-[27rem] rounded-2xl flex items-center justify-center bg-iconborder/25">
                  <div
                    className="absolute flex gap-2 justify-center items-center rounded-full backdrop-blur-xl pl-4 font-semibold bg-black/10 backdrop-opacity-100 p-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    Company Video
                    <img src={video} alt="Dummy Video" className="w-14 mx-auto" />
                  </div>
                </div>
              )}
            </div>

            {/* Brochure Section */}
            <div className="relative w-full h-60 md:h-80 lg:h-96 xl:h-[27rem] sm:w-[32%] lg:w-[25%] mx-auto bg-iconborder/25 rounded-2xl "
              onClick={console.log(participants)}
            >
              {/* <div className="w-auto h-80 bg-iconborder/25 rounded-2xl">
              <img
                src={
                  participants[0]?.company_brochure
                    ? `${process.env.REACT_APP_BASE_URI}/storage/${participants[0]?.company_brochure}`
                    : null
                }
                alt="Brochure"
                className=" rounded-2xl w-full h-full"
              />
            </div> */}
              {participants[0]?.company?.company_brochure ? (
                <a
                  href={`${process.env.REACT_APP_BASE_URI}/storage/${participants[0]?.company?.company_brochure}`}
                  download
                  target="_blank"
                  className="absolute w-[70%] h-full rounded-full backdrop-blur-xl font-semibold  p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex flex-col justify-between items-center h-full ">
                    <img src={`${process.env.REACT_APP_BASE_URI}/storage/${participants[0]?.company?.company_brochure_cover_img}`} alt="Download" className="w-auto h-[90%] " />
                    <div className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-center">
                      {"Download Company Brochure"}
                    </div>
                  </div>
                </a>
              ) : (
                <a
                  className="absolute w-[70%] xl:w-[55%] 2xl:w-[45%] flex gap-2 justify-between items-center rounded-full backdrop-blur-xl pl-4 font-semibold bg-black/10 backdrop-opacity-100 p-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  {"Company Brochure"}
                  <img src={download} alt="Download" className="scale-90 " />
                </a>
              )}
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-keygovtbg p-8 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl w-full rounded-xl flex items-center justify-between">
            <div>
              To view full profile and to request for meetings, you must be
              registered and logged in.
            </div>
            <button className="border-[1px] border-textblue bg-white rounded-full py-2 px-4 text-textblue">
              <a href="/register">Register</a>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default CompanyProfile;
