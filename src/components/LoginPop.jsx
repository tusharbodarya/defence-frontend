import React, { useState, useRef, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import string from "../constants/string";
import activateside from "../assets/activateside.png";
import {
  loginUser,
  halfRegisteredUser,
  changePassword,
} from "./../apiEndpoints";
import roles from "./../utils/roles.js";
import { AuthContext } from "./../utils/AuthContext.js";

import Activate from "../components/Activate";
import Subscription from "../components/Subscription";
import Payment from "../components/Payment";

const LoginPop = () => {
  const logRef = useRef(null);
  const topRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState({ number: 0, data: {} });
  const [history, setHistory] = useState([]);
  const [apiStatus, setApiStatus] = useState({ success: false, message: "" });
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    subscription_name: "",
    amount: 0,
  });
  const [userData, setUserData] = useState(null); // Central state for user data
  const { login, logout } = useContext(AuthContext); // Added logout function
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const passwordChange = async () => {
    // if (loading) return; // Prevent multiple clicks

    // setLoading(true); // Start loading

    try {
      if (!email) {
        await Swal.fire({
          icon: "warning",
          title: "Email Required",
          text: "Please enter your email to proceed.",
        });
        return;
      }
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

  const determinePackage = async (member_id, userRole) => {
    const isCompanyExisting = member_id != 1;

    // Mapping of roles to subscription details
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
      return { subscription_name: "A0", amount: 40000 }; // Default case
    }

    return isCompanyExisting && roleDetails.existing
      ? roleDetails.existing
      : roleDetails.new;
  };

  const handleNextStep = (nextStep) => {
    setHistory((prevHistory) => [...prevHistory, step.number]);
    setStep({ number: nextStep });
  };

  const handleRoleBasedRedirect = async (role, isFirstTimeLogin) => {
    try {
      const response = await halfRegisteredUser(email);

      if (!response.success) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "You need to register first.",
        }).then(() => {
          navigate("/register");
        });
        return;
      }

      const userDataResponse = response.data.user;
      const isProfileSaved =
        userDataResponse &&
        userDataResponse.first_name &&
        userDataResponse.last_name;

      if (role === roles.KEY_GOVT_OFFICER) {
        if (isProfileSaved) {
          navigate("/keyGovtHome");
        } else {
          navigate("/updateKeyGovtProfile");
        }
      } else if (
        [
          roles.CASUAL_VISITOR,
          roles.EVENT_PARTNER,
          roles.COMPANY_LISTING,
        ].includes(role)
      ) {
        Swal.fire({
          icon: "info",
          title: "Request Received",
          text:
            role === roles.CASUAL_VISITOR
              ? "Thank you for buying a Casual Visitor Pass. Please check your email. Guidelines will follow."
              : role === roles.EVENT_PARTNER
                ? "Your request for becoming an Associate or Media Partner will be considered by the Organising Committee. Please see the email sent to you and submit the information required. Thank you."
                : "Your order for Company Listing Only has been registered. An email has been sent to you. Please submit the information required as mentioned in the email to process your order further.",
        });
        logout(); // Using AuthContext to logout
        navigate("/");
      } else {
        if (isProfileSaved) {
          navigate("/savedProfile");
        } else if (isFirstTimeLogin) {
          navigate("/updateProfile");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      Swal.fire({
        icon: "error",
        title: "Profile Fetch Failed",
        text: "Unable to fetch profile. Please try again later.",
      });
      navigate("/");
    }
  };

  const handleLogin = async () => {
    // Check if email is provided
    if (!email) {
      await Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email to proceed.",
      });
      return;
    }

    // Check if password is provided
    if (!password) {
      await Swal.fire({
        icon: "warning",
        title: "Password Required",
        text: "Please enter your password to proceed.",
      });
      return;
    }

    setLoading(true);

    try {
      // Check if the email and password are correct by making an initial login attempt
      let loginResponse;
      try {
        loginResponse = await loginUser(email, password);
      } catch (error) {
        // Check for 401 error (incorrect email or password)
        if (error.response && error.response.status === 401) {
          await Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Email and password are incorrect. Please try again.",
          });
          return; // Stop execution if login failed due to incorrect credentials
        } else {
          // Log the error and continue for other types of errors
          console.error("Error during initial login attempt:", error);
        }
      }

      // Continue with rest of the code only if loginResponse is valid and not an error
      if (!loginResponse || !loginResponse.success) {
        console.log(
          "Handling non-401 errors or cases where login was not successful."
        );
        // No error message is shown, but log or handle as needed.
      } else {
        const { success, message, data } = loginResponse;

        if (success) {
          login(data.token, email);
          localStorage.setItem("email", email);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              user_id: data.user_id,
              role: data.role,
              is_first_time_login: data.is_first_time_login,
            })
          );

          const userRole = data.role;
          const isFirstTimeLogin = data.is_first_time_login;
          await handleRoleBasedRedirect(userRole, isFirstTimeLogin);
          window.location.reload(); // Refresh the page
        }
      }

      // Proceed with the rest of the login checks if no 401 error occurred

      let halfRegistrationResponse;
      try {
        halfRegistrationResponse = await halfRegisteredUser(email);
      } catch (error) {
        console.error("Error in halfRegisteredUser API call:", error);
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "You need to register first",
        });
        navigate("/register");
        window.location.reload(); // Refresh the page
        return;
      }

      const userDataResponse = halfRegistrationResponse.data.user;

      // Extract the role from the roles array
      const userRole =
        userDataResponse.roles?.[0]?.name || halfRegistrationResponse.data.role;

      // Store user data using setUserData
      setUserData({
        id: userDataResponse.id,
        email: userDataResponse.email,
        mobile_number: userDataResponse.mobile_number,
        member_id: userDataResponse.member_id,
        role: userRole, // Use extracted role
        mobile_verified: userDataResponse.mobile_verified,
        payment_status: userDataResponse.payment_status,
      });

      if (userDataResponse.mobile_verified === 0) {
        handleNextStep(1);
        return;
      }
      // **Skip Payment for Certain Roles**
      if (
        userRole === roles.KEY_GOVT_OFFICER ||
        userRole === roles.EVENT_PARTNER
      ) {
        handleRoleBasedRedirect(userRole, false); // Directly redirect for these roles
        window.location.reload(); // Refresh the page
        return;
      }

      // **Check for payment status first**
      if (userDataResponse.payment_status === 0) {
        const { subscription_name, amount } = await determinePackage(
          userDataResponse.member_id,
          userRole // Use the extracted role
        );

        setSubscriptionDetails({ subscription_name, amount });
        handleNextStep(2);
        return;
      }

      // **Only check roles after confirming payment**
      if (userRole === roles.CASUAL_VISITOR) {
        Swal.fire({
          icon: "info",
          title: "Request Received",
          text: "Thank you for buying a Casual Visitor Pass. Please check your email. Guidelines will follow.",
        });
        localStorage.clear();
        navigate("/");
        return;
      } else if (userRole === roles.EVENT_PARTNER) {
        Swal.fire({
          icon: "info",
          title: "Request Received",
          text: "Your request for becoming an Associate or Media Partner will be considered by the Organising Committee. Please see the email sent to you and submit the information required. Thank you.",
        });
        localStorage.clear();
        navigate("/");
        return;
      } else if (userRole === roles.COMPANY_LISTING) {
        Swal.fire({
          icon: "info",
          title: "Request Received",
          text: "Your order for Company Listing Only has been registered. An email has been sent to you. Please submit the information required as mentioned in the email to process your order further.",
        });
        localStorage.clear();
        navigate("/");
        return;
      }

      // Continue with further logic as necessary
    } catch (error) {
      console.error("Login Error: ", error);
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred during login. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
      <div ref={topRef} className="container 3xl:w-[70%] w-[80%] md:w-2/3">
        <div
          ref={logRef}
          className="bg-white rounded-[2.4rem] flex flex-col sm:flex-row"
        >
          <div className="w-full sm:w-[60%] lg:w-[70%] flex flex-col p-8 justify-between">
            <div>
              <button
                onClick={handleClose}
                className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="font-semibold text-xl lg:text-2xl xl:text-3xl">
                {string.loginpoptitle}
              </div>
              <div className="text-sm lg:text-lg text-justify">
                {string.loginpopdisc}
              </div>
            </div>
            <div className="flex justify-center gap-8 flex-col">
              <div>
                <p className="text-sm lg:text-lg">{string.loginpopmail}</p>
                <input
                  type="text"
                  placeholder={string.loginpopmailph}
                  className="w-full border-[1px] px-2 py-1 border-black/10 rounded-lg outline-none text-sm lg:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <p className="text-base lg:text-lg">{string.loginpoppass}</p>
                <input
                  type="password"
                  placeholder={string.loginpoppassph}
                  className="w-full border-[1px] px-2 py-1 border-black/10 rounded-lg outline-none text-sm lg:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="text-right flex justify-end">
              <button
                className="text-sm md:text-base lg:text-lg xl:text-xl rounded-lg font-normal py-3 px-4 text-white bg-textblue w-full"
                type="button"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login to your account"}
              </button>
            </div>

            <div className="text-center">
              <span className="font-semibold">Forgot Password?</span> Enter your registered email id above and &nbsp;
              <span>
                <button
                  onClick={passwordChange}
                  className="text-footerblue underline"
                >
                  Click Here
                </button>
              </span>
            </div>
          </div>
          <div className="hidden sm:block w-[40%] lg:w-[30%]">
            <img src={activateside} alt="Activate Side" className="w-full" />
          </div>
        </div>
      </div>

      {step.number === 1 && (
        <Activate
          onActivate={() => handleNextStep(2)}
          onClose={() => setStep({ number: 0 })}
          formData={{
            email,
            mobile_number: userData?.mobile_number,
          }}
          setApiStatus={setApiStatus}
          setLoading={setLoading}
        />
      )}
      {step.number === 2 && (
        <Subscription
          _amount={subscriptionDetails.amount}
          onClick={() => handleNextStep(3)}
          onClose={() => setStep({ number: 1 })}
          userRole={userData?.role}
        />
      )}
      {step.number === 3 && (
        <Payment
          onClick={handleLogin}
          onClose={() => setStep({ number: 2 })}
          amount={subscriptionDetails.amount}
          subscription_category="A"
          subscription_name={subscriptionDetails.subscription_name}
          _user_id={userData?.id}
        />
      )}
    </div>
  );
};

export default LoginPop;
