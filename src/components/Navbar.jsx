// components/Navbar.js

import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newHeader from "./../assets/NewHeader.jpeg";
import logo1 from "../assets/logoimr.png";
import logo2 from "../assets/logokpmg.png";
import miniheader from "../assets/miniheader.png";
import bigheader from "../assets/bigheader.png";
import navcart from "../assets/navcart.png";
import { CgProfile } from "react-icons/cg";
import { changePassword, fetchUserProfile } from "../apiEndpoints";
import { AuthContext } from "./../utils/AuthContext"; // Import AuthContext
import roles from "./../utils/roles";
import Swal from "sweetalert2";
import gsap from "gsap";
const Navbar = () => {
  const navigate = useNavigate();
  const profileRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { authToken, email, logout } = useContext(AuthContext); // Access context values
  const userRole = JSON.parse(localStorage.getItem("userData"))?.role;
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isSecondaryParticipant, setIsSecondaryParticipant] = useState(false);

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
        // console.error("Error fetching profile data:", error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
    console.log(profileData?.profile?.user?.first_name);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleProfile = () => {
    setIsOpen(false);

    if (userRole === roles.KEY_GOVT_OFFICER) {
      navigate("/keyGovtHome");
    } else {
      navigate("/savedProfile");
    }
  };

  const passwordChange = async () => {
    if (loading) return; // Prevent multiple clicks

    setLoading(true); // Start loading

    try {
      const response = await changePassword(email);

      // Introduce a delay to ensure proper timing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "An email has been sent with reset link to change your password. Please also check spam folder.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary", // Optionally add custom class to button
          },
          buttonsStyling: false, // Disable default SweetAlert styling for buttons
        });
      } else {
        throw new Error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: "This email id is not recognized Please enter registered email id and try again.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-danger", // Optionally add custom class to button
        },
        buttonsStyling: false, // Disable default SweetAlert styling for buttons
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleHelp = () => {
    navigate("/contactus");
  };

  const handleSignOut = () => {
    logout(); // Use context's logout function
    navigate("/");
    window.location.reload(); // Refresh the page
  };

  const ringRef = useRef(null);

  useEffect(() => {
    // GSAP Animation: Infinite Loop
    gsap.to(ringRef.current, {
      scale: 1.2, // Scale the ring slightly larger
      opacity: 0, // Fade out the ring
      repeat: -1, // Infinite looping
      duration: 1.5, // Duration of each animation cycle (1.5 seconds)
      ease: "power1.inOut", // Smooth ease in and out
      yoyo: true, // Reverses the animation for a continuous effect
    });
  }, []);
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

  return (
    <>
      <section className="nav font-poppins max-w-screen flex flex-col items-end">
        <div className="text-right flex justify-center w-full">
          <div className="container 3xl:w-[70%] md:px-4 xl:px-20">
            <ul className="flex justify-end items-center gap-2 md:gap-4 lg:gap-6 xl:gap-8 text-[0.5rem] md:text-[0.7rem] xl:text-base py-2">
              <li>
                <Link
                  // to="/register"
                  onClick={handleRequestMeetingClick}
                >Buy Participant’s Package</Link>
              </li>{" "}
              {/* <li className="relative text-textblue font-semibold">
                <Link
                  // to="https://pages.razorpay.com/pl_P5EtyAbXjUk1dK/view"
                  onClick={handleRequestMeetingClick}
                  // target="_blank"
                  className="relative z-10 rounded-full font-semibold p-2 text-textblue transition-all duration-300 fancy1"
                >
                  Free Starter Engagement Pack
                </Link> */}
              {/* Animated ring using GSAP */}
              {/* <span
                  ref={ringRef}
                  className="absolute inset-0 w-full h-full border-4 border-textblue rounded-full z-0 pointer-events-none"
                  style={{
                    transform: 'scale(1)',
                    opacity: 1,
                  }}
                ></span> */}
              {/* </li> */}
              {!authToken ? (
                <>
                  <li>
                    <Link
                      // to="/register"
                      onClick={handleRequestMeetingClick}
                    >Register</Link>
                  </li>
                  <li>
                    <Link onClick={handleRequestMeetingClick}> Sign-in</Link>
                  </li>
                  {/* <li>
                    <Link to="/login" state={{ fromNavbar: true }}>
                      Sign-in
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/faq">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/contactus">Contact us</Link>
                  </li>
                  <li>
                    {/* <Link to="/cart"> */}
                    <button onClick={handleRequestMeetingClick} className="border-[1px] border-footerblue rounded-full px-2 md:px-4 py-[2px] md:py-1 flex items-center gap-2">
                      <img src={navcart} alt="" className="w-[40%]" />
                      <div className="w-[60%] text-footerblue pr-2">cart</div>
                    </button>
                    {/* </Link> */}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/faq">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/contactus">Contact us</Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <button className="border-[1px] border-footerblue rounded-full px-2 md:px-4 py-[2px] md:py-1 flex items-center gap-2">
                        <img src={navcart} alt="" className="w-[40%]" />
                        <div className="w-[60%] text-footerblue pr-2">cart</div>
                      </button>
                    </Link>
                  </li>
                  <li className="relative">
                    <button
                      onClick={handleProfileToggle}
                      className="gap-2 flex items-center"
                    >
                      {authToken ? (
                        <>
                          <div className="text-center">
                            Welcome,{" "}
                            <span className="font-semibold">
                              {profileData?.profile?.user?.first_name}
                            </span>
                          </div>
                          <img
                            src={`${process.env.REACT_APP_BASE_URI}/storage/${profileData?.profile?.user?.profile_image ||
                              profileData?.profile?.main_business_image
                              }`}
                            alt=""
                            className="h-9 w-9 rounded-full"
                          />
                        </>
                      ) : (
                        <CgProfile className="size-6" color="#11498D" />
                      )}
                    </button>
                    {isOpen && (
                      <div
                        ref={profileRef}
                        className="absolute flex flex-col justify-center items-center gap-2 p-4 bg-white rounded-xl text-footerblue w-80 lg:w-[27rem] right-0 top-10 xl:top-12 z-30"
                      >
                        <div className="h-20 w-40 rounded-xl overflow-hidden">
                          <img
                            src={`${process.env.REACT_APP_BASE_URI}/storage/${profileData?.profile?.user?.profile_image ||
                              profileData?.profile?.main_business_image
                              }`}
                            alt=""
                            className="w-full object-cover"
                          />
                          {/* <CgProfile className="size-6" color="#11498D" /> */}
                        </div>
                        <div className="text-center">
                          Welcome,{" "}
                          <span className="font-semibold">
                            {profileData?.profile?.user?.first_name}
                          </span>
                        </div>
                        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
                          <button
                            onClick={handleProfile}
                            className="bg-footerblue text-white p-2 w-full rounded-md"
                          >
                            Dashboard
                          </button>
                          <button
                            onClick={handleHelp}
                            className="bg-footerblue text-white p-2 w-full rounded-md"
                          >
                            Help / Support
                          </button>
                          <button
                            onClick={passwordChange}
                            className={`bg-footerblue text-white p-2 w-full rounded-md ${loading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-footerblue"
                              }`}
                            disabled={loading} // Disable button when loading
                          >
                            {loading ? "Processing..." : "Change Password"}
                          </button>
                          <button
                            onClick={handleSignOut}
                            className="bg-footerblue text-white p-2 w-full rounded-md"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      <div className="hidden lg:flex flex-col justify-center items-center bg-[#154a9a]">
        <div className="nav-inner md:w-[765px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1580px]">
          <div className="relative container flex justify-end xl:px-2 w-full">
            <div className="image z-20 flex flex-col justify-end items-end py-14 2xl:py-24 ">
              <div className="text-right pb-4 lg:pb-8 pt-[3rem] lg:pt-[6rem] xl:pt-[8rem] md:pl-[17rem]">
                {/* <div className="text-5xl 2xl:text-7xl 2xl:py-2 text-white font-semibold">
                  Defence Partnership Days
                </div>
                <div className="text-xl 2xl:text-2xl py-2 2xl:py-4 px-2 italic rounded-lg inline-block font-semibold text-white">
                  Pre scheduled B2G & B2B Meetings{" "}
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-footeraddressbg w-full flex flex-col md:items-center py-2">
          <div className="text-white md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] px-4 lg:px-8">
            <div className="text-center text-xs sm:text-base 2xl:text-lg uppercase">
              {" "}
              Stay tuned for the 2025 edition{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block lg:hidden">
        <img
          src={newHeader}
          alt=""
          className="w-full lg:w-[90%] xl:w-[80%] mx-auto  h-auto"
        />
        <div className="bg-footeraddressbg py-2 px-3 lg:px-4">
          <div className="text-center text-white uppercase text-sm sm:text-base">
            {" "}
            Stay tuned for the 2025 edition{" "}
          </div>
        </div>
      </div>

      <div className="sm:hidden nav-innermini flex flex-col justify-center items-center bg-footerblue">
        <div className="relative container px-4 flex justify-center xl:px-20">
          <div className="absolute w-[50%] left-0 -top-4 flex flex-col justify-center items-start gap-2 py-12">
            <div className="image w-[30%] ml-[20%]">
              <img src={miniheader} alt="" className="size-28" />
            </div>
            <div className="image w-[70%] ml-[15%]">
              <img src={bigheader} alt="" className="size-28" />
            </div>
          </div>
          <div className="image z-20 flex flex-col justify-end items-end py-4">
            <div className="flex w-[50%] gap-4 justify-center items-center">
              <div className="logo w-[40%]">
                <img src={logo1} alt="" className="scale-90" />
              </div>
              <div className="logo pt-6">
                <img src={logo2} alt="" />
              </div>
            </div>
            <div className="text-right py-4 sm:py-8 sm:pl-[11rem]">
              <div className="text-5xl sm:text-6xl text-white font-semibold">
                Defence Partnership Days
              </div>
              <div className="text-xl sm:text-2xl py-2 pt-8 pr-2 italic rounded-lg inline-block font-semibold text-white">
                Pre scheduled B2G & B2B Meetings{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="sm:hidden nav font-poppins max-w-screen flex flex-col items-center bg-footeraddressbg">
        <div className="bg-footeraddressbg py-2 px-3 lg:px-4">
          <div className="container 3xl:w-[70%] px-4 sm:px-16 xl:px-24 text-white">
            <div className="text-center text-sm sm:text-base">
              {" "}
              Stay tuned for the 2025 edition{" "}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
