import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import string from "../../constants/string";
import creditcard from "../../assets/creditcard.png";
import upi from "../../assets/UPI.png";
import phonepay from "../../assets/phonepay.png";
import { storePaymentDetails } from "../../apiEndpoints";
import success from "../../assets/success.png";
import emoji from "../../assets/emoji.png";
import { useLocation, useNavigate } from "react-router-dom";

const ExPayment = ({ }) => {
  const payRef = useRef(null);
  const topRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { booth, price, category } = location.state;

  // Calculate GST
  const gstRate = 0.18; // 18% GST
  const gstAmount = price * gstRate;
  const totalAmount = price + gstAmount;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const generateOrderId = () => {
    return `order_${Math.random().toString(36).substr(2, 9)}`;
  };

  const [visible, setVisible] = useState(true);
  const handleToggle = () => {
    setVisible(false);
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      console.error("Razorpay key is not defined");
      return;
    }

    const orderId = generateOrderId();

    const options = {
      key: razorpayKey,
      amount: price, // Amount in currency subunits. 4000000 refers to 40000.00 INR
      currency: "INR",
      name: "IMR Media Pvt Ltd",
      description: "Basic Plan Purchase",

      handler: async function (response) {
        console.log(response);

        // Store the payment details
        const paymentData = {
          user_id: localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData")).id
            : null,
          subscription_category: category,
          subscription_name: booth,
          amount: price,
          razorpay_order_id: orderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: "null",
          status: "success",
        };

        try {
          await storePaymentDetails(paymentData);
        } catch (error) {
          console.error("Error storing payment details:", error);
        }

        // Proceed to next step
        handleToggle();
      },
      prefill: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        contact: localStorage.getItem("mobile_number"),
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleClickOutside = (e) => {
    if (payRef.current && !payRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    if (topRef.current) {
      topRef.current.focus();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unlock scroll
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {visible ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
          <div ref={topRef} className="container 3xl:w-[70%] w-[80%] md:w-1/2">
            <div
              ref={payRef}
              className="bg-white p-16 xl:p-24 rounded-3xl flex flex-col gap-16"
            >
              <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)}>
                  <FaArrowLeft />
                </button>
                <div className="text-base lg:text-xl xl:text-2xl">
                  {string.paymenttitle}
                </div>
              </div>
              <div className="flex justify-center gap-8 flex-col px-4">
                <div className="flex gap-4">
                  <img src={creditcard} alt="Credit Card" />
                  <p>{string.payment1}</p>
                </div>
                <div className="flex gap-4">
                  <img
                    className="bg-textblue rounded-md p-1"
                    src={upi}
                    alt="UPI"
                  />
                  <p>{string.payment2}</p>
                </div>
                <div className="flex gap-4">
                  <img src={phonepay} alt="Phone Pay" />
                  <p>{string.payment3}</p>
                </div>
                {/* <div className="flex flex-col gap-2">
                  <div>Base Amount: ₹{price.toFixed(2)}</div>
                  <div>GST (18%): ₹{gstAmount.toFixed(2)}</div>
                  <div>Total Amount: ₹{totalAmount.toFixed(2)}</div>
                </div> */}
              </div>
              <div className="text-right flex justify-end">
                <button
                  onClick={handlePayment}
                  className="text-sm md:text-base lg:text-lg xl:text-xl rounded-lg font-normal my-4 py-2 xl:py-4 px-4 text-white bg-textblue w-full"
                  type="button"
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
          <div ref={topRef} className="container 3xl:w-[70%] w-[80%] md:w-1/2 ">
            <div ref={payRef} className="bg-white rounded-3xl flex">
              <div className=" flex flex-col p-8 sm:p-12 ">
                <div className="w-full sm:w-2/3 mx-auto mb-8">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div>
                      <img src={success} alt="" />
                    </div>
                    <div className="font-semibold flex items-center justify-center gap-2 text-xl lg:text-2xl xl:text-3xl">
                      {string.successtitle} <img src={emoji} alt="" />
                    </div>
                    <div className="text-base lg:text-lg text-wrap text-center">
                      {string.successdisc}
                    </div>
                  </div>
                </div>

                <div className="text-right flex justify-end">
                  <button
                    onClick={() => navigate(`/exhibitionOptions/${booth}`)}
                    className=" text-sm md:text-base lg:text-lg xl:text-xl rounded-lg  font-normal py-3 px-4 text-white bg-textblue w-full"
                    type="submit"
                  >
                    {string.successbtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExPayment;
