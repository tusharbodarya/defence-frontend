import React, { useEffect, useRef, useState } from "react";
import { getSponsors } from "./../apiEndpoints";
import SponsorImage from "./SponsorImage";
import string from "../constants/string";
import banner from "../assets/banner.png";
import quote from "../assets/quote.png";
import party from "../assets/party.png";
import partyB from "../assets/partyB.png";
import partyC from './../assets/GiridharAramane.jpg'
import marshal from './../assets/marshal.jpeg'
import party1 from "../assets/party1.png";
import party2 from "../assets/party2.png";
import party3 from "../assets/party3.png";
import party4 from "../assets/party4.png";
import party5 from "../assets/party5.png";
import party6 from "../assets/party6.png";
import profit1 from "../assets/profit1.png";
import profit2 from "../assets/profit2.png";
import profit3 from "../assets/profit3.png";
import profit4 from "../assets/profit4.png";
import profitmain from "../assets/profitmain.png";
import minute1 from "../assets/minute1.png";
import minute2 from "../assets/minute2.png";
import minute3 from "../assets/minute3.png";
import minute4 from "../assets/minute4.png";
import CommonHome from "./CommonHome";
import common1 from "../assets/common1.png";
import common2 from "../assets/common2.png";
import common3 from "../assets/common3.png";
import obj from "../assets/objmain.png";
import Slider from "react-slick";
import scroll from "../assets/scrolltop.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  // Sponsore Section - Start
  const [sponsors, setSponsors] = useState({});
  const messageRef = useRef();
  const whoParticipateRef = useRef();
  const objectiveRef = useRef();
  const sponsorRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await getSponsors();
        if (response.success) {
          setSponsors(response.data);
        }
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };

    fetchSponsors();
  }, []);

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   const scrollTo = query.get("scrollTo");

  //   if (scrollTo === "message") {
  //     setTimeout(() => {
  //       if (messageRef.current) {
  //         messageRef.current.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }, 100);
  //   }
  //   if (scrollTo === "whoparticipate") {
  //     setTimeout(() => {
  //       if (whoParticipateRef.current) {
  //         whoParticipateRef.current.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }, 100);
  //   }
  //   if (scrollTo === "objective") {
  //     setTimeout(() => {
  //       if (objectiveRef.current) {
  //         objectiveRef.current.scrollIntoView({ behavior: "smooth" })
  //       }
  //     }, 100);
  //   }
  //   if (scrollTo === "sponsor") {
  //     setTimeout(() => {
  //       if (sponsorRef.current) {
  //         sponsorRef.current.scrollIntoView({ behavior: "smooth" })
  //       }
  //     }, 100);
  //   }
  // })
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const scrollTo = query.get("scrollTo");

    const scrollToSection = (ref) => {
      setTimeout(() => {
        if (ref.current) {
          console.log("Scrolling to:", ref.current); // Debugging line
          ref.current.scrollIntoView({ behavior: "smooth" });

          // Remove scrollTo parameter from the URL after scrolling
          query.delete("scrollTo");
          navigate({ search: query.toString() }, { replace: true });
        } else {
          console.log("Ref not found:", ref); // Debugging line
        }
      }, 100);
    };

    if (scrollTo === "message") {
      scrollToSection(messageRef);
    } else if (scrollTo === "whoparticipate") {
      console.log("clicled ");
      scrollToSection(whoParticipateRef);
    } else if (scrollTo === "objective") {
      scrollToSection(objectiveRef);
    } else if (scrollTo === "sponsor") {
      console.log("clicled sposerSection");
      scrollToSection(sponsorRef);
    }
  }, [location.search, navigate]);

  const handlePriceList = () => {
    // navigate('/pricelist?scrollTo=sponsor')
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
  }

  const renderSponsorSection = (category, subcategories) => {
    // Check if the subcategories have any content
    const hasSubcategoriesContent = subcategories.some(
      (subcategory) =>
        sponsors[category] &&
        sponsors[category][subcategory] &&
        sponsors[category][subcategory].length > 0
    );

    // Check if there's content for categories without subcategories
    const hasCategoryContent =
      sponsors[category] &&
      sponsors[category][""] &&
      sponsors[category][""].length > 0;

    // If there's no content in both subcategories and the category itself, skip rendering
    if (!hasSubcategoriesContent && !hasCategoryContent) {
      return null;
    }

    return (
      <div
        className="px-8 py-10 rounded-[50px] border-[1px] border-iconborder/30 my-20"
        key={category}
      >
        <div className="relative font-EBGaramond flex justify-center my-8">
          <h2 className="uppercase text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold pb-[0.35rem] ">
            {category}
          </h2>
          <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
        </div>
        <div className="flex flex-col gap-12 justify-center px-4 lg:px-16">
          {subcategories.length > 0
            ? subcategories.map(
              (subcategory) =>
                sponsors[category] &&
                sponsors[category][subcategory] &&
                sponsors[category][subcategory].length > 0 && (
                  <div
                    key={subcategory}
                    className="flex flex-col justify-center"
                  >
                    <div className="text-center text-textblue text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl py-4">
                      {subcategory}
                    </div>
                    <SponsorImage
                      sponsors={sponsors[category][subcategory]}
                    />
                  </div>
                )
            )
            : sponsors[category] &&
            sponsors[category][""] &&
            sponsors[category][""].length > 0 && (
              <SponsorImage sponsors={sponsors[category][""]} />
            )}
        </div>
      </div>
    );
  };


  // Sponsore Section - End

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <FaArrowRight className="text-white text-3xl" />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <FaArrowLeft className="text-white text-3xl text-center" />
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
               in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <section className="font-poppins flex flex-col items-center justify-center overflow-x-hidden">
      <div className="container 3xl:w-[70%] px-4 lg:px-0 xl:px-20 py-12">
        {/* <div className="three flex justify-between sm:gap-4 py-8 sm:px-8 lg:px-20 "> */}
        {/* <div className="w-[33%]  flex flex-col text-center">
            <div>
              <img src={nine} alt="" className=" w-[80%] mx-auto" />
            </div>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl sm:px-6 lg:px-12">
              {string.partytitle1}
            </p>
          </div> */}
        {/* <div className="relative  flex flex-col text-center">
            <div>
              <img src={three} alt="" className=" w-[80%] mx-auto" />
            </div>
            <p className="absolute -bottom-4 sm:bottom-0 lg:bottom-0 2xl:bottom-4 right-4 sm:right-0 lg:right-3 2xl:right-10 w-[80%] sm:w-[80%] 2xl:w-[70%] text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl sm:px-6 lg:px-12">
              {string.partytitle2}
            </p>
          </div>
          <div className="relative  flex flex-col text-center">
            <div>
              <img src={nineK} alt="" className=" w-[80%] mx-auto" />
            </div>
            <p className="absolute -bottom-4 sm:bottom-0 lg:bottom-0 2xl:bottom-4 right-4 sm:right-0 lg:right-3 2xl:right-10 w-[80%] sm:w-[80%] 2xl:w-[70%] text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl sm:px-6 lg:px-12">
              {string.partytitle3}
            </p>
          </div> */}
        {/* </div> */}
      </div>
      <div className="text-center w-full bg-numbercolorhome ">
        <p className="text-white py-8 text-lg md:text-xl lg:text-2xl xl:text-3xl">
          {string.partyheadline}
        </p>
      </div>
      <div className="container 3xl:w-[70%] px-4 lg:px-8 xl:px-12 2xl:px-20 py-12 ">
        <div className="justify-between gap-4 flex md:flex-row flex-col lg:px-12 px-2 mb-10">
          <div className="image md:w-[36%] w-full px-4 md:px-0">
            <img src={banner} alt="" className="w-full" />
          </div>
          <div className="para md:w-[64%]  w-full">
            <p className="text-[0.875rem] leading-4 lg:text-[1rem] lg:leading-5 xl:text-[1.25rem] xl:leading-6 text-justify px-0 2xl:px-10 ">
              {string.partyparamain}
            </p>
          </div>
        </div>
        {/* message  */}
        <div
          id="message"
          ref={messageRef}
          className=" flex flex-col justify-center overflow-hidden py-10 relative"
        >
          <Slider {...settings} className="">
            <div className="px-4 lg:px-8">
              <div className="headfing flex flex-col justify-center ">
                <div className="text-center text-textblue font-poppins text-base md:text-lg lg:text-2xl xl:text-4xl">
                  {string.partyquotemessage}{" "}
                  <span className="font-Bonheur-Royale">
                    {string.partyquotespan}
                  </span>
                </div>
                <div className="text-center font-EBGaramond uppercase text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  {string.partydesignation1}
                </div>
              </div>
              <div className="font-poppins flex justify-between gap-4 md:gap-8 flex-col-reverse py-2 mg:py-0 md:flex-row">
                <div className="w-full md:w-[65%]">
                  <img src={quote} alt="" className=" md:scale-75" />
                  <div className="flex flex-col justify-between">
                    <div className="text-sm md:text-[1rem] lg:text-base xl:text-xl text-justify py-2 xl:py-4">
                      {string.partyquoteA1}
                    </div>
                    <div className="text-sm md:text-[1rem] lg:text-base xl:text-xl text-justify mb-4 xl:mb-8">
                      {string.partyquoteA2}
                    </div>
                    <div className="text-sm md:text-[1rem] lg:text-base xl:text-xl text-justify mb-4 xl:mb-8">
                      {string.partyquoteA3}
                    </div>
                    <div className="text-sm md:text-[1rem] lg:text-base xl:text-xl text-justify mb-4 xl:mb-8">
                      {string.partyquoteA4}
                    </div>
                    <div className="text-right">
                      <div className="text-footerblue font-semibold text-sm md:text-base lg:text-lg xl:text-xl ">
                        {string.partyname1}
                      </div>
                      <div className="text-footerblue text-sm pl-4 md:text-[0.875rem] lg:text-lg xl:text-xl ">
                        {string.partyroles1}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[35%] flex justify-center items-center">
                  <img
                    src={party}
                    alt=""
                    className="w-full h-fit scale-75 lg:scale-100"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 ">
              <div className="headfing flex flex-col justify-center ">
                <div className="text-center text-textblue text-base md:text-lg lg:text-2xl xl:text-4xl">
                  {string.partyquotemessage}{" "}
                  <span className="font-Bonheur-Royale">
                    {string.partyquotespan}
                  </span>
                </div>
                <div className="text-center font-EBGaramond uppercase text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  {string.partyAirStaff}
                </div>
              </div>
              <div className=" flex justify-between gap-4 md:gap-8 flex-col-reverse py-2 mg:py-0 md:flex-row">
                <div className="w-full md:w-[70%] lg:w-[65%]">
                  <img src={quote} alt="" className=" md:scale-75 " />
                  <div className="flex flex-col justify-between h-full ">
                    <div className="text-sm  lg:text-lg xl:text-xl text-justify">
                      {string.partyAirStaffQuoteD1}
                    </div>
                    <div className="text-sm  lg:text-lg xl:text-xl text-justify">
                      {string.partyAirStaffQuoteD2}
                    </div>
                    <div className="text-sm  lg:text-lg xl:text-xl text-justify">
                      {string.partyAirStaffQuoteD3}
                    </div>
                    <div className="text-right">
                      <div className="text-footerblue font-semibold text-sm md:text-base lg:text-lg xl:text-xl ">
                        - Air Chief Marshal AP Singh, PVSM, AVSM
                      </div>
                      <div className="text-footerblue text-sm pl-4 md:text-[0.875rem] lg:text-lg xl:text-xl ">
                        Chief of the Air Staff
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[30%] lg:w-[35%] flex justify-center items-center ">
                  <img
                    src={marshal}
                    alt=""
                    className="w-full h-auto scale-75 lg:scale-100 rounded-full overflow-hidden object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 ">
              <div className="headfing flex flex-col justify-center ">
                <div className="text-center text-textblue text-base md:text-lg lg:text-2xl xl:text-4xl">
                  {string.partyquotemessage}{" "}
                  <span className="font-Bonheur-Royale">
                    {string.partyquotespan}
                  </span>
                </div>
                <div className="text-center font-EBGaramond uppercase text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  {string.partydesignation3}
                </div>
              </div>
              <div className=" flex justify-between gap-4 md:gap-8 flex-col-reverse py-2 mg:py-0 md:flex-row">
                <div className="w-full md:w-[70%] lg:w-[65%]">
                  <img src={quote} alt="" className=" md:scale-75 " />
                  <div className="flex flex-col justify-between h-full ">
                    <div className="text-sm  lg:text-lg xl:text-xl text-justify">
                      {string.partyquoteC1}
                    </div>
                    <div className="text-sm  lg:text-lg xl:text-xl text-justify">
                      {string.partyquoteC2}
                    </div>
                    <div className="text-sm  lg:text-lg xl:text-xl text-justify">
                      {string.partyquoteC3}
                    </div>
                    <div className="text-sm  lg:text-lg xl:text-xl text-justify">
                      {string.partyquoteC4}
                    </div>
                    <div className="text-right">
                      <div className="text-footerblue font-semibold text-sm md:text-base lg:text-lg xl:text-xl ">
                        - Girdhar Aramane
                      </div>
                      <div className="text-footerblue text-sm pl-4 md:text-[0.875rem] lg:text-lg xl:text-xl ">
                        Defence Secretary
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[30%] lg:w-[35%] flex justify-center items-center ">
                  <img
                    src={partyC}
                    alt=""
                    className="w-full h-fit scale-75 lg:scale-100 rounded-full overflow-hidden "
                  />
                </div>
              </div>
            </div>
            <div className="px-4 lg:px-8">
              <div className="headfing flex flex-col justify-center ">
                <div className="text-center text-textblue text-base md:text-lg lg:text-2xl xl:text-4xl">
                  {string.partyquotemessage}{" "}
                  <span className="font-Bonheur-Royale">
                    {string.partyquotespan}
                  </span>
                </div>
                <div className="text-center font-EBGaramond uppercase text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  {string.partydesignation2}
                </div>
              </div>
              <div className=" flex justify-between gap-4 md:gap-8 flex-col-reverse py-2 mg:py-0 md:flex-row">
                <div className="w-full md:w-[65%]">
                  <img src={quote} alt="" className=" md:scale-75" />
                  <div className="flex flex-col justify-between h-full">
                    <div className="text-sm md:text-[1rem] lg:text-lg xl:text-xl text-justify py-2 lg:py-4">
                      {string.partyquoteB1}
                    </div>
                    <div className="text-sm md:text-[1rem] lg:text-lg xl:text-xl text-justify mb-4 lg:mb-8">
                      {string.partyquoteB2}
                    </div>
                    <div className="text-right">
                      <div className="text-footerblue font-semibold text-sm md:text-base lg:text-lg xl:text-xl ">
                        {string.partyname2}
                      </div>
                      <div className="text-footerblue text-sm pl-4 md:text-[0.875rem] lg:text-lg xl:text-xl ">
                        {string.partyroles2}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[35%] flex justify-center items-center">
                  <img
                    src={partyB}
                    alt=""
                    className="w-full h-fit scale-75 lg:scale-100"
                  />
                </div>
              </div>
            </div>
          </Slider>
        </div>
        {/* major participate  */}
        <div className="px-4 py-10 overflow-hidden">
          <div className="relative font-EBGaramond flex justify-center my-8">
            <h2 className="uppercase text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold pb-[0.35rem]">
              {string.majorparty}
            </h2>
            <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
          <div className="flex flex-col gap-12 overflow-x-hidden ">
            <div className="hidden sm:grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 justify-between overflow-x-hidden ">
              <div className="flex justify-center">
                <img src={party1} alt="" />
              </div>
              <div className="flex justify-center">
                <img src={party2} alt="" />
              </div>
              <div className="flex justify-center">
                <img src={party3} alt="" />
              </div>
              <div className="flex justify-center">
                <img src={party4} alt="" />
              </div>
              <div className="flex justify-center">
                <img src={party5} alt="" />
              </div>
              <div className="flex justify-center">
                <img src={party6} alt="" />
              </div>
            </div>
            <div className="relative major w-full block sm:hidden overflow-hidden">
              <Slider {...settings}>
                <div className=" overflow-hidden">
                  <img src={party1} alt="" className="mx-auto" />
                </div>
                <div>
                  <img src={party2} alt="" className="mx-auto" />
                </div>
                <div>
                  <img src={party3} alt="" className="mx-auto" />
                </div>
                <div>
                  <img src={party4} alt="" className="mx-auto" />
                </div>
                <div>
                  <img src={party5} alt="" className="mx-auto" />
                </div>
                <div>
                  <img src={party6} alt="" className="mx-auto" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
        {/* unique effective profitable  */}
        <div className="px-4 py-10">
          <div className="relative font-EBGaramond flex justify-center my-8">
            <h2 className="uppercase font-EBGaramond text-center text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold pb-[0.35rem]">
              {string.partyheading1}
            </h2>
            <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
          <div className="flex flex-col gap-8 justify-between h-full">
            <div className="text w-full  grid sm:grid-cols-2 justify-between md:px-28 gap-4 2xl:gap-8">
              <div className="flex gap-8 justify-center items-center">
                <div className="w-[15%] ">
                  <img src={profit1} alt="" />
                </div>
                <p className="w-[80%] text-sm md:text-base lg:text-lg xl:text-xl">
                  {string.partyprofit1}
                </p>
              </div>
              <div className="flex gap-8 justify-center items-center">
                <div className="w-[15%] ">
                  <img src={profit3} alt="" />
                </div>
                <p className="w-[80%] text-sm md:text-base lg:text-lg xl:text-xl">
                  {string.partyprofit3}
                </p>
              </div>
              <div className="flex gap-8 justify-center items-center">
                <div className="w-[15%] ">
                  <img src={profit2} alt="" />
                </div>
                <p className="w-[80%] text-sm md:text-base lg:text-lg xl:text-xl">
                  {string.partyprofit2}
                </p>
              </div>
              <div className="flex gap-8 justify-center items-center">
                <div className=" w-[15%] ">
                  <img src={profit4} alt="" />
                </div>
                <p className="w-[80%] text-sm md:text-base lg:text-lg xl:text-xl">
                  {string.partyprofit4}
                </p>
              </div>
            </div>
            <div className="image w-full ">
              <img src={profitmain} alt="" className="w-full" />
            </div>
          </div>
        </div>
        {/* minutes  */}
        <div className="px-4 py-10">
          <div className="relative font-EBGaramond flex justify-center my-8">
            <h2 className="uppercase text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold pb-[0.35rem]">
              {string.partyheading2}
            </h2>
            <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-12 justify-between">
            <div className="flex flex-col gap-2">
              <div className="date bg-textblue py-4 text-white text-center text-sm md:text-base lg:text-lg xl:text-xl rounded-lg">
                {string.partyminutedate1}
              </div>
              <div className="w-full">
                <img src={minute1} alt="" className="w-full" />
              </div>
              <ul className="list-disc pl-4 sm:pl-5 lg:pl-4 px-8 text-xs md:text-sm lg:text-base 2xl:text-lg">
                <li>{string.partyminute1a}</li>
                <li>{string.partyminute1b}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <div className="date bg-textblue py-4 text-white text-center text-sm md:text-base lg:text-lg xl:text-xl rounded-lg">
                {string.partyminutedate2}
              </div>
              <div className="w-full">
                <img src={minute2} alt="" className="w-full" />
              </div>
              <ul className="list-disc pl-5 lg:pl-4 px-8 text-xs md:text-sm lg:text-base 2xl:text-lg">
                <li>{string.partyminute2}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <div className="date bg-textblue py-4 text-white text-center text-sm md:text-base lg:text-lg xl:text-xl rounded-lg">
                {string.partyminutedate3}
              </div>
              <div className="w-full">
                <img src={minute3} alt="" className="w-full" />
              </div>
              <ul className="list-disc pl-5 lg:pl-4 px-8 text-xs md:text-sm lg:text-base 2xl:text-lg">
                <li>{string.partyminute3}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <div className="date bg-textblue py-4 text-white text-center text-sm md:text-base lg:text-lg xl:text-xl rounded-lg">
                {string.partyminutedate4}
              </div>
              <div className="w-full">
                <img src={minute4} alt="" className="w-full" />
              </div>
              <ul className="list-disc pl-5 lg:pl-4 px-8 text-xs md:text-sm lg:text-base 2xl:text-lg">
                <li>{string.partyminute4}</li>
              </ul>
            </div>
          </div>
        </div>
        {/* who participate  */}
        <div ref={whoParticipateRef} id="whoparticipates" className="px-4 py-10">
          <div className="relative font-EBGaramond flex justify-start my-8">
            <h2 className="uppercase text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold pb-[0.35rem]">
              {string.who}
            </h2>
            <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
          <div>
            <p className="font-light text-justify text-sm md:text-base lg:text-lg xl:text-xl">
              {string.whopara}
            </p>
          </div>
        </div>
        {/* why participate  */}
        <div className="px-4 py-10">
          <CommonHome
            title={string.why}
            img={common1}
            blue={string.whytitle}
            text={string.whypara}
            btn={string.whybtn}
          />
          <div className="flex py-10 pt-20 gap-4 lg:gap-8 xl:gap-12">
            <div className=" w-full md:w-[55%] lg:w-[50%] h-full">
              <div className="relative font-EBGaramond flex justify-start mb-2 xl:mb-8">
                <h2 className="uppercase text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold pb-[0.35rem]">
                  {string.whopart}
                </h2>
                <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
              <div className=" pb-2 md:hidden image w-full md:w-[50%] h-full">
                <img src={common2} alt="" className="w-full" />
              </div>
              <div className=" flex flex-col justify-between gap-4 xl:gap-8 items-start">
                <div className="text-sm md:text-[0.9rem] md:leading-4 lg:text-lg xl:text-[1.20rem] xl:leading-6 2xl:text-[1.25rem] 2xl:leading-8 text-justify font-light">
                  {string.whoparapart}
                </div>
                <div>
                  <button className="bg-gradient-to-r from-textblue to-footerblue p-1 px-2 xl:py-3 xl:px-5 rounded-full text-white text-sm md:text-base lg:text-lg xl:text-xl ">
                    <Link onClick={handlePriceList}>{string.whybtn}</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block image w-[45%] lg:w-[50%] h-full">
              <img src={common2} alt="" className="w-full" />
            </div>
          </div>
          <CommonHome
            title={string.official}
            img={common3}
            blue={string.officialtitle}
            text={string.officialpara}
            btn={string.whybtn}
          />
        </div>
        {/* objective  */}
        <div id="objective" ref={objectiveRef} className="px-4 sm:px-8 py-10">
          <div className="relative font-EBGaramond flex justify-center my-8">
            <h2 className="uppercase text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold pb-[0.35rem]">
              {string.objkeyhead}
            </h2>
            <div className="absolute bottom-0 w-8 md:w-10 lg:w-12 xl:w-16 h-[0.17rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
          <div className="text-justify">
            <ul className="">
              <div className="lg:pl-8 float-right pb-2">
                <img src={obj} alt="" className="object-cover " />
              </div>
              {string.objkeyarray.map((index) => (
                <li
                  key={index}
                  className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl"
                >
                  {index}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* SPONSPORS SECTION */}
        <div id="sponsor" ref={sponsorRef}>
          {Object.keys(string.categories).map((category) =>
            renderSponsorSection(category, string.categories[category])
          )}
        </div>
      </div>
      <div className="container 3xl:w-[70%] px-4 lg:px-8 xl:px-12 2xl:px-20 py-8 text-right ">
        <button>
          <img
            src={scroll}
            alt=""
            className="w-full"
            onClick={scrollToTop}
            style={{ display: visible ? "inline" : "none" }}
          />
        </button>
      </div>
    </section>
  );
};

export default Home;
