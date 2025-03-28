import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import Swal from 'sweetalert2';

const Guideline = () => {
    const guidelineString = {
        "guidelines": [
            {
                "title": "GUIDELINES FOR PARTICIPANTS",
                "items": [
                    {
                        "id": 1,
                        "description": "These guidelines are for participants who have registered and purchased the:",
                        "subItems": [
                            "A1 Business Participant Meeting package",
                            "A2 Second Business Participant",
                            "A3 Additional Meeting Pack",
                            "A4 Company Listing Only",
                            "A5 Startup Business Participant",
                            "A6 Casual Visitor Pass"
                        ]
                    },
                    {
                        "id": 2,
                        "title": "WEBSITE PLATFORMS",
                        "description": "This website has two platforms, as follows:",
                        "subItemsURL": [
                            {
                                "text": "The Event Website (",
                                "URL": "https://defencepartners.in",
                                "text2": ")",
                            },
                            {
                                "text": "Meetings Pages (",
                                "URL": "https://meetings.defencepartners.in/",
                                "text2": "). This part can be accessed only by registered participants with meeting packs and provides Full profiles and Meeting Scheduler",
                            },
                        ]
                    },
                    {
                        "id": 3,
                        "title": "REGISTRATION",
                        "description": "Registration and payment can be done through this website, in which case participants will be able to start using the Members Area and build their profiles immediately.",
                    },
                    {
                        "id": 4,
                        "description": "Registration can be done by sending your order by email or through an Order Form, in which case on receipt of your payment, Admin will register your name manually and inform you.",
                    },
                    {
                        "id": 5,
                        "title": "SINGING-IN",
                        "span": "Event Website. ",
                        "description": "To sign into the Event Website, use your registered email id and password. The profile icon on the Home Page allows you to access your Dashboard, Change Password, Contact IMR for Help, and Logout.",
                    },
                    {
                        "id": 6,
                        "span": "Meetings Pages. ",
                        "description": `Your registered email id is good for signing into the Meetings Pages. For the first time when you sign-in to Meetings Pages from any device, you may be asked to "Request Access" through a button displayed on the landing page. Enter your registered email id and you will receive a link or token to access the pages. If you access the pages from the same device, you may not be asked to request access again and you will reach your account page. Keep the access link/token saved for late use, if required or you can "Request Access" again if necessary.`,
                    },
                    {
                        "id": 7,
                        "title": "COMPANY AND PERSONAL PROFILES",
                        "description": "On successful completion of the Registration Process, participants can use their Profile Dashboard on the Event Website and complete their short profile. Full profile can be completed on the Meetings Pages.",
                    },
                    {
                        "id": 8,
                        "description": "Participants affiliated to a company will have the Company Profile shown, with the Main and Second Participants mentioned under the Company profile.",
                    },
                    {
                        "id": 9,
                        "description": "Participants without any company affiliation like Key Govt & Service Officers and some Investors will have the Profile under their own names.",
                    },
                    {
                        "id": 10,
                        "description": "In case you need help to complete your profile, you may contact Heera Singh at 8826670075. A support specialist will be assigned to you.",
                    },
                    {
                        "id": 11,
                        "title": "COMPANY LISTING ONLY",
                        "description": "Companies, which have selected this option, on Registration and Payment will be sent details by post. They will be required to submit details as per Goggle Form link provided. A copy of the Defence Industry Directory will be provided to them on publication. They will not have any physical presence at the event. They can browse only Event Website platform.",
                    },
                    {
                        "id": 12,
                        "title": "CASUAL VISITOR'S PASS",
                        "description": "Participants, who have selected this option, on Registration and Payment, will get instructions by email about collection of their passes at the venue on the days of the event. They can browse the Event Website but cannot access the Meetings Pages.",
                    },
                    {
                        "id": 13,
                        "title": "ADD-ONS",
                        "description": "Participants who are registered as follows can buy Add-ons mentioned in the price list.",
                        "subItems": [
                            "Prime Contractors & OEMs.",
                            "Manufacturers and Suppliers",
                            "Startups",
                            "Investors"
                        ]
                    },
                    {
                        "id": 14,
                        "description": "Add-ons are (details on the Price List Page):",
                        "subItems": [
                            "Corporate Sponsorship. B1, B2, B3.",
                            "Association Sponsorship. B4, B5, B6.",
                            "Exhibition Options. C1, C2 (for Gold Sponsors), C3 (for Platinum Sponsors). ",
                            "Branding Options. D1, D2, D3, D4, D5, D5, D7, D8.",
                            "Communication Options. E1, E2, E3, E4, E5, E6.",
                            "Advertisement in the Event Guide. E7, E8, E9, E10, E11.",
                        ]
                    },
                    {
                        "id": 15,
                        "description": "Add-ons and Extra Items purchased for exhibition booths will be reflected on the Participant's Profile Dashboard. ",
                    },
                    {
                        "id": 16,
                        "title": "SCHEDULING MEETINGS",
                        "description": "Any Registered participant with a meeting pack and request for meeting with any other registered participant through the Meetings Scheduler available on the Meetings Pages. Guidelines for searching profiles, searching shortlisting, reviewing schedules, sending requests for meetings, amending requests, etc are mentioned on the Meetings Pages. Tutorials with slides and FAQs are also available on the Meetings Pages.",
                    },
                    {
                        "id": 17,
                        "description": "Up to 300 Meeting Tables and Exhibition Booths are being provided as meeting points. Key Govt & Services Officers will be provided with a fixed meeting point (Numbered meeting table). Companies opting for an exhibition booth will hold meetings at their own booths, except in cases where they have requested meeting with a Key Govt & Services Officer. For participants without any fixed meeting table, the scheduling system will allot a table from amongst free floating tables earmarked for this purpose.",
                    },
                    {
                        "id": 18,
                        "description": "The key to scheduling quality meetings is to provide maximum information in your profile and select all possible products and services from the exhaustive list provided in the profile dashboard.",
                    },
                    {
                        "id": 19,
                        "title": "MOB PHONES, LAPTOPS AND WI-FI",
                        "description": "Mobile phones and laptops are permitted. Wi-Fi, mobile phone connectivity is reasonably good at the venue. ",
                    },
                    {
                        "id": 20,
                        "title": "SECURITY CLEARANCE",
                        "description": "Only Indian nationals are permitted to participate. Foreign companies may participate but should be represented by Indian nationals only. ",
                    },
                    {
                        "id": 21,
                        "title": "PRESENTATIONS AND WORKSHOPS",
                        "description": "In the parallel programme, a number of presentations and workshops are planned, which all participants including Casual Visitors may attend. These will be publicized at the venue, on the event website and through Newsletters. There is limited space for attendees in the halls allotted for these presentations and workshops and is on first come first serve basis. It is up to the participants to secure their place to attend. ",
                    },
                    {
                        "id": 22,
                        "span": "Event Guide.",
                        "description": " Every Main and Second Participant's particulars will be included in the Event Guide but limited to the following. This information will be captured from the Participant's profile page. Please ensure that your profile page is complete in all respects.",
                        "subItems": [
                            "Company (with Booth No if purchased).",
                            "Main Business Activity",
                            "Main Products/ Services ",
                        ]
                    },
                    {
                        "id": 23,
                        "span": "Defence Industry Directory.",
                        "description": "A Defence Industry Directory will be produced on CD and in printed book form with all companies’ data taken from the profile pages of registered participants, after the event and sent to all participants at their registered addresses.",
                    },
                    {
                        "id": 24,
                        "title": "VENUE, REACHING THERE AND LAYOUT",
                        "description": "Details about the Venue, reaching there, location of various halls, and layout of Exhibition Booths and Meeting tables are available under ABOUT button in the Menu. ",
                    },
                    {
                        "id": 25,
                        "description": "Details of nearby hotels nearby is also included. ",
                    },
                    {
                        "id": 26,
                        "span": "Refreshments and Lunch. ",
                        "description": "During the event days, refreshments and Lunch will be served to all participants. ",
                    },
                    {
                        "id": 27,
                        "title": "ADDITIONAL GUIDELINES ",
                        "description": "Additional guidelines for Sponsors and Exhibitors will be sent directly to them. ",
                    },
                ]
            }
        ]
    }
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);

    // Handle meeting request action with role checks
    // const handleRequestMeetingClick = () => {
    //     if (!authToken) {
    //         Swal.fire({
    //             title: "Access Restricted",
    //             text: "To request a meeting, please log in or register for an account.",
    //             icon: "warning",
    //             showDenyButton: true,
    //             showCloseButton: true,
    //             confirmButtonText: "Login",
    //             denyButtonText: "Register",
    //             customClass: {
    //                 confirmButton: "swal-confirm-button",
    //                 denyButton: "swal-deny-button",
    //                 closeButton: "swal-close-button",
    //             },
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 navigate("/login");
    //             } else if (result.isDenied) {
    //                 navigate("/register");
    //             }
    //         });
    //     } else {
    //         window.open("https://meetings.defencepartners.in/", "_blank");
    //     }
    // };
    const handleRequestMeetingClick = () => {
        navigate("/login");
    };
    return (
        <section className="flex justify-center py-32">
            <div className="container 3xl:w-[70%] space-y-32 px-4 xl:px-20 ">
                <div className="md:col-span-3">
                    <div className="relative heading mb-4">
                        <h2 className="font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
                            {guidelineString.guidelines[0].title}
                        </h2>
                        <div className="absolute left-[50%] right-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[5%] md:w-[10%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC]"></div>
                    </div>
                    <div className='px-4 lg:px-8 lg:text-lg xl:text-xl 2xl:text-2xl'>
                        {guidelineString.guidelines[0].items.map((item, index) => (
                            <div key={index} className={`text-justify px-4 xl:px-6 py-2 lg:py-4 xl:py-6 ${item.id % 2 ? 'bg-yellow-50' : 'bg-green-100'}`}>
                                <div className='text-center xl:mb-1'>
                                    <h2 className='font-bold lg:text-[1.2rem] xl:text-[1.4rem]'>{item.title}</h2>
                                </div>
                                <h2>{item.id}. <strong>{item.span}</strong> {item.description}</h2>
                                <ul className='pl-8 xl:pl-12 list-lower-alpha '>
                                    {item.subItems && (
                                        item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex}>{subItem}</li>
                                        ))
                                    )}
                                    {item.subItemsURL && (
                                        item.subItemsURL.map((item, index) => (
                                            <li key={index}>
                                                {item.text}
                                                {!authToken ? (
                                                    <a onClick={handleRequestMeetingClick} className='text-textblue' target="_blank" rel="noopener noreferrer">
                                                        {item.URL}
                                                    </a>
                                                ) : (
                                                    <a href={item.URL} className='text-textblue' target="_blank" rel="noopener noreferrer">
                                                        {item.URL}
                                                    </a>
                                                )}
                                                {item.text2}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Guideline
