import React, { useContext, useEffect, useMemo, useState } from "react";
import string from "../constants/string";
import Search from "./Participant'sProfile/Search";
import { getKeyGovServicesOfficer } from "../apiEndpoints";
import companyprofile from "./../assets/blankprofile.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import Swal from "sweetalert2";
import KeyGovtOfficersProfileCard from "./KeyGovtOfficersProfileCard";

const officers = [
  { dot: "JS & Acquisition Manager (Air), MoD  " },
  { dot: "AS & DG (Acquisition), MoD  " },
  { dot: "JS & Acquisition Manager (M&S), MoD  " },
  { dot: "Addl DG Acquisition Technical (Maritime & Systems), MoD  " },
  { dot: "Addl DG Acquisition Technical (Air), MoD  " },
  { dot: "Addl DG Acquisition Technical (Army), MoD  " },
  { dot: "Finance Manager (Air), MoD  " },
  { dot: "Finance Manager (Land System), MoD   " },
  { dot: "Finance Manager (MS), MoD  " },
  { dot: "Joint Secretary (Aerospace), MoD  " },
  { dot: "DDG, Export, DDP, MoD  " },
  { dot: "DDG, Indigenisation, DDP, MoD  " },
  { dot: "Joint Secretary (Naval Systems), DDP, MoD  " },
  { dot: "Joint Secretary (Land Systems), DDP, MoD    " },
  { dot: "Joint Secretary (Defence Offsets Management Wing), DDP, MoD  " },
  { dot: "DDG New Defence Companies Division, DDP, MoD  " },
  { dot: "Defence Innovations Organisation (iDEX), MoD  " },
  {
    dot: "Nodal Officers for Make 1, II, III Projects (30 officers) from each Service  ",
  },
  { dot: "DGQA, DGAQA,  " },
  { dot: "Dte of Standardisation, MoD" },

  { dot: "Dte of Futuristic Technology Management, DRDO  " },
  { dot: "Dte of Technology Development Fund, DRDO  " },
  { dot: "Dte of Industry Interface & Technology Management, DRDO " },
  {
    dot: "Deputy Chief of Integrated Defence Staff (Policy Plg & Force Development)  ",
  },
  {
    dot: "Deputy Chief of Army Staff (Capability Development & Sustenance), Army HQ  Army Design Bureau, Army HQ  ",
  },
  {
    dot: "Dte of Capability Development, Army HQ  Master General Sustenance, Army HQ  ",
  },
  {
    dot: "Army's User Directorates - (Artillery, Armoured Corps, Air Defence, Infantry,  ",
  },
  { dot: "Army Aviation, Engineers, Signals, MGO, DGOS, DGST, etc)  " },
  {
    dot: "Deputy Chief of Naval Staff, Naval HQ  Chief of Materiel, Naval HQ  ",
  },
  { dot: "Controller Warship Production & Acquisition, Naval HQ  " },
  { dot: "Director General Warship Design Bureau, Naval HQ  " },
  { dot: "Director General (Submarine Design Group), Naval HQ  " },
  { dot: "Assistant Chief of the Naval Staff (Policy & Plans), Naval HQ  " },
  { dot: "Assistant Chief of the Naval Staff (Air Materiel), Naval HQ  " },
  {
    dot: "Assistant Chief of the Naval Staff (Staff Requirements), Naval HQ  ",
  },
  { dot: "Deputy Chief of the Air Staff, Air HQ  " },
  { dot: "Air Officer in Charge Maintenance, Air HQ  " },
  { dot: "DG Aircrafts, Air HQ  DG Systems, Air HQ" },
];

const leftOfficers = officers.slice(0, 20);
const rightOfficers = officers.slice(20);

const KeyGovtOfficers = () => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await getKeyGovServicesOfficer();
        if (response.success) {
          setParticipants(response.data);
        } else {
          console.error("Failed to fetch officers:", response.message);
        }
      } catch (error) {
        console.error("Error fetching officers:", error);
      }
    };
    fetchOfficers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All profiles");

  // const filteredParticipants = participants.filter((participant) => {
  //   const fullName = `${participant?.user?.first_name || ""} ${participant?.user?.last_name || ""}`.toLowerCase();
  //   const designation = participant?.main_participant_designation?.toLowerCase() || "";
  //   const org = participant?.main_participant_org?.toLowerCase() || "";

  //   // Apply search term filter
  //   const searchMatches = fullName.includes(searchTerm.toLowerCase()) || designation.includes(searchTerm.toLowerCase()) || org.includes(searchTerm.toLowerCase());

  //   // Apply filter based on selected filter
  //   if (selectedFilter === "All profiles") {
  //     return searchMatches;
  //   } else if (selectedFilter === "By Company") {
  //     return org.includes(searchTerm.toLowerCase());
  //   } else if (selectedFilter === "By Business Activity") {
  //     return designation.includes(searchTerm.toLowerCase());
  //   } else if (selectedFilter === "By Product/Services") {
  //     return (participant.products_services || []).some(service =>
  //       service.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   } else if (selectedFilter === "By Keyword") {
  //     return searchMatches; // You could define specific behavior for this as needed.
  //   }
  //   return true; // Default case
  // });

  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const handleRequestMeetingClick = () => {
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
  };
  const handleBuyAdditionalPack = () => {
    if (!authToken) {
      Swal.fire({
        title: "Access Restricted",
        text: "Additional Meeting Pack can be purchased by A1 Business Participant or A2 Second Business Participant only. Please register. login and try again",
        icon: "warning",
        showDenyButton: true,
        showCloseButton: true,
        confirmButtonText: "Login",
        denyButtonText: "Register",
        customClass: {
          confirmButton: "swal-confirm-button",
          denyButton: "swal-deny-button",
          closeButton: "swal-close-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.isDenied) {
          navigate("/register");
        }
      });
    } else {
      navigate("/pricelist");
    }
  };
  const handlePricelist = () => {
    navigate("/pricelist");
  };

  // Memoized filtered participants based on search term and selected filter
  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      // Combine relevant fields into a searchable string
      const searchableFields = `${participant?.user?.first_name || ""} 
       ${participant.user?.last_name || ""} 
       ${participant?.main_participant_designation || ""} 
       ${participant?.main_participant_org || ""} 
       ${participant?.main_participant_name || ""}
       ${participant?.products_services || ""}
       ${participant?.main_subjects || ""}`.toLowerCase();

      // Match based on selected filter
      switch (selectedFilter) {
        case "By Company":
          return (
            participant.user?.company
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            participant.company?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        case "By Business Activity":
          return participant.main_business_activities
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "By Product/Services":
          return participant.main_business_products
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "By Keyword":
          return searchableFields.includes(searchTerm.toLowerCase());
        default: // "All profiles"
          return searchableFields.includes(searchTerm.toLowerCase());
      }
    });
  }, [participants, searchTerm, selectedFilter]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <section className="flex justify-center py-14">
      <div className="container 3xl:w-[70%] p-4 xl:px-20">
        {/* Title Section */}
        <div className="relative heading flex justify-center items-center text-center mb-4 md:px-[10rem] lg:px-[15rem]">
          <h2 className="font-EBGaramond uppercase lg:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl font-normal">
            {string.keytitle}
          </h2>
          <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC]"></div>
        </div>
        <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-center ">
          {string.primedisc}
        </div>
        <div className="flex justify-center py-8">
          {!authToken ? (
            <button
              onClick={handleRequestMeetingClick}
              className="bg-textblue rounded-full text-white py-2 px-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
            >
              {string.primebtn}
            </button>
          ) : (
            <button
              onClick={handlePricelist}
              className="bg-textblue rounded-full text-white py-2 px-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
            >
              {string.primebtn}
            </button>
          )}
        </div>

        {/* Static Officer List Section */}
        <div className="p-4 flex justify-center gap-8">
          <div className="w-[50%]">
            {leftOfficers.map((officer, index) => (
              <div key={index} className="xl:py-1">
                <div className="text-sm md:text-base lg:text-lg xl:text-xl">
                  <ul className="list-disc">
                    <li>{officer.dot}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[50%]">
            {rightOfficers.map((officer, index) => (
              <div key={index} className="xl:py-1">
                <div className="text-sm md:text-base lg:text-lg xl:text-xl">
                  <ul className="list-disc">
                    <li>{officer.dot}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="py-4 lg:w-[90%] mx-auto">
          <Search onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>

        {/* Participant Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {filteredParticipants.map((participant, index) => (
            <KeyGovtOfficersProfileCard
              key={index}
              img={
                participant?.main_participant_image
                  ? `${process.env.REACT_APP_BASE_URI}/storage/${participant?.main_participant_image}`
                  : companyprofile
              }
              company_name={
                participant?.user?.first_name +
                " " +
                participant?.user?.last_name || "Participant Name"
              }
              main_participant_name={
                participant?.main_participant_designation || "Designation"
              }
              description={participant?.main_participant_org || "Organization"}
              // mainParticipantName={participant?.main_participant_service || "Service"}
              participant={participant?.main_participant_name}
              responsibility={participant?.main_subjects}
              product={participant?.products_services}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Inline CSS within the same file
const styles = `
  .swal-confirm-button {
    background-color: #007bff; /* Blue color */
    color: white;
  }

  .swal-deny-button {
    background-color: #28a745; /* Green color */
    color: white;
  }

  .swal-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    color: #333;
  }
`;

// Injecting the styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
export default KeyGovtOfficers;
