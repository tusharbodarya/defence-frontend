import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import string from "../constants/string";
import activateside from "../assets/activateside.png";
import { verifyOtp } from "../apiEndpoints";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { storePaymentDetails } from "./../apiEndpoints";
import roles from "../utils/roles";

const Activate = ({
  onClose,
  onActivate,
  formData,
  setApiStatus,
  setLoading,
}) => {
  const actRef = useRef(null);
  const topRef = useRef(null);

  const [otp, setOtp] = useState({ email_otp: "", mobile_otp: "" });
  const [loading, setLocalLoading] = useState(false); // Local loading state
  const [attemptsLeft, setAttemptsLeft] = useState(3); // State to track OTP attempts

  const handleClickOutside = (e) => {
    if (actRef.current && !actRef.current.contains(e.target)) {
      // onClose();
    }
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtp((prevOtp) => ({
      ...prevOtp,
      [name]: value,
    }));
  };

  const handleActivate = async () => {
    if (attemptsLeft > 0) {
      setLoading(true);
      setLocalLoading(true);
      try {
        await verifyOtp(
          formData.email,
          otp.email_otp,
          formData.mobile_number,
          otp.mobile_otp
        );
        setApiStatus({ success: true, message: "OTP verified successfully!" });
        onActivate(); // Proceed to the next step

        if (formData.roles === roles.KEY_GOVT_OFFICER) {
          const paymentData = {
            user_id: localStorage.getItem("userData")
              ? JSON.parse(localStorage.getItem("userData")).id
              : null,
            subscription_category: "K",
            subscription_name: "KG",
            amount: 0,
            razorpay_order_id: "Key Govt/ Services Officer",
            razorpay_payment_id: "Key Govt/ Services Officer",
            razorpay_signature: "null",
            status: "success",
          };

          try {
            await storePaymentDetails(paymentData);
          } catch (error) {
            console.error("Error storing payment details:", error);
          }
        }
      } catch (error) {
        const newAttemptsLeft = attemptsLeft - 1;
        setAttemptsLeft(newAttemptsLeft);
        setApiStatus({
          success: false,
          message:
            error.response?.data?.message ||
            "OTP verification failed. Please try again.",
        });

        if (newAttemptsLeft > 0) {
          // Keep the component open for next trial
          await Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: `The OTP you entered is incorrect. You have ${newAttemptsLeft} ${newAttemptsLeft === 1 ? "try" : "tries"
              } left.`,
            confirmButtonText: "OK",
          });
        } else {
          // Close the component after exhausting all attempts
          await Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: "You have exhausted all your attempts. Please contact Admin at 9582649663 or 8826670075 by SMS or WhatsApp for assistance.",
            confirmButtonText: "OK",
          });
          onClose(); // Close the modal after exhausting all attempts
        }
      } finally {
        setLoading(false);
        setLocalLoading(false);
      }
    }
  };

  const [isMediumOrLarger, setIsMediumOrLarger] = useState(
    window.innerWidth >= 650
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrLarger(window.innerWidth >= 650);
    };
    // Lock scroll
    document.body.style.overflow = "hidden";
    if (topRef.current) {
      topRef.current.focus();
    }
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Unlock scroll
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
      <div ref={topRef} className="container 3xl:w-[70%]  w-[80%] md:w-2/3 2xl:max-w-full">
        {isMediumOrLarger ? (
          <div className="bg-white rounded-3xl 2xl:rounded-[3rem] flex">
            <div
              ref={actRef}
              className="w-[60%] lg:w-[70%] flex flex-col p-5 lg:p-8 2xl:p-12 justify-between"
            >
              <div>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3"
                >
                  <FaArrowLeft /> Back
                </button>
              </div>
              <div className="flex flex-col justify-start items-start lg:gap-4 mb-2 sm:mb-0">
                <div className="font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl">
                  {string.activatetitle}
                </div>
                <div className="text-xs md:text-base lg:text-lg text-justify">
                  {string.activatedisc}
                </div>
              </div>
              <div className="flex justify-center gap-2 md:gap-8 flex-col overflow-auto">
                <div>
                  <p className="font-medium">{string.activatemail}</p>
                  <input
                    type="text"
                    name="email_otp"
                    value={otp.email_otp}
                    onChange={handleOtpChange}
                    className="w-full border-[1px] px-2 py-1 border-black/10 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <p className="font-medium">{string.activatemo}</p>
                  <input
                    type="text"
                    name="mobile_otp"
                    value={otp.mobile_otp}
                    onChange={handleOtpChange}
                    className="w-full border-[1px] px-2 py-1 border-black/10 rounded-lg outline-none"
                  />
                </div>
                <p className="font-medium text-gray-900 text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem]">
                  If you have not received the Activation Code, please check the
                  email id and/or mobile number you have entered and register
                  again. <br /> In case you still do not receive either the
                  email or mobile number activation code, please contact Admin
                  at 9582649663 or 8826670075 by SMS or WhatsApp for assistance.
                </p>
              </div>
              <div className="text-right flex justify-end">
                <button
                  className="text-sm md:text-base lg:text-lg xl:text-xl rounded-lg font-normal py-1 sm:py-3 px-4 text-white bg-textblue w-full"
                  type="button"
                  onClick={handleActivate}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <ClipLoader size={20} color={"#fff"} />
                  ) : (
                    "Activate"
                  )}
                </button>
              </div>
            </div>
            <div className="w-[40%] lg:w-[30%]">
              <img src={activateside} alt="Activate Side" className="w-full" />
            </div>
          </div>
        ) : (
          <div ref={actRef} className="bg-white rounded-3xl">
            <div className="w-full flex flex-col justify-between">
              <div className="flex">
                <div className="w-[60%] p-5  justify-between flex flex-col">
                  <div>
                    <button
                      onClick={onClose}
                      className="flex items-center gap-2 font-semibold text-sm rounded-full bg-footerblue text-white p-1 px-2 pr-3"
                    >
                      <FaArrowLeft /> Back
                    </button>
                  </div>
                  <div className="flex flex-col justify-start items-start lg:gap-4 mb-2 sm:mb-0">
                    <div className="font-semibold text-[0.8rem] md:text-xl lg:text-2xl xl:text-3xl ">
                      {string.activatetitle}
                    </div>
                    <div className=" md:text-base lg:text-lg text-justify  text-[0.7rem] ">
                      {string.activatedisc}
                    </div>
                  </div>
                </div>
                <div className="w-[40%] pb-2 ">
                  <img src={activateside} alt="Activate Side" />
                </div>
              </div>
              <div className="flex justify-center gap-1 md:gap-5 flex-col overflow-auto px-5">
                <div>
                  <p className="text-[0.8rem] font-medium ">
                    {string.activatemail}
                  </p>
                  <input
                    type="text"
                    name="email_otp"
                    value={otp.email_otp}
                    onChange={handleOtpChange}
                    className="w-full border-[1px] border-inputcolor rounded-lg outline-none"
                  />
                </div>
                <div>
                  <p className="text-[0.8rem] font-medium ">
                    {string.activatemo}
                  </p>
                  <input
                    type="text"
                    name="mobile_otp"
                    value={otp.mobile_otp}
                    onChange={handleOtpChange}
                    className="w-full border-[1px] border-inputcolor rounded-lg outline-none"
                  />
                </div>
                <p className="font-medium text-gray-900 text-[0.7rem] md:text-[0.9rem] lg:text-[1rem]">
                  If you have not received the Activation Code, please check the
                  email id and/or mobile number you have entered and register
                  again. <br /> In case you still do not receive either the
                  email or mobile number activation code, please contact Admin
                  at 9582649663 or 8826670075 by SMS or WhatsApp for assistance.
                </p>
              </div>
              <div className="text-right flex justify-end p-5">
                <button
                  className="text-sm md:text-base lg:text-lg xl:text-xl rounded-lg font-normal py-2 sm:py-3 px-4 text-white bg-textblue w-full"
                  type="button"
                  onClick={handleActivate}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <ClipLoader size={20} color={"#fff"} />
                  ) : (
                    "Activate"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activate;
