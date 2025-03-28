import axios from "axios";

const axiosApi = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URI}/api/`,
});

export const axiosInstance = axiosApi;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    return response;
  },
  (error) => {
    console.log("Error response:", error.response);
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized, redirecting to login...");
      localStorage.clear();
      // localStorage.clear();
      // window.location.href = "/login";
      // window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post(`register`, formData);

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const sendOtp = async (email, mobile_number) => {
  try {
    const response = await axiosInstance.post(`otp/send`, {
      email,
      mobile_number,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error;
  }
};

export const verifyOtp = async (
  email,
  email_otp,
  mobile_number,
  mobile_otp
) => {
  try {
    const response = await axiosInstance.post(`otp/verify`, {
      email,
      email_otp,
      mobile_number,
      mobile_otp,
    });
    return response.data;
  } catch (error) {
    console.error("OTP verification failed:", error);
    throw error;
  }
};

export const checkVerificationStatus = async (email, mobile_number) => {
  try {
    const response = await axiosInstance.post(`check/verify`, {
      email,
      mobile_number,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to check verification status:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(`login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const storePaymentDetails = async (paymentData) => {
  try {
    const response = await axiosInstance.post(`payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Failed to store payment details:", error);
    throw error;
  }
};

export const getSponsors = async () => {
  try {
    const response = await axiosInstance.get(`sponsors`);
    // console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await axiosInstance.post(
      `user/profile/update`,
      profileData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to store payment details:", error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`user/profile`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

export const fetchCompanyList = async () => {
  try {
    const response = await axiosInstance.get(`companies`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch company profile:", error);
    throw error;
  }
};

export const fetchCompanyListByRole = async (role) => {
  try {
    const response = await axiosInstance.get(`companies/role?role=${role}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch company profile:", error);
    throw error;
  }
};

export const checkCompany = async (companyName) => {
  try {
    const response = await axiosInstance.get(
      `companies/search?search=${encodeURIComponent(companyName)}`
    );
    console.log(response.data);
    return response.data.data.length > 0;
  } catch (error) {
    console.error("Failed to fetch company profile:", error);
    throw error;
  }
};

export const addToCart = async (cartData) => {
  try {
    const response = await axiosInstance.post(`cart/add`, cartData);

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await axiosInstance.get(`cart`);

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await axiosInstance.get(`cart/clear`);

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const updateCart = async (cartId, quantity) => {
  try {
    const response = await axiosInstance.post(`cart/update`, {
      cart_id: cartId,
      quantity: quantity,
    });

    return response.data;
  } catch (error) {
    console.error("Update cart failed:", error);
    throw error;
  }
};

export const updateExhibitionOptions = async (formData) => {
  try {
    const response = await axiosInstance.post(`exhibiting-options`, formData);

    return response.data;
  } catch (error) {
    console.error("C. Submit fail", error);
    throw error;
  }
};

export const fetchExhibitionOptions = async (category) => {
  try {
    const response = await axiosInstance.get(
      `exhibiting-options?category=${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exhibition options", error);
    throw error;
  }
};
export const updateBrandingOptions = async (formData) => {
  try {
    const response = await axiosInstance.post(`branding-options`, formData);

    return response.data;
  } catch (error) {
    console.error("C. Submit fail", error);
    throw error;
  }
};

export const fetchBrandingOptions = async (category) => {
  try {
    const response = await axiosInstance.get(
      `branding-options?category=${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exhibition options", error);
    throw error;
  }
};

export const updateSponsorshipOption = async (formData) => {
  try {
    const response = await axiosInstance.post(`sponsorship`, formData);

    return response.data;
  } catch (error) {
    console.error("B. Submit fail", error);
    throw error;
  }
};

export const fetchSponsorshipOption = async (category) => {
  try {
    const response = await axiosInstance.get(
      `sponsorship?child_category=${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sponsorship options", error);
    throw error;
  }
};

export const updateCommunicationOptions = async (formData) => {
  try {
    const response = await axiosInstance.post(`communication-options`, formData);

    return response.data;
  } catch (error) {
    console.error("C. Submit fail", error);
    throw error;
  }
};

export const fetchCommunicationOptions = async (category) => {
  try {
    const response = await axiosInstance.get(
      `communication-options?category=${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exhibition options", error);
    throw error;
  }
};

export const updateProfileImage = async (form) => {
  try {
    const response = await axiosInstance.post(`user/profile/image`, form);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile photo", error);
    throw error;
  }
};
export const deleteProfile = async () => {
  try {
    const response = await axiosInstance.get(`user/profile/image/delete`);
    return response.data;
  } catch (error) {
    console.error("delete profile failed", error);
    throw error;
  }
};
export const deleteMainBusinessProfile = async (Id) => {
  try {
    const response = await axiosInstance.get(`delete-main-business-image/${Id}`);
    return response.data;
  } catch (error) {
    console.error("delete profile failed", error);
    throw error;
  }
};
export const deleteCompanyBrochureCoverImage = async (Id) => {
  try {
    const response = await axiosInstance.get(`delete-company-brochure-cover-img/${Id}`);
    return response.data;
  } catch (error) {
    console.error("delete company brochure cover image", error);
    throw error;
  }
};
export const deleteCompanyLogo = async (Id) => {
  try {
    const response = await axiosInstance.get(`delete-company-logo/${Id}`);
    return response.data;
  } catch (error) {
    console.error("delete company brochure", error);
    throw error;
  }
};
export const deleteCompanyBrochure = async (Id) => {
  try {
    const response = await axiosInstance.get(`delete-company-brochure/${Id}`);
    return response.data;
  } catch (error) {
    console.error("delete company brochure", error);
    throw error;
  }
};

export const associateMediaPartner = async () => {
  try {
    const response = await axiosInstance.get(`associate-media-partners`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch associateMediaPartner details:", error);
    throw error;
  }
};

export const changePassword = async (email) => {
  try {
    const response = await axiosInstance.post(`forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Password Reset failed:", error);
    throw error;
  }
};

export const checkOTPVerification = async (email, mobile_number) => {
  try {
    const response = await axiosInstance.post(`check/verify`, {
      email,
      mobile_number,
    });
    return response.data;
  } catch (error) {
    console.error("OTP Verification failed:", error);
    throw error;
  }
};

export const checkPaymentVerification = async (email, mobile_number) => {
  try {
    const response = await axiosInstance.post(`check/payment/status`, {
      email,
      mobile_number,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to Check Payment Status:", error);
    throw error;
  }
};

// auth
export const halfRegisteredUser = async (email) => {
  try {
    const response = await axiosInstance.post(`register/details`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch User Data:", error);
    throw error;
  }
};

// Get All Key Gov Officer Data
export const getKeyGovServicesOfficer = async () => {
  try {
    const response = await axiosInstance.get(`user/getKeyGovServicesOfficer`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Key Gov Officer Data:", error);
    throw error;
  }
};

// Get All other Profile Data
export const getUserListByRole = async (role) => {
  try {
    const response = await axiosInstance.post(`user/getUserListByRole`, {
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Other Profile Data:", error);
    throw error;
  }
};

// Newsletter api
export const newsletterSubscription = async (formData) => {
  try {
    const response = await axiosInstance.post(`newsletter-subscription`, formData);

    return response.data;
  } catch (error) {
    console.error("newsletter subscription failed:", error);
    throw error;
  }
};

// Get NewsLetter Data
export const getNewsLetterSubscription = async () => {
  try {
    const response = await axiosInstance.get(`newsletter-subscription`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Key Gov Officer Data:", error);
    throw error;
  }
};

// Get NewsLetter Data
export const getAllNewsLetterData = async () => {
  try {
    const response = await axiosInstance.get(`newsletter`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Key Gov Officer Data:", error);
    throw error;
  }
};

// Contact us api
export const contactUs = async (formData) => {
  try {
    const response = await axiosInstance.post(`contact-us`, formData);

    return response.data;
  } catch (error) {
    console.error("newsletter subscription failed:", error);
    throw error;
  }
};

// get companies brochure
export const getCompanies = async () => {
  try {
    const response = await axiosInstance.get(`companies`);

    return response.data;
  } catch (error) {
    console.error("company fetched:", error);
    throw error;
  }
};

// get company presentation
export const getPresentation = async () => {
  try {
    const response = await axiosInstance.get(`get-all-sponsorships`);
    return response.data;
  } catch (error) {
    console.error("company presentations:", error);
    throw error;
  }
};

// get mechanical data
export const getMechanicalData = async () => {
  try {
    const response = await axiosInstance.get(`get-mechanical-data`, { headers: { 'Accept': 'application/pdf' }, responseType: 'blob' });
    return response;
  } catch (error) {
    console.error("get mechanical data:", error);
    throw error;
  }
};

// get speakers data
export const getSpeaker = async () => {
  try {
    const response = await axiosInstance.get(`speakers`);

    return response.data;
  } catch (error) {
    console.error("speakers fetched:", error);
    throw error;
  }
};
// get business activity
export const getBusinessActivity = async () => {
  try {
    const response = await axiosInstance.get(`main-business-activities`);
    return response.data;
  } catch (error) {
    console.error("Business activities:", error);
    throw error;
  }
}
// get products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`products-services`);
    return response.data;
  } catch (error) {
    console.error("Products-Services:", error);
    throw error;
  }
}
// get schedule
export const getSchedule = async () => {
  try {
    const response = await axiosInstance.get('schedules');
    const schedulesData = response.data.data; // Extract the schedules data

    // Separate schedules based on the title
    const day1Schedules = schedulesData['Schedule of Day 1'] || [];
    const day2Schedules = schedulesData['Schedule of Day 2'] || [];

    return {
      day1Schedules,
      day2Schedules,
    };
  } catch (error) {
    console.error("Schedules:", error);
    throw error;
  }
};