import React, { useEffect, useState } from "react";
import {
  registerUser,
  sendOtp,
  checkOTPVerification,
  checkPaymentVerification,
  halfRegisteredUser,
  fetchCompanyListByRole,
} from "./../../apiEndpoints";
import Activate from "../Activate";
import Subscription from "../Subscription";
import Payment from "../Payment";
import Success from "../Success";
import LoginPop from "../LoginPop";
import AutoSuggest from "../AutoSuggest";
import Swal from "sweetalert2";
import roles from "../../utils/roles";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({
  title,
  eventId,
  userRole,
  onNext,
  loading,
  setLoading,
  apiStatus,
  setApiStatus,
}) => {
  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    title: "",
    company: "",
    mobile_number: "",
    event_id: eventId,
    roles: userRole,
    password: "",
    confirm_password: "",
    city: "",
    country: "",
    national: "Indian",
    gst: "",
    purpose: "",
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    title: "",
    company: "",
    mobile_number: "",
    event_id: eventId,
    roles: userRole,
    password: "",
    confirm_password: "",
    city: "",
    country: "",
    national: "Indian",
    gst: "",
    purpose: "",
  });
  const resetFormData = () => {
    setFormData(initialFormData);
    setErrors({});
    setConsent({ consent1: false, consent2: false });
  };

  const [subscriptionDetails, setSubscriptionDetails] = useState({
    subscription_name: "",
    amount: 0,
  });

  const navigate = useNavigate();
  const [consent, setConsent] = useState({
    consent1: false,
    consent2: false,
  });

  const [step, setStep] = useState({ number: 0, data: null });
  const [errors, setErrors] = useState({});
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (userRole) {
      setCompanyList([]);
      const fetchCompanies = async () => {
        try {
          const response = await fetchCompanyListByRole(userRole);
          setCompanyList(response.data);
        } catch (error) {
          console.error("Error fetching company list:", error);
        }
      };

      fetchCompanies();
    }
  }, [userRole]);

  const handleChange = (name, value) => {
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "company") {
      setSelectedCompany(null);
    }
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    handleChange("company", company.name);
  };

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setConsent((prevConsent) => ({
      ...prevConsent,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    let firstErrorField = null;

    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] &&
        key !== "gst" &&
        key !== "title" &&
        key !== "purpose"
      ) {
        newErrors[key] = "This field is required";
        if (!firstErrorField) firstErrorField = key;
      }
    });

    if (formData.mobile_number && formData.mobile_number.length !== 10) {
      newErrors.mobile_number = "Mobile number must be 10 digits";
      if (!firstErrorField) firstErrorField = "mobile_number";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
      if (!firstErrorField) firstErrorField = "confirm_password";
    }

    if (formData.gst && formData.gst.length !== 15) {
      newErrors.gst = "GST number must be 15 characters";
      if (!firstErrorField) firstErrorField = "gst";
    }

    if (!consent.consent1 || !consent.consent2) {
      newErrors.consent = "Consent required";
      if (!firstErrorField) firstErrorField = "consent1";
    }

    setErrors(newErrors);

    if (firstErrorField) {
      const firstErrorElement = document.querySelector(
        `[name="${firstErrorField}"]`
      );
      if (firstErrorElement) {
        firstErrorElement.focus(); // Only focus if the element exists
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const determinePackage = async (member_id, userRole) => {
    const isCompanyExisting = member_id != 1;

    const subscriptionMap = {
      [roles.PRIME_CONTRACTOR]: {
        existing: { subscription_name: "A2", amount: 30000 },
        new: { subscription_name: "A1", amount: 40000 },
      },
      [roles.INVESTOR]: {
        existing: { subscription_name: "A2", amount: 30000 },
        new: { subscription_name: "A1", amount: 40000 },
      },
      [roles.STARTUP]: {
        existing: { subscription_name: "A5", amount: 30000 },
        new: { subscription_name: "A5", amount: 30000 },
      },
      [roles.MANUFACTURER]: {
        existing: { subscription_name: "A2", amount: 30000 },
        new: { subscription_name: "A1", amount: 40000 },
      },
      [roles.CASUAL_VISITOR]: {
        existing: { subscription_name: "A6", amount: 7500 },
        new: { subscription_name: "A6", amount: 7500 },
      },
      [roles.EVENT_PARTNER]: {
        existing: { subscription_name: "EP", amount: 0 },
        new: { subscription_name: "EP", amount: 0 },
      },
      [roles.COMPANY_LISTING]: {
        existing: { subscription_name: "A4", amount: 15000 },
        new: { subscription_name: "A4", amount: 15000 },
      },
      [roles.KEY_GOVT_OFFICER]: {
        new: { subscription_name: "KG", amount: 0 },
      },
    };

    const roleDetails = subscriptionMap[userRole];

    if (!roleDetails) {
      return { subscription_name: "A0", amount: 40000 };
    }

    if (isCompanyExisting && roleDetails.existing) {
      return roleDetails.existing;
    } else if (roleDetails.new) {
      return roleDetails.new;
    }

    return { subscription_name: "A0", amount: 40000 };
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: userRole,
    }));

    if (!validateForm()) {
      return;
    }

    const { value: confirmationData, dismiss } = await Swal.fire({
      title: "Confirm Your Details",
      html: `
        <div class="form-group flex flex-col md:flex-row items-center md:justify-between">
          <label class="w-full md:w-[20%] text-left">Email:</label>
          <input id="email" class="w-full md:w-[80%] swal2-input" type="email" value="${formData.email}" disabled >
        </div>
        <div class="form-group flex flex-col md:flex-row items-center md:justify-between mt-4 md:mt-0">
          <label class="w-full md:w-[20%] text-left">Mobile Number:</label>
          <input id="mobile_number" class="w-full md:w-[80%] swal2-input" type="text" value="${formData.mobile_number}" disabled>
        </div>
      `,
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        const mobile_number =
          Swal.getPopup().querySelector("#mobile_number").value;
        handleCancel();
        return { email, mobile_number };
      },
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
    });

    function handleCancel() {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        title: "",
        company: "",
        mobile_number: "",
        event_id: eventId,
        roles: userRole,
        password: "",
        confirm_password: "",
        city: "",
        country: "",
        national: "Indian",
        gst: "",
        purpose: "",
      });
      setErrors({});
      setConsent({ consent1: false, consent2: false });
      setSelectedCompany(null);
    }

    if (dismiss === Swal.DismissReason.cancel) {
      handleCancel();
      return;
    }

    if (!confirmationData) {
      return;
    }

    const { email, mobile_number } = confirmationData;

    if (email !== formData.email || mobile_number !== formData.mobile_number) {
      Swal.fire({
        icon: "error",
        title: "Mismatch Detected",
        text: "The email id and or mobile number you have entered has already been taken. Please enter a new email id and/or mobile number or contact the Admin at 9582649663 or 8826670075 by SMS or WhatsApp for assistance.",
      });
      return;
    }

    setLoading(true);

    // Check for halfRegisteredUser's response here before setting loading state
    try {
      const halfRegisteredResponse = await halfRegisteredUser(formData.email);

      if (halfRegisteredResponse.success) {
        const registeredRole = halfRegisteredResponse?.data?.role;

        if (registeredRole !== userRole) {
          Swal.fire({
            icon: "warning",
            title: "Role Mismatch Detected",
            text: `This profile is already registered with the role "${registeredRole}".  Kindly continue the registration process with correct role. If you wish to change the role, please contact the admin at 9582649663 or 8826670075 by SMS or WhatsApp for assistance.`,
          });
          handleCancel();
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while checking registration status. Please try again.",
        });
        return;
      }
    } finally {
      handleCancel();
      setLoading(false);
    }

    try {
      let otpVerificationStatus;
      try {
        otpVerificationStatus = await checkOTPVerification(
          formData.email,
          formData.mobile_number
        );
        otpVerificationStatus = { status: 200 };
      } catch (error) {
        if (error.response && error.response.status === 404) {
          otpVerificationStatus = { status: 404 };
        } else if (error.response && error.response.status === 422) {
          otpVerificationStatus = { status: 422 };
        } else {
          throw error;
        }
      }

      if (otpVerificationStatus.status === 404) {
        const response = await registerUser({ ...formData });

        // Fetching halfRegisteredUser data
        const halfRegisteredResponse = await halfRegisteredUser(
          response.data.email
        );

        // Safely update formData with the response from halfRegisteredUser
        const userData = halfRegisteredResponse.data.user;

        setFormData((prevFormData) => ({
          ...prevFormData,
          ...userData,
          roles: userData.roles[0]?.name || "", // Assuming the role is always at index 0
        }));

        const { subscription_name, amount } = await determinePackage(
          userData.member_id,
          userData.roles[0]?.name || "" // Use the first role if available
        );

        setApiStatus({ success: true, message: "Registration successful!" });

        const storedUserData = {
          id: userData.id,
          email: userData.email,
          mobile_number: userData.mobile_number,
          name: `${userData.first_name} ${userData.last_name}`,
        };
        localStorage.setItem("userData", JSON.stringify(storedUserData));
        localStorage.setItem("email", userData.email);

        setSubscriptionDetails({ subscription_name, amount });

        await sendOtp(userData.email, userData.mobile_number);
        setStep({
          number: 1,
          data: {
            formData,
            subscriptionDetails: { subscription_name, amount },
          },
        });
      } else if (otpVerificationStatus.status === 422) {
        setStep({ number: 1, data: { formData } });
      } else if (otpVerificationStatus.status === 200) {
        let paymentStatus;
        try {
          paymentStatus = await checkPaymentVerification(
            formData.email,
            formData.mobile_number
          );
          paymentStatus = { status: 200 };
        } catch (error) {
          if (error.response && error.response.status === 404) {
            paymentStatus = { status: 404 };
          } else if (error.response && error.response.status === 422) {
            paymentStatus = { status: 422 };
          } else {
            throw error;
          }
        }

        if (paymentStatus.status === 422) {
          const halfRegisteredData = await halfRegisteredUser(formData.email);
          const member_id = halfRegisteredData.data.user.member_id;
          const userData = halfRegisteredData.data.user;

          // Update formData with the role and other data from halfRegisteredUser
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...userData,
            roles: userData.roles[0]?.name || "", // Assuming the role is always at index 0
          }));

          const { subscription_name, amount } = await determinePackage(
            member_id,
            userData.roles[0]?.name || "" // Use the first role if available
          );

          setSubscriptionDetails({ subscription_name, amount });
          setStep({
            number: 2,
            data: {
              formData,
              subscriptionDetails: { subscription_name, amount },
            },
          });
        } else if (paymentStatus.status === 200) {
          setStep({ number: 4, data: { formData } });
        }
      }
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response?.data?.message;

        const errorData = error.response?.data?.data;
        if (
          errorData &&
          typeof errorData === "object" &&
          Object.keys(errorData).length > 0
        ) {
          errorMessage = Object.keys(errorData)
            .map((key) => errorData[key].join("\n"))
            .join("\n");

          const firstErrorField = Object.keys(errorData)[0];
          document.querySelector(`[name="${firstErrorField}"]`).focus();
        }
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
      });

      setApiStatus({ success: false, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (formData.roles === roles.KEY_GOVT_OFFICER) {
      setStep({ number: 4, data: { formData } });
    } else if (formData.roles === roles.EVENT_PARTNER) {
      Swal.fire({
        icon: "success",
        title: "Request Received",
        text: "Your request for becoming an Associate or Media Partner will be considered by the Organising Committee. Please see the email sent to you and submit the information required. Thank you.",
      });
      localStorage.clear();
      navigate("/");
    } else {
      setStep((prevStep) => ({
        number: prevStep.number + 1,
        data: prevStep.data,
      }));
    }
  };

  const handleLogin = (e) => {
    const role = formData.roles;

    if (role === roles.CASUAL_VISITOR) {
      Swal.fire({
        icon: "info",
        title: "Request Received",
        text: "Thank you for buying a Casual Visitor Pass. Please check your email. Guidelines will follow.",
      });
      localStorage.clear();
      navigate("/");
    } else if (role === roles.EVENT_PARTNER) {
      Swal.fire({
        icon: "info",
        title: "Request Received",
        text: "Your request for becoming an Associate or Media Partner will be considered by the Organising Committee. Please see the email sent to you and submit the information required. Thank you.",
      });
      localStorage.clear();
      navigate("/");
    } else if (role === roles.COMPANY_LISTING) {
      Swal.fire({
        icon: "info",
        title: "Request Received",
        text: "Your order for Company Listing Only has been registered. An email has been sent to you. Please submit the information required as mentioned in the email to process your order further.",
      });
      localStorage.clear();
      navigate("/");
    } else {
      setStep({ number: 4, data: { formData } });
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    onNext();
    localStorage.clear();
  };

  return (
    <div>
      {step.number === 0 && (
        <form
          onSubmit={handleRegister}
          className="h-full flex flex-col justify-between"
        >
          <div>
            <h2 className="text-base lg:text-xl xl:text-2xl font-semibold py-2 mb-4">
              {title}
            </h2>
            <div className="input-field py-4 grid grid-cols-2 gap-8">
              {[
                { label: "Title / Salutation (optional)", name: "title" },
                {
                  label: "First Name (prefix Rank here, if reqd)",
                  name: "first_name",
                },
                { label: "Last Name", name: "last_name" },
                { label: "Mobile No.", name: "mobile_number", type: "number" },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
                {
                  label: "Confirm Password",
                  name: "confirm_password",
                  type: "password",
                },
                { label: "Company/ Institution", name: "company" },
                { label: "City", name: "city" },
                { label: "Country", name: "country" },
                {
                  label: "Nationality (Indian Nationals Only)",
                  name: "national",
                  readOnly: true,
                },
                { label: "GST Regn (optional)", name: "gst" },
                { label: "Purpose of Attending (optional)", name: "purpose" },
              ].map((field, index) => (
                <div key={index} className="mb-4">
                  <div className="text-sm lg:text-lg xl:text-xl">
                    {field.label}:
                  </div>
                  {field.name === "company" ? (
                    <AutoSuggest
                      value={formData.company}
                      onChange={(value) => handleChange("company", value)}
                      onSelect={handleCompanySelect}
                      suggestions={companyList}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      readOnly={field.readOnly || false}
                      className={`bg-inputcolor w-full text-sm lg:text-lg xl:text-xl rounded-lg p-2 xl:p-4 ${errors[field.name] ? "border-red-500 " : ""
                        }`}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-rose-500 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="checkbox flex flex-col gap-2 text-base lg:text-lg xl:text-xl pb-44">
            <div className="flex gap-2 lg:gap-4">
              <div className="flex items-start w-6 pt-2">
                <input
                  type="checkbox"
                  className="size-4 lg:size-5"
                  name="consent1"
                  checked={consent.consent1}
                  onChange={handleConsentChange}
                />
              </div>
              <p>
                I hereby give my consent for the Organizers to use the data
                submitted by me for the event and for participants to
                communicate with me.
              </p>
            </div>
            <div className="flex gap-2 lg:gap-4">
              <div className="flex items-start w-6 pt-2">
                <input
                  type="checkbox"
                  className="size-4 lg:size-5"
                  name="consent2"
                  checked={consent.consent2}
                  onChange={handleConsentChange}
                />
              </div>
              <p>
                I have read the Code of Conduct and agree to the Terms and
                Conditions and Privacy Policy.
              </p>
            </div>
            {errors.consent && (
              <p className="text-rose-500 text-xs mt-1">{errors.consent}</p>
            )}
          </div>
          <button
            className="bg-textblue text-base lg:text-xl xl:text-2xl w-full rounded-lg text-white font-normal my-4 py-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Next"}
          </button>
          <div className="text-center">
            Already Registered?{" "}
            <span>
              <a href="/login" className="text-footerblue underline">
                {" "}
                Click Here to LogIn
              </a>
            </span>
          </div>
          {apiStatus.message && (
            <div
              className={`mt-4 text-sm lg:text-lg xl:text-xl ${apiStatus.success ? "text-green-500" : "text-red-500"
                }`}
            >
              {apiStatus.message}
            </div>
          )}
        </form>
      )}

      {step.number === 1 && (
        <Activate
          onActivate={handleNextStep}
          onClose={() => {
            onNext(); // Reset form when coming back from Activate
            setStep({ number: 0, data: null });
          }}
          formData={step.data.formData}
          setApiStatus={setApiStatus}
          setLoading={setLoading}
        />
      )}
      {step.number === 2 && (
        <Subscription
          _amount={subscriptionDetails.amount}
          onClick={handleNextStep}
          onClose={() => {
            setStep({ number: 1, data: step.data });
            onNext(); // Reset form when coming back from Activate
          }}
          userRole={formData.roles}
        />
      )}
      {step.number === 3 && (
        <Payment
          onClick={handleLogin}
          onClose={() => setStep({ number: 2, data: step.data })}
          amount={subscriptionDetails.amount}
          subscription_category="A"
          subscription_name={subscriptionDetails.subscription_name}
        />
      )}
      {/* {step.number === 4 && (
        <Success
          onClick={handleLogin}
          onClose={() => setStep({ number: 3, data: step.data })}
        />
      )} */}
      {step.number === 4 && (
        <LoginPop
          onClick={handleClose}
          onClose={() => setStep({ number: 0, data: null })}
        />
      )}
    </div>
  );
};

export default RegistrationForm;
