import React, { useState, useEffect } from "react";
import companyprofile from "../../assets/blankprofile.png";
import ProgressBar from "@ramonak/react-progress-bar";
import KGDCommon from "./KGDCommon";
import BuildFullProfile from "./BuildFullProfile";
import { fetchUserProfile, deleteProfile } from "../../apiEndpoints";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const KeyGovtHome = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchUserProfile();
        if (response && response.data) {
          setProfileData(response.data.profile);
        } else {
          setProfileData(null);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const dummyProfileData = {
    user: {
      first_name: "Officer's",
      last_name: "Name",
      profile_image: null,
    },
    main_participant_name: "Main Participant Name",
    main_participant_designation: "Designation",
    main_participant_org: "Organization Name",
    main_participant_service: "Services",
    substitute_participant_name: "Substitute Participant Name",
    substitute_participant_designation: "Substitute Participant Designation",
    substitute_participant_org: "Organization Name",
    substitute_participant_service: "Services",
    branch_name: "Branch Name",
    branch_service: "Branch Services",
    main_subjects: JSON.stringify(["Main Subjects"]),
    products_services: JSON.stringify(["Products / Services"]),
  };

  const dataToUse = loading || !profileData ? dummyProfileData : profileData;

  const {
    user = {},
    main_participant_name,
    main_participant_designation,
    main_participant_org,
    main_participant_service,
    substitute_participant_name,
    substitute_participant_designation,
    substitute_participant_org,
    substitute_participant_service,
    branch_name,
    branch_service,
    main_subjects,
    products_services,
  } = dataToUse;

  const calculateCompletion = () => {
    const fields = [
      "main_participant_name",
      "main_participant_designation",
      "main_participant_org",
      "main_participant_service",
      "substitute_participant_name",
      "substitute_participant_designation",
      "substitute_participant_org",
      "substitute_participant_service",
      "branch_name",
      "branch_service",
      "main_subjects",
      "products_services",
    ];

    const filledFields = fields.filter(
      (field) => dataToUse[field] && dataToUse[field] !== ""
    );

    return Math.floor((filledFields.length / fields.length) * 100);
  };

  // const handleDeleteProfilePhoto = async () => {
  //   try {
  //     await deleteProfile();
  //     Swal.fire({
  //       icon: "success",
  //       title: "Profile Image Deleted",
  //       text: "Your profile image has been deleted successfully.",
  //     });
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed to Delete Profile Image",
  //       text: "Failed to delete profile image. Please try again.",
  //     });
  //     console.error("Failed to delete profile photo", error);
  //   }
  // };

  return (
    <div className="flex justify-center font-poppins">
      <div className="container 3xl:w-[70%] px-4 xl:px-20 pb-40 pt-10">
        <div>
          <BuildFullProfile />
        </div>
        <div className="py-12">
          <div className="relative px-[2rem] xl:px-[22rem] font-EBGaramond text-center">
            <h2 className="text-base lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold py-2">
              KEY GOVT & SERVICES OFFICERS DASHBOARD
            </h2>
            <p className="text-textblue font-poppins text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl pb-2">
              {user?.first_name + " " + user?.last_name || "Officer’s Name"}
            </p>
            <div className="absolute bottom-0 left-[47%] w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl border-[1px] border-iconborder/50">
            <div className="relative flex flex-col gap-2 justify-center items-center w-52 xl:w-64 h-60 xl:h-72 rounded-xl overflow-hidden mx-4">
              <img
                src={
                  user.profile_image
                    ? `${process.env.REACT_APP_BASE_URI}/storage/${user?.profile_image}`
                    : companyprofile
                }
                alt="Company Profile"
                className="w-full h-full"
              />
            </div>
            <div className="w-full md:pl-6 xl:pl-4">
              <div className="text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-4xl py-2 font-semibold">
                {user?.first_name + " " + user?.last_name || "Participant Name"}
              </div>
              <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl pb-1">
                {main_participant_designation || "Participant Designation"}
              </div>
              <div className="text-xs md:text-sm lg:text-base xl:text-base 2xl:text-lg text-black/50">
                {user.company || "Participant Organization"}
              </div>
              <div className="w-full md:w-[25%] mt-2">
                <ProgressBar
                  completed={calculateCompletion()}
                  bgColor="#1A74E2"
                  height="100%"
                  labelAlignment="center"
                />
              </div>
              {/* <div className="text-right pt-4"> */}
              <button
                className="border-[1px] border-footerblue mt-3 p-2 lg:p-2 text-footerblue rounded-full w-52"
                onClick={() => navigate("/updateKeyGovtProfile")}
              >
                Complete Your Profile
              </button>
              {/* </div> */}
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-between items-center w-full bg-white rounded-3xl">
            <KGDCommon
              title="Main Participant Details"
              btn={1}
              imageSrc={
                user.profile_image
                  ? `${process.env.REACT_APP_BASE_URI}/storage/${user?.profile_image}`
                  : null
              }
              array={[
                {
                  name: "Name",
                  disc: main_participant_name || "Not Available",
                },
                {
                  name: "Designation",
                  disc: main_participant_designation || "Not Available",
                },
                {
                  name: "Org/ Dep/ Dte/ Branch",
                  disc: main_participant_org || "Not Available",
                },
                {
                  name: "Service",
                  disc: main_participant_service || "Not Available",
                },
              ]}
            />
            <KGDCommon
              title="Substitute Participant Details"
              imageSrc={
                dataToUse.substitute_participant_image
                  ? `${process.env.REACT_APP_BASE_URI}/storage/${dataToUse.substitute_participant_image}`
                  : null
              }
              array={[
                {
                  name: "Name",
                  disc: substitute_participant_name || "Not Available",
                },
                {
                  name: "Designation",
                  disc: substitute_participant_designation || "Not Available",
                },
                {
                  name: "Org/ Dep/ Dte/ Branch",
                  disc: substitute_participant_org || "Not Available",
                },
                {
                  name: "Service",
                  disc: substitute_participant_service || "Not Available",
                },
              ]}
            />
          </div>
          <div className="border-[1px] border-iconborder/25 rounded-xl p-4">
            <div className="relative font-EBGaramond text-center mb-8">
              <h2 className="text-left text-base lg:text-lg xl:text-2xl 2xl:text-2xl uppercase py-1">
                About Your Branch / Department
              </h2>
              <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
            </div>
            <div className="flex">
              <div className="w-[50%]">
                <div className="text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  Branch / Department Name
                </div>
                <div className="uppercase text-black/50 text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  {branch_name || "Not Available"}
                </div>
              </div>
              <div className="w-[50%]">
                <div className="text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  Service / Department
                </div>
                <div className="uppercase text-black/50 text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  {branch_service || "Not Available"}
                </div>
              </div>
            </div>
          </div>
          <div className="border-[1px] border-iconborder/25 rounded-xl p-4">
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  Main Subjects of Responsibility
                </div>
                <div className="text-black/50 text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  {main_subjects
                    ? JSON.parse(main_subjects).join(", ")
                    : "Not Available"}
                </div>
              </div>
              <div className="w-full">
                <div className="text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  List of Products/Services you are looking for
                </div>
                <div className="text-black/50 text-sm lg:text-base xl:text-lg 2xl:text-xl">
                  {products_services
                    ? JSON.parse(products_services).join(", ")
                    : "Not Available"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <BuildFullProfile />
        </div>
      </div>
    </div>
  );
};

export default KeyGovtHome;
