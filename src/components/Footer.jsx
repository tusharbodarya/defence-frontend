import React, { useContext, useState } from "react";
import string from "../constants/string";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import roles from "../utils/roles";
import { AuthContext } from "../utils/AuthContext";
import Swal from "sweetalert2";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  // const authToken = localStorage.getItem("authToken");
  const { authToken, email, logout } = useContext(AuthContext); // Access context values
  const userData = authToken
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const userRole = userData?.role ?? null;

  const toggleSubmenu = (index) => {
    if (activeIndex === index) {
      // If the same index is clicked again, close the submenu
      setActiveIndex(null);
    } else {
      // Open the clicked submenu
      setActiveIndex(index);
    }
  };

  const handleClose = () => {
    setActiveIndex(null);
    setIsOpen(false);
  };
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
    <section className="footer flex flex-col items-center justify-center bg-footerblue ">
      <div className="container 3xl:w-[70%] px-8  py-10  xl:px-12">
        <ul className="hidden lg:flex justify-between items-start gap-2 text-white">
          <li className="text-lg font-semibold w-[1/6]">
            <Link to="/">{string.footer1title}</Link>
            <ul className="text-base font-normal py-4">
              <li>
                <button onClick={() => handleScrollSection("message")}>
                  {string.footer1point1}
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollSection("whoparticipate")}>
                  {string.about2}
                </button>
              </li>
              <li>
                <button
                  className="text-left"
                  onClick={() => handleScrollSection("objective")}
                >
                  {string.about3}
                </button>
              </li>
              {/* <li>{string.footer1point4}</li> */}
              <li>
                <Link to="/howitwork" target="_blank">
                  {string.footer1point5}
                </Link>
              </li>
              <li>
                <button className="text-left" onClick={() => handleScrollSection("sponsor")}>
                  {string.footer1point6}
                </button>
              </li>
              {/* <li>
                <Link to="/newsletter"> {string.footer1point7}</Link>
              </li> */}
              <li>
                <Link to="/venue">{string.footer1point11}</Link>
              </li>
              {/* <li><Link to="/terms">{string.footer1point9}</Link></li>
                            <li>{string.footer1point10}</li> */}
            </ul>
          </li>
          <li className="text-lg font-semibold w-[1/6]">
            {string.footer2title}
            <ul className="text-base font-normal py-4">
              <li className="">
                <Link to="/key-govt-officers">{string.partycipate1}</Link>
              </li>
              {/* <li className="">
                <Link to="/sponsorProfile">{string.partycipate3}</Link>
              </li> */}
              <li className="">
                <Link to="/primeparticipant">{string.partycipate4}</Link>
              </li>
              <li className="">
                <Link to="/manufacturerProfile">{string.partycipate5}</Link>
              </li>
              <li className="">
                <Link to="/startupprofile">{string.partycipate6}</Link>
              </li>
              {/* <li className="">
                <Link to="/investorProfile">{string.partycipate7}</Link>
              </li> */}
              <li className="">
                <Link to="/mediaPartnerProfile">{string.footer2point7}</Link>
              </li>
            </ul>
          </li>
          <li className="text-lg font-semibold w-[1/6]">
            {string.footer3title}
            <ul className="text-base font-normal py-4">
              <li>
                <Link to="/schedule">{string.footer3point1}</Link>
              </li>
              <li>
                <Link to="/central-talks">{string.footer3point2}</Link>
              </li>
              {/* <li><Link to="/whysponsors">{string.footer3point3}</Link></li>
                            <li>{string.footer3point4}</li>
                            <li>{string.footer3point5}</li>
                            <li>{string.footer3point6}</li> */}
            </ul>
          </li>

          <li className="text-lg font-semibold w-[1/6]">
            ADD-ONS
            <ul className="text-base font-normal py-4">
              <li>
                <Link to="/whysponsors">{string.footer5point3}</Link>
              </li>
              <li>
                <Link to="/exhibitionOptions">{string.footer5point4}</Link>
              </li>
              <li>
                <Link to="/branding">{string.footer5point5}</Link>
              </li>
              <li>
                <Link to="/communication">{string.footer5point6}</Link>
              </li>
            </ul>
          </li>
          <li className="text-lg font-semibold w-[1/6]">
            {string.footer6title}
            <ul className="text-base font-normal py-4">
              {!!authToken && userRole === roles.KEY_GOVT_OFFICER ? (
                <li>
                  <Link
                    // to="/keyGovtHome"
                    onClick={handleRequestMeetingClick}
                  >{string.member1}</Link>
                </li>
              ) : (
                <li>
                  <Link
                    // to="/savedProfile"
                    onClick={handleRequestMeetingClick}
                  >{string.member1}</Link>
                </li>
              )}
              <li>
                <Link to="/guideline">{string.footer6point2}</Link>
              </li>
              <li >
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
              <li>
                <Link to="/downloadBrochure">{string.footer6point4}</Link>
              </li>
              <li>
                <Link to="/downloadPresentation">{string.footer6point5}</Link>
              </li>
              <li>
                <Link to="/exhibition&meeting">{string.footer1point8}</Link>
              </li>
            </ul>
          </li>
          <li className="text-lg font-semibold w-[1/6]">
            {string.footer5title}
            <ul className="text-base font-normal py-4">
              <li>
                <Link
                  // to="/pricelist"
                  onClick={handleRequestMeetingClick}
                >Price List</Link>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="lg:hidden flex flex-col gap-2 sm:gap-0 lg:flex-row justify-between text-white">
          <button onClick={() => toggleSubmenu(5)}>
            <li className="text-lg flex justify-between font-semibold">
              {string.footer1title}
              {activeIndex === 5 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </li>
          </button>
          {activeIndex === 5 && (
            <ul className="text-base font-normal py-4">
              <li onClick={() => {
                handleClose();
                handleScrollSection("message");
              }}>
                <button>
                  {string.footer1point1}
                </button>
              </li>
              <li onClick={() => {
                handleClose();
                handleScrollSection("whoparticipate")
              }}>
                <button>{string.footer1point2}</button>
              </li>
              <li onClick={() => {
                handleClose();
                handleScrollSection("objective");
              }}>
                <button>{string.footer1point3}</button>
              </li>
              {/* <li>{string.footer1point4}</li> */}
              <li onClick={handleClose}>
                <Link to="/howitwork" target="_blank">{string.footer1point5}</Link>
              </li>
              <li onClick={() => {
                handleClose();
                handleScrollSection("sponsor");
              }}>
                <button>{string.footer1point6}</button>
              </li>
              {/* <li onClick={handleClose}>
                <Link to="/newsletter"> {string.footer1point7}</Link>
              </li> */}
              <li onClick={handleClose}>
                <Link to="/venue">{string.footer1point11}</Link>
              </li>
            </ul>
          )}
          <button onClick={() => toggleSubmenu(0)}>
            <li className="text-lg flex justify-between font-semibold  text-[1rem] sm:text-[1rem] md:text-[1.2rem] ">
              {string.footer2title}
              {activeIndex === 0 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </li>
          </button>
          {activeIndex === 0 && (
            <ul className="text-base font-normal py-4">
              <li onClick={handleClose}>
                <Link to="/key-govt-officers">{string.footer2point1}</Link>
              </li>
              {/* <li onClick={handleClose}>
                <Link to="/sponsorProfile">{string.footer2point2}</Link>
              </li> */}
              <li onClick={handleClose}>
                <Link to="/primeparticipant">{string.footer2point3}</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/manufacturerProfile">{string.footer2point4}</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/startupprofile">{string.footer2point5}</Link>
              </li>
              {/* <li onClick={handleClose}>
                <Link to="/investorProfile">{string.footer2point6}</Link>
              </li> */}
              <li onClick={handleClose}>
                <Link to="/mediaPartnerProfile">{string.footer2point7}</Link>
              </li>
            </ul>
          )}

          <button onClick={() => toggleSubmenu(1)}>
            <li className="text-lg flex justify-between font-semibold">
              {string.footer3title}
              {activeIndex === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </li>
          </button>
          {activeIndex === 1 && (
            <ul className="text-base font-normal py-4">
              <li onClick={handleClose}>
                <Link to="/schedule">{string.footer3point1}</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/central-talks">{string.footer3point2}</Link>
              </li>
            </ul>
          )}

          {/* <button onClick={() => toggleSubmenu(2)}>
            <li className="text-lg flex justify-between font-semibold">
              {string.footer4title}
              {activeIndex === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </li>
          </button>
          {activeIndex === 2 && (
            <ul className="text-base font-normal py-4">
              <li onClick={handleClose}>{string.footer4point1}</li>
              <li onClick={handleClose}>
                <Link to="/central-talks">{string.footer4point2}</Link>
              </li>
              <li onClick={handleClose}>{string.footer4point3}</li>
              <li onClick={handleClose}>{string.footer4point4}</li>
            </ul>
          )} */}

          <button onClick={() => toggleSubmenu(3)}>
            <li className="text-lg flex justify-between font-semibold">
              {string.footer5title}
              {activeIndex === 3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </li>
          </button>
          {activeIndex === 3 && (
            <ul className="text-base font-normal py-4">
              <li onClick={handleRequestMeetingClick}>
                <Link
                // to="/pricelist"
                >Price List</Link>
              </li>
            </ul>
          )}

          <button onClick={() => toggleSubmenu(6)}>
            <li className="text-lg flex justify-between font-semibold">
              ADD-ONS
              {activeIndex === 6 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </li>
          </button>
          {activeIndex === 6 && (
            <ul className="text-base font-normal py-4">
              <li onClick={handleClose}>
                <Link to="/whysponsors">{string.footer5point3}</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/exhibitionOptions">{string.footer5point4}</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/branding">{string.footer5point5}</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/communication">{string.footer5point6}</Link>
              </li>
            </ul>
          )}

          <button onClick={() => toggleSubmenu(4)}>
            <li className="text-lg flex justify-between uppercase font-semibold">
              {string.footer6title}
              {activeIndex === 4 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </li>
          </button>
          {activeIndex === 4 && (
            <ul className="text-base font-normal py-4">
              {!!authToken && userRole === roles.KEY_GOVT_OFFICER ? (
                <li>
                  <Link
                    // to="/keyGovtHome"
                    onClick={handleRequestMeetingClick}
                  >{string.member1}</Link>
                </li>
              ) : (
                <li>
                  <Link
                    // to="/savedProfile"
                    onClick={handleRequestMeetingClick}
                  >{string.member1}</Link>
                </li>
              )}
              <li onClick={handleClose}>
                <Link to="/guideline">{string.footer6point2}</Link>
              </li>
              <li onClick={handleClose}>
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
              <li onClick={handleClose}>
                <Link to="/downloadBrochure">{string.footer5point7}</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/downloadPresentation">{string.footer5point8}</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/exhibition&meeting">{string.footer1point11}</Link>
              </li>
            </ul>
          )}
        </ul>
      </div >
      <div className="text-white text-center space-x-2 pb-4">
        <Link className="pr-2" to="/terms">
          Terms & Conditions
        </Link>
        |
        <Link className="pr-2" to="/terms">
          Terms of Use
        </Link>
        |
        <Link className="pr-2" to="/privacypolicy">
          Privacy Policy
        </Link>
        |
        <Link className="pr-2" to="/refundpolicy">
          Refund Policy
        </Link>
        |
        <Link className="pr-2" to="/contactus">
          Contact Us{" "}
        </Link>
        |
        <Link className="pr-2" to="/copyright">
          Copyright{" "}
        </Link>
      </div>
    </section >
  );
};

export default Footer;
