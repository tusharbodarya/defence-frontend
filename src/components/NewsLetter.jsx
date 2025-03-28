import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import BlueButton from "./BlueButton";
import newsletter from "./../assets/NewsLetterMain.png";
import {
  getAllNewsLetterData,
  getNewsLetterData,
  getNewsLetterSubscription,
  newsletterSubscription,
} from "../apiEndpoints";
import NewsLetterData from "./NewsLetterData";

const NewsLetter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    pronounce: "",
    captcha: "",
    order: 0,
  });
  const [participants, setParticipants] = useState([]);
  const [errors, setErrors] = useState({});
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validation: Name fields should not contain numbers
    if (name === "first_name" || name === "last_name") {
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleThanks = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.pronounce
    ) {
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
      const response = await newsletterSubscription(formData);

      // Check for specific error status code 422
      if (response.status === 422) {
        throw new Error("This email id is already taken");
      }

      // Check if the submission was not successful
      if (!response.success) {
        throw new Error("Failed to submit data");
      }

      // Navigate to the thanks page if successful
      navigate("/newsThanks");

      // Clear form after submission
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        pronounce: "",
        captcha: "",
        order: 0,
      });
    } catch (error) {
      // Custom error handling for specific message
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "This email id is already taken." || "There was an error submitting your subscription. Please try again later.",
      });
    }


  };

  useEffect(() => {
    loadCaptchaEnginge(6); // Load captcha with 6 characters
    const fetchNewsLetter = async () => {
      try {
        const response = await getAllNewsLetterData();
        if (response.success) {
          setParticipants(response.data);
        } else {
          console.error("Failed to fetch newsletter:", response.message);
        }
      } catch (error) {
        console.error("Error fetching newsletter:", error);
      }
    };
    fetchNewsLetter();
    console.log(participants);
  }, []);

  return (
    <section className="flex justify-center py-14">
      <div className="container 3xl:w-[70%] space-y-32 px-4 xl:px-20 ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-16">
          <div className="md:col-span-3">
            <div className="relative heading mb-4">
              <h2 className="font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                Newsletter Subscription
              </h2>
              <div className="absolute bottom-0 left-0 w-[5%] md:w-[10%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC]"></div>
            </div>
            <div className="flex justify-center flex-col gap-8">
              <div className="text-sm md:text-base lg:text-lg xl:text-xl lg:space-y-4">
                <div>
                  With our Newsletter Service, we keep you regularly informed
                  about all the latest news regarding your participation in
                  Defence Partnership Days.
                </div>
                <div>
                  You'll also receive recommendations on other Industrialin
                  events of possible interest to you.
                </div>
              </div>
              <form
                onSubmit={handleThanks}
                className="space-y-2 md:space-y-4 xl:space-y-6 text-sm md:text-base lg:text-lg xl:text-xl "
              >
                <div className="space-y-2 md:space-y-4 xl:space-y-6">
                  <div>
                    <input
                      type="text"
                      name="pronounce"
                      value={formData.pronounce}
                      onChange={handleInputChange}
                      placeholder="Mr. / Ms."
                      className="w-full p-2 lg:p-4 border-[1px] rounded-lg border-iconborder/20"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="First Name*"
                      className="w-full p-2 lg:p-4 border-[1px] rounded-lg border-iconborder/20"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Last Name*"
                      className="w-full p-2 lg:p-4 border-[1px] rounded-lg border-iconborder/20"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full p-2 lg:p-4 border-[1px] rounded-lg border-iconborder/20"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                  />
                  <div>
                    I would like to subscribe to the Industrialin News Service.
                  </div>
                </div>

                <div className="text-justify">
                  DEFENCE PARTNERSHIP DAYS (IMR Media Pvt Ltd) may process my
                  e-mail address to send me information tailored to my interests
                  about events organized by IMR Media as well as about companies
                  and products from the industries represented at such events.
                  In order to personalize the newsletters, IMR Media may use
                  information on my use of newsletters and other personal data
                  in accordance with IMR Media Privacy Policy. I can revoke this
                  consent at any time in the future.
                </div>
                <div className="bg-lightblue rounded-lg flex flex-col justify-center items-center p-4 lg:p-8">
                  <div className="w-[80%] mx-auto">
                    <LoadCanvasTemplate reloadText="Reload Captcha" />
                  </div>
                </div>
                <div className="w-full">
                  <div>Type the character here:</div>
                  <div className="flex gap-4 w-full items-center">
                    <div className="w-[80%]">
                      <input
                        type="text"
                        className="text-base lg:text-lg 2xl:text-xl w-full outline-none border-[1px] border-footerblue/20 rounded-xl p-3 text-footerblue/50"
                        placeholder="Enter Captcha"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-[20%]">
                      <BlueButton
                        title={"Submit"}
                        width={"w-full h-full"}
                        disabled={!isCheckboxChecked}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <img src={newsletter} alt="" />
          </div>
        </div>
        <div className="h-screen">
          <div className="flex justify-center items-center flex-col">
            <div className="text-center heading mb-4">
              <h2 className="font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                CATCH UP WITH NEWSLETTERS
              </h2>
              <div className="text-black/50 text-sm md:text-base lg:text-lg xl:text-xl ">
                If you missed any of our Newsletters here are the previous
                issues
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {participants.map((participant, index) => (
                <NewsLetterData
                  key={index}
                  title={participant.title}
                  date={participant.date}
                  img={
                    participant.image
                      ? `${process.env.REACT_APP_BASE_URI}/storage/${participant.image}`
                      : null
                  }
                  document={
                    participant.document
                      ? `${process.env.REACT_APP_BASE_URI}/storage/${participant.document}`
                      : null
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
