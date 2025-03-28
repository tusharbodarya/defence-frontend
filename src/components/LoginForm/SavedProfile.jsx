import React, { useContext, useEffect, useState } from "react";
import companyprofile from "../../assets/blankprofile.png";
import bluecheck from "../../assets/bluecheck.png";
import AboutCompany from "./AboutCompany";
import MBParticipant from "./MBParticipant";
import BuildFullProfile from "./BuildFullProfile";
import { fetchUserProfile, getBusinessActivity } from "../../apiEndpoints";
import { Link, useNavigate } from "react-router-dom";
import pricelist from "../../constants/pricelist";
import Swal from "sweetalert2";
import { AuthContext } from "../../utils/AuthContext";

const SavedProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetchUserProfile();
        // console.log("Fetched Profile Data:", response.data);
        if (response && response.data) {
          setProfileData(response.data);
          // console.log(response.data);
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

    getUserProfile();
  }, []);



  const getPackageDescription = (packageId) => {
    const packageInfo = pricelist.basicMeetingsPackage.packages.find(
      (pkg) => pkg.id === packageId
    );
    return packageInfo ? packageInfo.title : "Package Title Placeholder";
  };

  const getPlanDescription = (category, subcategory) => {
    const categoryMapping = {
      A: "basicMeetingsPackage",
      B: "sponsorship",
      C: "exhibitingOptions",
      D: "brandingOptions",
      E: "communicationOptions",
      F: "extraItems",
    };

    const actualCategory = categoryMapping[category];
    const categoryData = pricelist[actualCategory];

    if (categoryData && categoryData.options) {
      const subcategoryDetails = categoryData.options[category][subcategory];
      if (subcategoryDetails) {
        return subcategoryDetails.title;
      }
    }

    return "Plan Description Placeholder";
  };

  const dummyProfileData = {
    profile: {
      user: {
        first_name: "First",
        last_name: "name",
        profile_image: null,
      },
      company: {
        company_logo: null,
        company_video: "https://www.youtube.com/",
        main_business_designation: "CEO",
        company_description: "A leading software development company",
        main_business_name: "ABC Corp",
        main_business_activities: ["Software Development", "Consulting"],
        main_business_products: ["Web Apps", "Mobile Apps"],
        main_business_image: null,
      },
      main_profile: null,
      other_profile: [],
    },
    main_profile_plan: {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
    },
    other_profile_plan: {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
    },
  };

  const dataToUse = loading || !profileData ? dummyProfileData : profileData;

  const {
    profile: {
      user = {},
      main_profile = {},
      other_profile = [],
      company = {},
    } = {},
    main_profile_plan = {},
    other_profile_plan = {},
  } = dataToUse || {};

  const isMainParticipantLoggedIn =
    main_profile && user;

  const allAddOns = [
    ...(main_profile_plan.B || []),
    ...(main_profile_plan.C || []),
    ...(main_profile_plan.D || []),
    ...(main_profile_plan.E || []),
    ...(other_profile_plan.B || []),
    ...(other_profile_plan.C || []),
    ...(other_profile_plan.D || []),
    ...(other_profile_plan.E || []),
  ];

  const fPlans = [
    ...(main_profile_plan.F || []),
    ...(other_profile_plan.F || []),
  ];

  const columns = 2;
  const itemsPerColumn = Math.ceil(allAddOns.length / columns);
  const addOnColumns = Array.from({ length: columns }, (_, i) =>
    allAddOns.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
  );

  const { authToken, email, logout } = useContext(AuthContext); // Access context values

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
  const handleEditProfile = () => {
    navigate("/updateProfile");
  };

  return (
    <div className="flex justify-center font-poppins">
      <div className="container px-4 xl:px-20 pb-40 pt-10">
        <BuildFullProfile />
        <div className="py-12">
          <div className="relative font-EBGaramond text-center ">
            <h2 className="text-base lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal py-2 uppercase">
              {profileData?.profile?.role} DASHBOARD
            </h2>
            <p className="text-textblue font-poppins text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl pb-2">
              {profileData?.profile?.user?.company || "Company Name"}
            </p>
            <div className="absolute bottom-0 left-[47%] w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]" />
          </div>
        </div>
        <div className="text-right pb-4">
          <button
            className=" bg-white border-[1px] border-textblue text-textblue rounded-3xl text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-2 lg:px-3"
            onClick={handleEditProfile}
          >
            {/* <img src={editProfileSmall} alt="" className="w-5" /> */}
            Edit Profile
          </button>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="w-full md:w-[25%] flex flex-col justify-between gap-4">
            <div className="w-full h-auto border-[1px] border-iconborder/25 rounded-2xl p-2 flex py-10 flex-col items-center">
              <div className="relative flex justify-center w-[90%] py-4">
                <img
                  src={
                    main_profile?.profile_image
                      ? `${process.env.REACT_APP_BASE_URI}/storage/${main_profile.profile_image}`
                      : companyprofile
                  }
                  alt="Company Profile"
                  className="w-auto sm:w-60 h-80 sm:h-60 rounded-xl"
                />
              </div>
              <div>
                <div className="text-lg lg:text-xl 2xl:text-2xl font-semibold ">
                  {main_profile?.main_business_name || "First Name"}{" "}
                  {/* {user.last_name || "Last Name"} */}
                </div>
                <div className="text-center text-sm lg:text-base 2xl:text-lg text-black/50">
                  {main_profile?.main_business_designation || "Designation"}
                  {/* {isMainParticipantLoggedIn
                    ? main_profile?.main_business_designation || "Designation"
                    : (other_profile.length &&
                      other_profile.find((p) => p.user_id === user.id)
                        ?.main_business_designation) ||
                    "Designation"} */}
                </div>
              </div>
              <div className="flex flex-col gap-4 my-2">
                <button
                  onClick={handleProfileClick}
                  className="rounded-full text-textblue ring-2 ring-textblue text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl py-1 2xl:py-2 px-2 lg:px-3"
                >
                  View Full Profile
                </button>
                <button
                  onClick={handleProfileClick}
                  className="bg-textblue rounded-full ring-2 ring-textblue text-white text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl py-1 2xl:py-2 px-2 lg:px-3"
                >
                  Request Meeting
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[75%] flex flex-col justify-between gap-4">
            <div className="rounded-2xl h-[50%] border-[1px] border-iconborder/25  p-4 pb-8">
              <div className="relative font-EBGaramond mb-2">
                <h2 className="uppercase text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal py-1 md:py-2">
                  My Package
                </h2>
                <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <div className="w-full flex flex-col gap-2">
                {main_profile_plan.A?.map((subscription) => (
                  <div
                    className="flex gap-2 items-center"
                    key={subscription.id}
                  >
                    <img src={bluecheck} alt="Check" />
                    <div>
                      {getPackageDescription(subscription.subscription_name)}
                    </div>
                  </div>
                ))}
                {other_profile_plan.A?.map((subscription) => (
                  <div
                    className="flex gap-2 items-center"
                    key={subscription.id}
                  >
                    <img src={bluecheck} alt="Check" />
                    <div>
                      {getPackageDescription(subscription.subscription_name)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* {other_profile_plan.B && other_profile_plan.C && other_profile_plan.D && other_profile_plan.E && ( */}
            <div className="bg-white border-[1px] border-iconborder/25 p-4 h-full rounded-2xl">
              <div className="flex justify-between">
                <div className="relative font-EBGaramond text-center mb-8">
                  <h2 className="text-left text-base lg:text-xl 2xl:text-2xl uppercase py-1">
                    My add-ons
                  </h2>
                  <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
                </div>
                <div>
                  <button className="rounded-full px-4 py-2 text-white bg-textblue">
                    <Link to="/pricelist"> Buy add-ons</Link>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {addOnColumns.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-4">
                    {column.map((subscription) => (
                      <div
                        className="flex items-start gap-2"
                        key={subscription.id}
                      >
                        <div>
                          <img
                            src={bluecheck}
                            alt="Check"
                            onClick={() =>
                              console.log(subscription.subscription_name)
                            }
                          />
                        </div>
                        <div>
                          <div>
                            {subscription.subscription_name}.{" "}
                            {getPlanDescription(
                              subscription.subscription_category,
                              subscription.subscription_name
                            )}
                          </div>
                          <div>
                            Complete the requirements to fulfill your order.{" "}
                            {subscription.subscription_name && (
                              <span
                                className="text-blue-500 cursor-pointer"
                                onClick={() => {
                                  let path = "";

                                  if (
                                    subscription.subscription_name[0] === "B"
                                  ) {
                                    if (
                                      (subscription.subscription_name === "B1",
                                        "B2",
                                        "B3")
                                    ) {
                                      path =
                                        "whysponsors/Corporate Sponsorship";
                                    }
                                  } else if (
                                    subscription.subscription_name[0] === "B"
                                  ) {
                                    if (
                                      (subscription.subscription_name === "B4",
                                        "B5",
                                        "B6")
                                    ) {
                                      path =
                                        "whysponsors/Associate Sponsorship";
                                    }
                                  } else if (
                                    subscription.subscription_name[0] === "C"
                                  ) {
                                    path = "exhibitionOptions";
                                  } else if (
                                    subscription.subscription_name[0] === "D"
                                  ) {
                                    path = "branding";
                                  } else {
                                    path = "communication";
                                  }

                                  navigate(
                                    `/${path}/${subscription.subscription_name}`
                                  );
                                }}
                              >
                                Click here
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* )} */}
          </div>
        </div>

        {fPlans.length > 0 && (
          <div className="bg-white p-8 mt-4 rounded-3xl border-[1px] border-iconborder/25">
            <div className="relative font-EBGaramond text-center mb-8">
              <h2 className="text-left text-base lg:text-xl 2xl:text-2xl uppercase py-1">
                My Extra Items
              </h2>
              <div className="absolute bottom-0 w-8 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {fPlans.map((subscription) => (
                <div className="flex items-start gap-2" key={subscription.id}>
                  <div>
                    <img src={bluecheck} alt="Check" />
                  </div>
                  <div>
                    <div>
                      {subscription.subscription_name}.{" "}
                      {getPlanDescription(
                        subscription.subscription_category,
                        subscription.subscription_name
                      )}
                    </div>
                    {/* <div>
                      Complete the requirements to fulfill your order.{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() =>
                          navigate(`/fulfill-order/${subscription.id}`)
                        }
                      >
                        Click Here
                      </span>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-8 my-5">
          <AboutCompany profileData={profileData || {}} />
          <div className="p-3 text-sm md:text-base lg:text-md xl:text-lg 2xl:text-xl border-[1px] border-iconborder/25 rounded-xl">
            <span className="">Company Brochure Title:</span>{" " + company?.company_brochure_name || ""}
          </div>
          <div className="p-3 text-sm md:text-base lg:text-md xl:text-lg 2xl:text-xl border-[1px] border-iconborder/25 rounded-xl">
            Company Video Youtube link:
            <a
              href={company?.company_video || ""}
              target="_blank"
              className="ml-5 text-black/70"
            >
              {company?.company_video || ""}
            </a>
          </div>
          {/* Main Participant Profile */}
          <MBParticipant
            profileData={main_profile || {}}
            title="Main Business Participant"
          />
          {/* Secondary Participant Profile */}
          {other_profile.map((participant, index) => (
            <MBParticipant
              key={index}
              profileData={participant}
              title={`Second Business Participant ${index + 1}`}
            />
          ))}
        </div>
        <div className="mt-20">
          <BuildFullProfile />
        </div>
      </div>
    </div >
  );
};

export default SavedProfile;
