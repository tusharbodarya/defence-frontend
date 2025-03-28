import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import string from "../constants/string";
import contact from "../assets/contact.png";
import contact1 from "../assets/contact1.png";
import contact2 from "../assets/contact2.png";
import contact3 from "../assets/contact3.png";
import contact4 from "../assets/contact4.png";
import contact5 from "../assets/contact5.png";
import CIN from "../assets/CIN.png";
import GST from "../assets/GST.png";
import { contactUs } from "../apiEndpoints";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobile_number: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCaptchaEnginge(6); // Load captcha with 6 characters
  }, []);

  const contactarray = [
    { img: contact1, title: string.contactperson },
    { img: contact2, title: string.contactnumber },
    { img: contact3, title: string.contactmail },
    { img: contact4, title: string.contactaddress },
    { img: contact5, title: string.contactnumber2 },
    { img: CIN, title: string.contactCIN },
    { img: GST, title: string.contactGST },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validation: Name fields should not contain numbers
    if (name === "name") {
      if (/\d/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Name cannot contain numbers",
        }));
        return;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
    if (name === "mobile_number") {
      // Check if the value contains non-numeric characters (anything other than digits)
      if (/[^\d]/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only numbers are allowed",
        }));
        return;
      }

      // Check if the value exceeds 10 digits
      if (value.length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "You can enter only 10 digits",
        }));
        // Show a small popup (you can use alert or any notification library)
        // alert("You can enter only 10 digits");
        return;
      }

      // If valid, clear the error
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message || !formData.mobile_number) {
      Swal.fire({
        icon: "error",
        title: "All fields are required",
        text: "Please fill in all fields.",
      });
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Captcha validation
    if (!validateCaptcha(formData.captcha)) {
      Swal.fire({
        icon: "error",
        title: "Captcha Incorrect",
        text: "Please complete the CAPTCHA verification correctly.",
      });
      return;
    }

    try {
      // Send form data to the backend
      const response = await contactUs(formData);
      if (!response.success) {
        throw new Error("Failed to submit data");
      }

      // Prefill email information and send via mailto
      // const subject = encodeURIComponent("Contact Us Form Submission");
      // const body = encodeURIComponent(
      //   `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}\nMoile Number: ${formData.mobile_number}`
      // );
      // window.location.href = `mailto:help@defencepartners.in?subject=${subject}&body=${body}`;

      // Show success message after form submission
      Swal.fire({
        icon: "info",
        title: "Submission Successful",
        text: "Thank you for contacting us. We will get back to you shortly.",
      });

      // Clear form after submission
      setFormData({
        name: "",
        email: "",
        message: "",
        mobile_number: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your subscription. Please try again later.",
      });
    }
  };

  return (
    <div className="flex justify-center font-poppins">
      <div className="container 3xl:w-[70%] px-4 xl:px-20 py-20">
        <div className="py-12">
          <div className="relative font-EBGaramond text-center ">
            <h2 className="uppercase text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal py-1 sm:py-2">
              {string.contacttitle}
            </h2>
            <div className="absolute bottom-0 left-[47%] w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
          </div>
        </div>
        <div className="p-4 md:p-8 border-[1px] border-footerblue/35 rounded-xl flex flex-col sm:flex-row gap-6 lg:gap-12">
          <div className="w-full sm:w-[50%] flex flex-col justify-between">
            <div>
              <div className="text-sm lg:text-base space-y-12 2xl:text-lg">
                {string.contactformline}
              </div>
              <div className="relative font-EBGaramond ">
                <h2 className="uppercase text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold sm:py-1 lg:py-2">
                  {string.contactformtitle}
                </h2>
                <div className="absolute bottom-0 w-4 md:w-8 lg:w-12 xl:w-16 h-[0.20rem] bg-[#1189CC] rounded-[20px]"></div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-4 justify-between h-full"
            >
              <div className="w-full">
                <input
                  type="text"
                  className="text-base lg:text-lg 2xl:text-xl w-full outline-none border-[1px] border-footerblue/20 rounded-xl p-4 text-black"
                  placeholder={string.contactforminput1}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="email"
                  className="text-base lg:text-lg 2xl:text-xl w-full outline-none border-[1px] border-footerblue/20 rounded-xl p-4 text-black"
                  placeholder={string.contactforminput2}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="mobile_number"
                  className="text-base lg:text-lg 2xl:text-xl w-full outline-none border-[1px] border-footerblue/20 rounded-xl p-4 text-black"
                  placeholder={string.contactforminputMobile_number}
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="text-base lg:text-lg 2xl:text-xl w-full outline-none border-[1px] border-footerblue/20 rounded-xl p-4 text-black"
                  placeholder={string.contactforminput3}
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="w-full">
                <LoadCanvasTemplate reloadText="Reload Captcha" />
                <input
                  type="text"
                  className="text-base lg:text-lg 2xl:text-xl w-full outline-none border-[1px] border-footerblue/20 rounded-xl p-4 text-black mt-4"
                  placeholder="Enter Captcha"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="text-lg lg:text-xl 2xl:text-2xl bg-textblue py-4 font-semibold rounded-lg text-white w-full"
                >
                  {string.contactformbtn}
                </button>
              </div>
            </form>
          </div>
          <div className="w-full sm:w-[50%] p-4 md:p-8 px-6 lg:px-12 xl:px-16 flex flex-col justify-between items-center bg-gradient-to-r from-textblue to-footerblue rounded-3xl sm:rounded-xl lg:rounded-3xl">
            <div className="w-full">
              <h2 className="uppercase text-white text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-EBGaramond font-semibold py-2">
                {string.contactUltitle}
              </h2>
            </div>
            <div className="flex flex-col gap-2 py-2 sm:py-4">
              {contactarray.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-white">
                  <div className="w-[5%]">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="w-[95%] text-base lg:text-lg 2xl:text-xl">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 pb-6">
              <img src={contact} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
