import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import string from "../constants/string";
import roles from "../utils/roles";
import Swal from "sweetalert2";
import { AuthContext } from "../utils/AuthContext";

const Stickynav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  // const authToken = localStorage.getItem("authToken");
  const { authToken, email, logout } = useContext(AuthContext); // Access context values

  const userData = authToken
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const userRole = userData ? userData.role : null;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleSubmenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    // if (activeIndex === index) {
    // If the same index is clicked again, close the submenu
    // setActiveIndex(null);
    // } else {
    // Open the clicked submenu
    // setActiveIndex(index);
    // }
  };
  const handleClose = () => {
    setActiveIndex(null);
    setIsOpen(false);
  };

  const menuref = useRef(null);
  useEffect(() => {
    const handleclickoutside = (e) => {
      if (menuref.current && !menuref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleclickoutside);
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, [menuref]);
  // Function to scroll to a specific section
  // const scrollToSection = (objective) => {
  //   const section = document.getElementById(objective);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  const handleScrollSection = (id) => {
    navigate(`/home?scrollTo=${id}`);
  };
  const handleRequestMeetingClick = () => {
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
    <div
      ref={menuref}
      className="navmenu  shadow-xl font-poppins sticky top-0 z-1 bg-lightblue flex justify-center w-full"
    >
      <div className="container 3xl:w-[70%] px-4 xl:px-20 py-4 bg-lightblue">
        <ul className="hidden font-medium uppercase sm:flex text-sm lg:text-lg justify-between">
          <div className="relative group hover ">
            <a href="/home" className="">
              About
            </a>
            <div className="absolute bottom-0 z-10  w-full h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] hidden group-hover:block "></div>
            <ul className="uppercase  absolute -left-4 top-4 lg:top-6 pt-4  bg-lightblue w-[250px] rounded-xl hidden group-hover:block  text-black shadow-lg">
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <button className="uppercase" onClick={() => handleScrollSection("message")}>
                  {string.about1}
                </button>
              </li>

              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <button className="uppercase" onClick={() => handleScrollSection("whoparticipate")}>
                  {string.about2}
                </button>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base ">
                <button className="uppercase" onClick={() => handleScrollSection("objective")}>
                  {string.about3}
                </button>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/howitwork" target="_blank">
                  {string.about4}
                </Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <button className="uppercase" to="/" onClick={() => handleScrollSection("sponsorSection")}>
                  {string.about5}
                </button>
              </li>
              {/* <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/newsletter">{string.about6}</Link>
              </li> */}
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/venue">{string.about8}</Link>
              </li>
            </ul>
          </div>
          <ul className="relative group hover ">
            <Link to="/participants">PARTICIPANT’S PROFILES</Link>
            <div className="absolute bottom-0 z-10  w-full h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] hidden group-hover:block "></div>
            <ul className="absolute -left-4 top-4 lg:top-6 pt-4 hidden group-hover:block  bg-lightblue w-[275px] rounded-xl text-black shadow-lg">
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/key-govt-officers">{string.partycipate1}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/primeparticipant">{string.partycipate4}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/manufacturerProfile">{string.partycipate5}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/startupprofile">{string.partycipate6}</Link>
              </li>
              {/* <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/investorProfile">{string.partycipate7}</Link>
              </li> */}
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/mediaPartnerProfile">{string.partycipate8}</Link>
              </li>
            </ul>
          </ul>
          <ul className="relative group hover ">
            <Link to="/schedule">SCHEDULE</Link>
            <div className="absolute bottom-0 z-10  w-full h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] hidden group-hover:block "></div>
            <ul className="absolute -left-4 top-4 lg:top-6 pt-4 hidden group-hover:block  bg-lightblue w-[275px] rounded-xl text-black shadow-lg">
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/schedule">{string.schedule1}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/central-talks">{string.schedule2}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/speakers">{string.schedule3}</Link>
              </li>
            </ul>
          </ul>
          <ul className="relative group hover ">
            <Link to="/">MEMBERS’ AREA</Link>
            <div className="absolute bottom-0 z-10  w-full h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] hidden group-hover:block "></div>
            <ul className="absolute -left-4 top-4 lg:top-6 pt-4 hidden group-hover:block  bg-lightblue w-[275px] rounded-xl text-black shadow-lg">
              <ul className="px-4 py-2 text-xs font-normal lg:text-base">
                {/* {!!authToken && userRole === roles.KEY_GOVT_OFFICER ? (
                  <li>
                    <Link to="/keyGovtHome">{string.member1}</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/savedProfile">{string.member1}</Link>
                  </li>
                )} */}
                <li>
                  <Link onClick={handleRequestMeetingClick}>{string.member1}</Link>
                </li>
              </ul>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/guideline">{string.member2}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                {!authToken ? (
                  <a onClick={handleRequestMeetingClick} className="cursor-pointer">{string.member3}</a>
                ) : (
                  <a
                    href="https://meetings.defencepartners.in/"
                    target="_blank"
                    rel="noreferrer" className="cursor-pointer"
                  >
                    {string.member3}
                  </a>
                )}
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/downloadBrochure">{string.member4}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/downloadPresentation">{string.member5}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/exhibition&meeting">{string.about7}</Link>
              </li>
            </ul>
          </ul>
          <ul className="relative group hover ">
            <Link
              // to="/pricelist"
              onClick={handleRequestMeetingClick}
            >ADD-ONS</Link>
            <div className="absolute bottom-0 z-10  w-full h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] hidden group-hover:block "></div>
            <ul className="absolute -left-4 top-4 lg:top-6 pt-4 hidden group-hover:block  bg-lightblue w-[250px] rounded-xl text-black shadow-lg">
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/whysponsors">{string.pricing3}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/exhibitionOptions">{string.pricing4}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/branding">{string.pricing5}</Link>
              </li>
              <li className="px-4 py-2 text-xs font-normal lg:text-base">
                <Link to="/communication">{string.pricing6}</Link>
              </li>
            </ul>
          </ul>
          <li className="relative group hover ">
            <Link
              // to="/pricelist"
              onClick={handleRequestMeetingClick}
            >Pricing</Link>
            <div className="absolute bottom-0 z-10  w-full h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] hidden group-hover:block "></div>
          </li>
        </ul>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            Menu
          </button>
          {isOpen && (
            <div className="sm:hidden">
              <button
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => toggleSubmenu(0)}
              >
                <Link to="/home">
                  ABOUT
                </Link>
              </button>
              {activeIndex === 0 && (
                <>
                  <ul className="list-none pl-4">
                    <li className="px-4 py-2 text-xs font-normal lg:text-base">
                      <button
                        onClick={() => {
                          handleScrollSection("message");
                          handleClose();
                        }}
                      >
                        {string.about1}
                      </button>
                    </li>
                    <li className="px-4 py-2 text-xs font-normal lg:text-base">
                      <button
                        className="uppercase"
                        onClick={() => {
                          handleScrollSection("whoparticipate");
                          handleClose();
                        }}
                      >
                        {string.about2}
                      </button>
                    </li>
                    <li className="px-4 py-2 text-xs font-normal lg:text-base">
                      <button
                        onClick={() => {
                          handleScrollSection("objective");
                          handleClose();
                        }}
                      >
                        {string.about3}
                      </button>
                    </li>
                    <li className="px-4 py-2 text-xs font-normal lg:text-base">
                      <Link to="/howitwork" target="_blank" onClick={handleClose}>
                        {string.about4}
                      </Link>
                    </li>

                    <li className="px-4 py-2 text-xs font-normal lg:text-base">
                      <button
                        onClick={() => {
                          handleScrollSection("sponsorSection");
                          handleClose();
                        }}
                      >
                        {string.about5}
                      </button>
                    </li>
                    {/* <li
                      className="px-4 py-2 text-xs font-normal lg:text-base"
                      onClick={handleClose}
                    >
                      <Link to="/newsletter">{string.about6}</Link>
                    </li> */}
                    <li className="px-4 py-2 text-xs font-normal lg:text-base"
                      onClick={handleClose}
                    >
                      <Link to="/venue">{string.about8}</Link>
                    </li>
                  </ul>
                </>
              )}
              <button
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => toggleSubmenu(1)}
              >
                <Link to="/register">PARTICIPANT’S PROFILES</Link>
              </button>
              {activeIndex === 1 && (
                <ul className="list-none pl-4">
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/key-govt-officers" onClick={handleClose}>
                      {string.partycipate1}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/sponsorProfile" onClick={handleClose}>
                      {string.partycipate3}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/primeparticipant" onClick={handleClose}>
                      {string.partycipate4}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/manufacturerProfile" onClick={handleClose}>
                      {string.partycipate5}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/startupprofile" onClick={handleClose}>
                      {string.partycipate6}
                    </Link>
                  </li>
                  {/* <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/investorProfile" onClick={handleClose}>
                      {string.partycipate7}
                    </Link>
                  </li> */}
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/mediaPartnerProfile" onClick={handleClose}>
                      {string.partycipate8}
                    </Link>
                  </li>
                </ul>
              )}
              <button
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => toggleSubmenu(2)}
              >
                <Link to="">SCHEDULE</Link>
              </button>
              {activeIndex === 2 && (
                <ul className="list-none pl-4">
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/schedule" onClick={handleClose}>
                      {string.schedule1}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <button onClick={handleClose}>{string.schedule2}</button>
                  </li>
                </ul>
              )}
              <button
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => toggleSubmenu(3)}
              >
                MEMBERS’ AREA
              </button>
              {activeIndex === 3 && (
                <ul className="list-none pl-4">
                  <ul className="px-4 py-2 text-xs font-normal lg:text-base">
                    {!!authToken && userRole === roles.KEY_GOVT_OFFICER ? (
                      <li>
                        <Link to="/keyGovtHome" onClick={handleClose}>
                          {string.member1}
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link to="/savedProfile" onClick={handleClose}>
                          {string.member1}
                        </Link>
                      </li>
                    )}
                  </ul>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/guideline" onClick={handleClose}>{string.member2}</Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    {!authToken ? (
                      <a onClick={handleRequestMeetingClick} className="cursor-pointer">{string.member3}</a>
                    ) : (
                      <a
                        href="https://meetings.defencepartners.in/"
                        target="_blank"
                        rel="noreferrer" className="cursor-pointer"
                      >
                        {string.member3}
                      </a>
                    )}
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/downloadBrochure" onClick={handleClose}>{string.member4}</Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/downloadPresentation" onClick={handleClose}>{string.member5}</Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base"
                    onClick={handleClose}
                  >
                    <Link to="/exhibition&meeting">{string.about7}</Link>
                  </li>
                </ul>
              )}
              <button
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => toggleSubmenu(4)}
              >
                ADD-ONS
              </button>
              {activeIndex === 4 && (
                <ul className="list-none pl-4">
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/whysponsors" onClick={handleClose}>
                      {string.pricing3}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/exhibitionOptions" onClick={handleClose}>
                      {string.pricing4}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/branding" onClick={handleClose}>
                      {string.pricing5}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-xs font-normal lg:text-base">
                    <Link to="/communication" onClick={handleClose}>
                      {string.pricing6}
                    </Link>
                  </li>
                </ul>
              )}
              <a
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                // href="/pricelist"
                onClick={handleRequestMeetingClick}
              >
                PRICING
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stickynav;
