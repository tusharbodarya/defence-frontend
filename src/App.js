import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import FAQs from "./components/FAQs";
import Terms from "./components/Terms";
import CentralTalks from "./components/CentralTalks";
import KeyGovtOfficers from "./components/KeyGovtOfficers";
import Objective from "./components/Objective";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HowItWork from "./components/HowItWork";
import Schedule from "./components/Schedule/Schedule";
import Stickynav from "./components/Stickynav";
import Exhibition from "./components/Exhibition";
import Participants from "./components/Participants";
import Home from "./components/Home";
import UpdateKeyGovtProfile from "./components/LoginForm/UpdateKeyGovtProfile";
import UpdateProfile from "./components/LoginForm/UpdateProfile";
import CommunicationsOption from "./components/Communication/CommunicationsOption";
import BrandOption from "./components/Branding/BrandOption";
import WhySponsors from "./components/Sponsors/WhySponsors";
import Pricelist from "./components/PriceList/Pricelist";
import ExhibitionOptions from "./components/ExhibitionOptions/ExhibitionOptions";
import FrontEndDisplay from "./components/LoginForm/FrontEndDisplay";
import CompanyProfile from "./components/LoginForm/CompanyProfile";
import ContactUs from "./components/ContactUs";
import LoginPop from "./components/LoginPop";
import SavedProfile from "./components/LoginForm/SavedProfile";
import PrimeContractor from "./components/Participant'sProfile/PrimeContractor";
import { Breadcrumbs } from "@mui/material";
import ExPayment from "./components/ExhibitionOptions/ExPayment";
import Expop from "./components/ExhibitionOptions/Expop";
import CopyRight from "./components/Policy/CopyRight";
import PrivacyPolicy from "./components/Policy/PrivacyPolicy";
import RefundPolicy from "./components/Policy/RefundPolicy";
import ShippingPolicy from "./components/Policy/ShippingPolicy";
import Car from "./components/Cart/Cart";
import BrandPayment from "./components/Branding/BrandPayment";
import CommonPopup from "./components/Communication/CommunicationPopup/CommonPopup";
import SpoPayment from "./components/Sponsors/SpoPayment";
import SpoPop from "./components/Sponsors/SpoPop";
import ProtectedRoute from "./components/ProtectedRoute";
import roles from "./utils/roles";
import KeyGovtHome from "./components/LoginForm/KeyGovtHome";
import MediaPartnerProfile from "./components/Participant'sProfile/MediaPartnerProfile";
import SponsorProfile from "./components/Participant'sProfile/SponsorProfile";
import Day1Schedule from "./components/Schedule/Day1Schedule";
import Day2Schedule from "./components/Schedule/Day2Schedule";
import string from "./constants/string";
import oems from "./assets/oems.jpg";
import startup from "./assets/startup.jpg";
import investor from "./assets/investor.jpg";
import manufacturer from "./assets/manufacturer.jpg";
import Cart from "./components/Cart/Cart";
import Common from "./components/Branding/Common";
import CommonBrandPop from "./components/Branding/CommonBrandPop";
import NewsLetter from "./components/NewsLetter";
import NewsLetterThanks from "./components/NewsLetterThanks";
import Participant from "./components/Participant'sProfile/Participant";
import Subscription from "./components/Subscription";
import DownloadBrochure from "./components/DownloadCompanyBrochure/DownloadBrochure";
import DownloadPresentation from "./components/DownloadPresentation/DownloadPresentation";
import Guideline from "./components/Guideline";
import Venue from "./components/venue/Venue.jsx";
import Speaker from "./components/speaker/Speaker.jsx";
import HighLightsPage from "./components/Highlights/HighLightsPage.jsx";

function App() {
  const restrictedRolesForProfile = [
    roles.CASUAL_VISITOR,
    roles.COMPANY_LISTING,
    roles.EVENT_PARTNER,
  ];

  return (
    <>
      <div className="w-screen">
        <ScrollToTop>
          <Navbar />
          <Stickynav />
          <Routes>
            <Route path="/home" element={<Home />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/register" element={<Home />} />
            <Route path="/faq" element={<FAQs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/central-talks" element={<CentralTalks />} />
            <Route path="/newsletter" element={<NewsLetter />} />
            <Route path="/newsThanks" element={<NewsLetterThanks />} />
            <Route path="/speakers" element={<Speaker />} />

            {/* brochure and presentation  */}
            <Route path="/downloadBrochure" element={<DownloadBrochure />} />
            <Route path="/downloadPresentation" element={<DownloadPresentation />} />
            <Route path="/" element={<HighLightsPage />} />

            {/* Key Gov Officers Profile Page*/}
            <Route path="/key-govt-officers" element={<KeyGovtOfficers />} />
            <Route path="/objective" element={<Objective />} />
            <Route path="/howitwork" element={<HowItWork />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/day1Schedule" element={<Day1Schedule />} />
            <Route path="/day2Schedule" element={<Day2Schedule />} />
            <Route path="/exhibition&meeting" element={<Exhibition />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/participants" element={<Participant />} />
            {/* <Route path="/companyprofile/:company_name/:profile" element={<CompanyProfile />} /> */}
            <Route path="/companyprofile" element={<CompanyProfile />} />
            <Route path="/frontenddisplay" element={<FrontEndDisplay />} />
            <Route path="/guideline" element={<Guideline />} />
            <Route
              path="/frontenddisplay/:name"
              element={<FrontEndDisplay />}
            />
            <Route path="/contactus" element={<ContactUs />} />
            {/* <Route path="/login" element={<LoginPop />} /> */}
            <Route path="/login" element={<Home />} />
            <Route path="/communication" element={<CommunicationsOption />} />
            <Route path="/branding" element={<BrandOption />} />
            <Route path="/branding/brandPayment" element={<BrandPayment />} />
            <Route path="/whysponsors" element={<WhySponsors />} />
            <Route path="/whysponsors/spoPayment" element={<SpoPayment />} />
            <Route path="/pricelist" element={<Pricelist />} />
            <Route path="/exhibitionOptions" element={<ExhibitionOptions />} />
            <Route
              path="/exhibitionOptions/Expayment"
              element={<ExPayment />}
            />
            <Route
              path="/primeparticipant"
              element={
                <PrimeContractor
                  roles={"Prime Contractors/OEMs"}
                  title={string.primetitle}
                  disc={string.primedisc}
                  btn={string.primebtn}
                  img={oems}
                />
              }
            />
            <Route
              path="/startupprofile"
              element={
                <PrimeContractor
                  roles={"start-ups"}
                  title={string.startupTitle}
                  disc={string.primedisc}
                  btn={string.primebtn}
                />
              }
            />
            <Route
              path="/manufacturerProfile"
              element={
                <PrimeContractor
                  roles={"Manufacturers & Suppliers"}
                  title={string.manufacturerProfileTitle}
                  disc={string.primedisc}
                  btn={string.primebtn}
                  img={manufacturer}
                />
              }
            />
            <Route
              path="/investorProfile"
              element={
                <PrimeContractor
                  roles={"Investors"}
                  title={string.investorProfileTitle}
                  disc={string.primedisc}
                  btn={string.primebtn}
                  img={investor}
                />
              }
            />
            <Route
              path="/mediaPartnerProfile"
              element={<MediaPartnerProfile />}
            />
            <Route path="/sponsorProfile" element={<SponsorProfile />} />
            <Route path="/copyright" element={<CopyRight />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/refundpolicy" element={<RefundPolicy />} />
            <Route path="/shippingpolicy" element={<ShippingPolicy />} />

            {/* Routes that Require user to be logged in  */}
            <Route
              path="/communication/:subcategory"
              element={
                <ProtectedRoute notAllowedRoles={restrictedRolesForProfile}>
                  <CommonPopup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/whysponsors/:subcategory/:child_category"
              element={
                <ProtectedRoute notAllowedRoles={restrictedRolesForProfile}>
                  <SpoPop />
                </ProtectedRoute>
              }
            />
            <Route
              path="/branding/:subcategory"
              element={
                <ProtectedRoute notAllowedRoles={restrictedRolesForProfile}>
                  <CommonBrandPop />
                </ProtectedRoute>
              }
            />

            {/* For All roles, Object.values(roles); */}
            <Route
              path="/updateKeyGovtProfile"
              element={
                <ProtectedRoute
                  notAllowedRoles={[
                    roles.PRIME_CONTRACTOR,
                    roles.MANUFACTURER,
                    roles.INVESTOR,
                    roles.EVENT_PARTNER,
                    roles.CASUAL_VISITOR,
                    roles.COMPANY_LISTING,
                    roles.STARTUP,
                  ]}
                >
                  <UpdateKeyGovtProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/keyGovtHome"
              element={
                <ProtectedRoute
                  notAllowedRoles={[
                    roles.PRIME_CONTRACTOR,
                    roles.MANUFACTURER,
                    roles.INVESTOR,
                    roles.EVENT_PARTNER,
                    roles.CASUAL_VISITOR,
                    roles.COMPANY_LISTING,
                    roles.STARTUP,
                  ]}
                >
                  <KeyGovtHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/exhibitionOptions/:booth"
              element={
                <ProtectedRoute notAllowedRoles={restrictedRolesForProfile}>
                  <Expop />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateProfile"
              element={
                <ProtectedRoute
                  notAllowedRoles={[
                    ...restrictedRolesForProfile,
                    roles.KEY_GOVT_OFFICER,
                  ]}
                >
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/savedProfile"
              element={
                <ProtectedRoute
                  notAllowedRoles={[
                    ...restrictedRolesForProfile,
                    roles.KEY_GOVT_OFFICER,
                  ]}
                >
                  <SavedProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute notAllowedRoles={restrictedRolesForProfile}>
                  <Cart />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </ScrollToTop>
      </div>
    </>
  );
}

export default App;