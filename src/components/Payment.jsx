import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import string from "../constants/string";
import creditcard from "../assets/creditcard.png";
import upi from "../assets/UPI.png";
import phonepay from "../assets/phonepay.png";
import { storePaymentDetails } from "./../apiEndpoints";

const Payment = ({
  onClose,
  onClick,
  amount,
  subscription_category,
  subscription_name,
  _user_id,
}) => {
  const payRef = useRef(null);
  const topRef = useRef(null);

  // State to manage payment processing and success status
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  // Calculate GST
  const gstRate = 0.18; // 18% GST
  const gstAmount = amount * gstRate;
  const totalAmount = amount + gstAmount;

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

  const handlePayment = async () => {
    setIsPaymentProcessing(true); // Disable button

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsPaymentProcessing(false); // Re-enable button
      return;
    }

    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
    console.log(razorpayKey);

    if (!razorpayKey) {
      console.error("Razorpay key is not defined");
      setIsPaymentProcessing(false); // Re-enable button
      return;
    }

    const orderId = generateOrderId();

    const options = {
      key: razorpayKey,
      amount: (totalAmount * 100).toString(), // Total amount including GST
      currency: "INR",
      name: "IMR Media Pvt Ltd",
      description: `${subscription_name} Purchase`,
      handler: async function (response) {
        console.log(response);

        // Store the payment details
        const paymentData = {
          user_id: _user_id
            ? _user_id
            : localStorage.getItem("userData")
              ? JSON.parse(localStorage.getItem("userData")).id
              : null,
          subscription_category,
          subscription_name,
          amount: totalAmount,
          razorpay_order_id: orderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: "null",
          status: "success",
        };

        try {
          await storePaymentDetails(paymentData);
          setIsPaymentSuccessful(true); // Set payment success
        } catch (error) {
          console.error("Error storing payment details:", error);
        }

        // Proceed to next step
        onClick();
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

  const handleClickOutside = (e) => {
    if (payRef.current && !payRef.current.contains(e.target)) {
      onClose();
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
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
      {isPaymentSuccessful ? (
        <div className="bg-white p-5 rounded-lg text-center">
          Payment Successful! Redirecting...
        </div>
      ) : (
        <div ref={topRef} className="container 3xl:w-[70%] w-[80%] md:w-1/2">
          <div
            ref={payRef}
            className="bg-white p-5 md:p-16 xl:p-24 rounded-3xl flex flex-col gap-16"
          >
            <div className="flex items-center gap-4">
              <div>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3"
                >
                  <FaArrowLeft /> Back
                </button>
              </div>
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
              <div className="flex flex-col gap-2">
                <div>Base Amount: ₹{amount.toFixed(2)}</div>
                <div>GST (18%): ₹{gstAmount.toFixed(2)}</div>
                <div>Total Amount: ₹{totalAmount.toFixed(2)}</div>
              </div>
            </div>
            <div className="text-right flex justify-end">
              <button
                onClick={handlePayment}
                className={`text-sm md:text-base lg:text-lg xl:text-xl rounded-lg font-normal my-4 py-2 xl:py-4 px-4  w-full ${isPaymentProcessing
                  ? "bg-gray-300 cursor-not-allowed text-black"
                  : "bg-textblue text-white"
                  }`}
                type="button"
                disabled={isPaymentProcessing} // Disable button when processing
              >
                {isPaymentProcessing ? "Processing..." : "Make Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
