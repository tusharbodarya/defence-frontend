const pricelist = {
  title: "Price List",
  basicMeetingsPackage: {
    title: "A. Basic Meetings Package (10 meetings)",
    description: "To buy any of these packages A1-A6, go to registration page.",
    buttonText: "Go to Registration",
    packages: [
      {
        id: "A1",
        title: "A1. BUSINESS PARTICIPANT",
        price: "Rs. 40,000",
        description:
          "Entry fee to DEFENCE PARTNERSHIP DAYS 2024 for one person with benefit of fixing 10 pre-scheduled meetings over two days. This Plan includes - ",
        features: [
          "Your company profile page with products, services, presentation, brochures & video on the event website",
          "Your full page searchable company profile published in the Defence Industry Directory(for MoD and Services HQ) on CD and in print. Copy will be provided to participants.",
          "Your participation with contact details(6 lines) published in the Event Guide.",
          "Your pre-programmed and individual meeting schedule with selected confirmed participants",
          "Free access to Central Talks, Presentations, Parallel Programme, Refreshments and Networking Lunch",
        ],
      },
      {
        id: "A2",
        title: "A2. SECOND BUSINESS PARTICIPANT with 10-meeting Pack",
        price: "Rs. 30,000",
        description: "with all privileges as first participant",
      },
      {
        id: "A3",
        title: "A3. ADDITIONAL MEETING PACK",
        price: "Rs. 25,000",
        description: "of 10 additional meetings",
        buttonText: "Buy Now",
      },
      {
        id: "A4",
        title: "A4. COMPANY LISTING ONLY",
        price: "Rs. 15,000",
        description:
          "Company’s full-page details included in Defence Industry Directory on CD and in print for all MoD depts/ Services HQ and participants.",
      },
      {
        id: "A5",
        title: "A5. STARTUP BUSINESS PARTICIPANT",
        price: "Rs. 30,000",
        description:
          "Includes 10 meeting pack. For startups with DIPP registration number.",
      },
      {
        id: "A6",
        title: "A6. Casual Visitor",
        price: "Rs. 7,500",
        features: [
          "a) Attend workshops, central talks, flash presentations.",
          "b) Visit exhibition stands.",
          "c) Fix casual meetings with participants who are free at their exhibition stands",
          "d) Refreshments and lunch are included.",
        ],
      },
    ],
  },
  sponsorship: {
    title: "B. Sponsorship",
    buttonDescription: "Select your options and",
    buttonText: "Add to Cart",
    corporateSponsorshipTitle: "Corporate Sponsorship",
    options: {
      B: {
        B1: {
          title: "Platinum Sponsorship",
          price: "Rs 5,00,000",
          features: [
            "a. One 15-min Workshop or Presentation opportunity in the parallel programme.",
            "b. Company’s logo as Platinum Sponsor displayed at venue, website, Newsletters and Event Guide.",
            "c. One Full page advt in the print and digital Event Guide.",
            "d. Your company profile (full page) published in the Event Guide.",
            "e. Your full page searchable company profile published in the Defence Industry Directory (for MoD and Services HQ) on CD and in print. Copy will be provided to Sponsor.",
            "f. Video links of all Central Talks will be provided after the event.",
            "g. One Premium 12 sqm furnished exhibition booth.",
          ],
        },
        B2: {
          title: "Gold Sponsorship",
          price: "Rs 4,00,000",
          features: [
            "a. One 15-min Workshop or Presentation opportunity in the parallel programme.",
            "b. Company’s logo as Gold Sponsor, displayed at venue, website, Newsletters and Event Guide.",
            "c. One Full page advt in the print and digital Event Guide.",
            "d. Your company profile (half page) published in the Event Guide.",
            "e. Your full page searchable company profile published in the Defence Industry Directory (for MoD and Services HQ) on CD and in print. Copy will be provided to Sponsor.",
            "f. Video links of all Central Talks will be provided after the event.",
            "g. One Pride 6 sqm furnished exhibition booth.",
          ],
        },
        B3: {
          title: "Silver Sponsorship",
          price: "Rs 3,00,000",
          features: [
            "a. One 15-min Workshop or Presentation opportunity in the parallel programme.",
            "b. Company’s logo as Silver Sponsor displayed at venue, website, Newsletters and Event Guide.",
            "c. One Half page advt in the print and digital Event Guide.",
            "d. Your company profile (half page) published in the Event Guide.",
            "e. Your full page searchable company profile published in the Defence Industry Directory (for MoD and Services HQ) on CD and in print. Copy will be provided to Sponsor.",
            "f. Video links of all Central Talks will be provided after the event.",
            "g. One Eco 4 sqm furnished exhibition booth.",
          ],
        },
        B4: {
          title: "Strategic Association Sponsorship",
          price: "Rs 12,00,000",
          features: [
            "a. A1 Business Meeting Pack for 50 member companies of the Association (one participant each). Effective cost is Rs 24,000 each (ie 40% discount).",
            "b. Assn's logo as Strategic Assn Sponsor on Event Banners, in all marketing collaterals, event website, Newsletters and in the Event Guide.",
            "c. One full page advt in the print and digital Event Guide.",
            "d. Your Association profile (full page) published in the Event Guide.",
            "e. One presentation slot of 15-mins in Parallel Programme.",
            "f. One 3x2m furnished exhibition booth will be provided to the Assn.",
            "g. Your full page searchable company profile published in the Defence Industry Directory (for MoD and Services HQ) on CD and in print. Copy will be provided to you.",
          ],
        },
        B5: {
          title: "Innovation Association Sponsorship",
          price: "Rs 8,50,000",
          features: [
            "a. A1 Business Meeting Pack for 30 member companies of the Association (one participant each). Effective cost is Rs 28,000 each (ie 30% discount).",
            "b. Assn's logo as Innovation Assn Sponsor, on Event Banners, in all marketing collaterals, event website, Newsletters and in the Event Guide.",
            "c. One full page advt in the print and digital Event Guide.",
            "d. Your Association profile (full page) published in the Event Guide.",
            "e. One presentation slot of 15-mins in Parallel Programme.",
            "f. One Eco 4sqm furnished exhibition booth will be provided to the Assn.",
            "g. Your full page searchable company profile published in the Defence Industry Directory (for MoD and Services HQ) on CD and in print. Copy will be provided to you.",
          ],
        },
        B6: {
          title: "Technology Association Sponsorship",
          price: "Rs 6,50,000",
          features: [
            "a. A1 Business Meeting Pack for 20 member companies of the Association (one participant each). Effective cost is Rs 32,000 each (ie 20% discount).",
            "b. Assn's logo as Innovation Assn Sponsor, on Event Banners, in all marketing collaterals, event website, Newsletters and in the Event Guide.",
            "c. One half page advt in the print and digital Event Guide.",
            "d. Your Association profile (full page) published in the Event Guide.",
            "e. One presentation slot of 15-mins in Parallel Programme.",
            "f. One Eco 4sqm furnished exhibition booth will be provided to the Assn.",
            "g. Your full page searchable company profile published in the Defence Industry Directory (for MoD and Services HQ) on CD and in print. Copy will be provided to you.",
          ],
        },
      },
    },
    associationSponsorshipTitle: "Association Sponsorship",
  },
  exhibitingOptions: {
    buttonDescription: "Select your options and",
    buttonText: "Add to Cart",
    title: "C. Exhibiting Options",
    description:
      "Your own booth lets you meet your interlocutors at your own exhibition display booth.",
    options: {
      C: {
        C1: {
          title: "Eco Booth 4sqm",
          description: "Furnished and equipped octonorm booth (2X2 m)",
          price: "Rs. 70,000",
          features: [
            "a. Fascia Name, lights, round table, chairs, carpet, dustbin, electric socket provided.",
            "b. Your name is stamped on the map of the event showing location of your stand.",
            "c. Your B2B meetings requested by other participants can be held at your stand.",
          ],
        },
        C2: {
          title: "Pride Booth 6 sqm (For Gold Sponsors Only)",
          description: "Furnished and equipped octonorm booth (3X2 m)",
          price: "Rs 1,00,000",
          features: [
            "a. Your name is stamped on the map of the event showing location of your stand.",
            "b. Your B2B meetings requested by other participants can be held with the participants at your stand.",
            "c. One Casual Visitor Pass.",
            "d. Logo and Fascia name, two tables, 4 chairs, carpet, 3 lights, dustbin, electric outlet provided.",
          ],
        },
        C3: {
          title: "Premium Booth 12 sqm (For Platinum Sponsors Only)",
          description: "Furnished and equipped octonorm booth (4x3 m)",
          price: "Rs 1,40,000",
          features: [
            "a. Your name is stamped on the map of the event showing location of your stand.",
            "b. Your B2B meetings requested by other participants can be held with the participants at your stand.",
            "c. Two Casual Visitor Passes.",
            "d. Logo and Fascia name, two tables, 6 chairs, carpet, 6 lights, dustbin, magazine rack, electric outlet provided.",
          ],
        },
        C4: {
          title: "Additional furnishing ",
          description:
            "Available on hire for exhibition booths (transport, installation included)",
          features: [
            "Available items include Literature rack, tables, chairs, sofas, showcase, LCD with stand and Printed Flex banners to fully cover walls of your booth with frame.",
          ],
        },
      },
    },
  },
  brandingOptions: {
    buttonDescription: "Select your options and",
    buttonText: "Add to Cart",
    title: "D. Branding options",
    options: {
      D: {
        D1: {
          title: "Registration Sponsor",
          description: "(exclusive)",
          price: "Rs 1,00,000",
          features: [
            "a. Name and Logo of Sponsor displayed across all Regn counters",
            "b. Logo of Sponsor as Regn Sponsor on Stage, Event Guide, Venue Banners, Newsletters",
          ],
          para: "",
        },
        D2: {
          title: "Lanyard Sponsor",
          description: "(non-exclusive, up to 3)",
          price: "Rs 1,00,000",
          features: [
            "a. Logo of Sponsor on every Delegate Lanyard on both sides in colour.",
            "b. Logo of Sponsor as Lanyard Sponsor on Stage, Event Guide, Venue Banners, Newsletters",
          ],
          para: "",
          sold: true,
        },
        D3: {
          title: "Delegate Folders/Bags Sponsor",
          description: "(exclusive)",
          price: "Rs 2,00,000",
          features: [
            "a. Logo of Sponsor on each Delegate Folder/Bag.",
            "b. Logo of Sponsor as Delegate Folder Sponsor on Stage, Event Guide, Venue Banners, Newsletters",
          ],
          para: "",
        },
        D4: {
          title: "Name Badge Sponsor",
          description: "(non-exclusive, up to 3)",
          price: "Rs 80,000",
          features: [
            "a. Logo of Sponsor on each Delegate Badge",
            "b. Logo of Sponsor as Badge Sponsor on Stage, Event Guide, Venue Banners, Newsletters",
          ],
          para: "",
          sold: true,
        },
        D5: {
          title: "Lunch Sponsor Day 1",
          description: "(non-exclusive)",
          price: "Rs 1,25,000",
          features: [],
          para: "Banner outside Banquet Hall acknowledging sponsorship with logo. Logo of Sponsor as Lunch Sponsor on Stage, Event Guide, Venue Banners, Newsletters",
        },
        D6: {
          title: "Lunch Sponsor Day 2",
          description: "(non-exclusive)",
          price: "Rs 90,000",
          features: [],
          para: "Banner outside Banquet Hall acknowledging sponsorship with logo. Logo of Sponsor as Lunch Sponsor on Stage, Event Guide, Venue Banners, Newsletters.",
        },
        D7: {
          title: "Refreshments Sponsor Day 1",
          description: "(non-exclusive)",
          price: "Rs 80,000",
          features: [],
          para: "Banner outside Banquet Hall acknowledging sponsorship with logo. Logo of Sponsor as Refreshments Sponsor on Stage, Event Guide, Venue Banners, Newsletters.",
        },
        D8: {
          title: "Refreshments Sponsor Day 2",
          description: "(non-exclusive)",
          price: "Rs 60,000",
          features: [],
          para: "Banner outside Banquet Hall acknowledging sponsorship with logo. Logo of Sponsor as Refreshments Sponsor on Stage, Event Guide, Venue Banners, Newsletters.",
        },
      },
    },
  },
  communicationOptions: {
    title: "E. Communication options",
    buttonDescription: "Select your options and",
    buttonText: "Add to Cart",
    options: {
      E: {
        E1: {
          title: "Conduct a Workshop",
          description: "(15-min duration in parallel session)",
          price: "Rs 30,000",
          features: [
            "a. Topic and Presenter details will be included in the Event Guide, Website, Newsletter, Emails to participants and schedule displayed at Venue",
            "b. Schedule Committee will approve topic and schedule it on Day 1 or 2.",
            "c. Attendance is on voluntary basis.",
          ],
          para: "",
        },
        E2: {
          title: "Make a Presentation",
          description: "(15-min duration in parallel session)",
          price: "Rs 30,000",
          features: [
            "a. Publicity by Organisers through Event Guide, Website, Newsletter, Emails to participants.",
            "b. Organising Committee will decide on day, time slot and location.",
            "c. Attendance is on voluntary basis.",
          ],
          para: "",
        },
        E3: {
          title: "Newsletters Promo",
          price: "Rs 20,000",
          features: [
            "a. Company banner (300x300 px), 50 words and url link to 600 words online article in six direct-mail Event Newsletters to all participants.",
            "b. Article (up to 600 words and 2 images) can be hosted on IMR website.",
          ],
          para: "",
        },
        E4: {
          title: "Standee Banner Indoor",
          description: "(One 3x6 ft banner indoor display at the venue)",
          price: "Rs 10,000",
          features: [
            "a. Creative by customer. Production and installation by Organisers.",
          ],
          para: "",
        },
        E5: {
          title: "Large Standee Banner Outdoor",
          description: "(One 6x8 ft banner outdoor display at venue)",
          price: "Rs 25,000",
          features: [
            "a. Creative by customer. Production and installation by Organisers.",
          ],
          para: "",
        },
        E6: {
          title: "Literature Inserted in Delegate Bags",
          price: "Rs 25,000",
          features: [
            "a. One Brochure/ Literature (max 12 pp) or gift inserted in each Delegate Folder. (approx quantity 800).",
          ],
          para: "",
        },
        E7: {
          title: "Full Page Advertisement",
          description: "(running order) 213mm W x 277mm H Advt in Event Guide",
          price: "Rs. 30,000",
          features: ["", "", ""],
        },
        E8: {
          title: "Half Page Advertisement",
          description: "(Landscape) 124mm W x 194mm H Advt in Event Guide",
          price: "Rs. 20,000",
          features: ["", "", ""],
        },
        E9: {
          title: "Back Cover Advertisement",
          description: "213mm W x 277mm H Advt in Event Guide",
          price: "Rs. 80,000",
          features: ["", "", ""],
        },
        E10: {
          title: "Inside Front Cover Advertisement",
          description: "213mm W x 277mm H Advt in Event Guide",
          price: "Rs. 60,000",
          features: ["", "", ""],
        },
        E11: {
          title: "Inside Back Cover Advertisement",
          description: "213mm x 277mm Advt in Event Guide",
          price: "Rs. 50,000",
          features: ["", "", ""],
        },
      },
    },
    advertisementTitle: "Advertisement in the Event Guide.",
  },
  extraItems: {
    title: "F. Extra Items for Exhibition Stands on Hire/Order",
    buttonDescription: "Select your options and",
    buttonText: "Place Order",
    description:
      "A number of items are provided in each exhibition booth as part of the furnishings, like Tables, Chairs, Lights, Dustbin, Electric socket depending on the size of the booth. The following additional items can be ordered. These will be provided at your booth and include delivery, installation and removal charges for both days of the event inclusive.",
    options: {
      F: {
        F1: { title: "Magazine/Brochure rack", quantity: 1, price: 700 },
        F2: { title: "Table octonorm 42x22x30 in", quantity: 1, price: 500 },
        F3: {
          title: "Set of Round Table and 3 chairs",
          quantity: 1,
          price: 2500,
        },
        F4: { title: "Chairs, each", quantity: 1, price: 500 },
        F5: { title: "Sofa 1-seat", quantity: 1, price: 1000 },
        F6: { title: "Sofa 2-seat", quantity: 1, price: 1500 },
        F7: { title: "Showcase, each", quantity: 1, price: 2500 },
        F8: {
          title: "42-in LED with stand, with USB",
          quantity: 1,
          price: 2500,
        },
        F9: {
          title: "50-in LED with stand, with USB",
          quantity: 1,
          price: 3500,
        },
        F10: {
          title:
            "Printed Flex banners to cover 3 walls of 2x2m booth with frame - 156 sq ft @ Rs 65 p/sqft",
          quantity: 1,
          price: 10140,
        },
        F11: {
          title:
            "Printed Flex banners to cover 3 walls of 3x2m booth with frame - 180 sqft @ Rs 65 p/sqft",
          quantity: 1,
          price: 11700,
        },
        F12: {
          title:
            "Printed Flex banners to cover 3 walls of 6x2m booth with frame - 256 sqft @ Rs 65 p/sqft",
          quantity: 1,
          price: 16640,
        },
      },
    },
    totalDetails: [
      { label: "Total excluding GST", value: "Rs xxxxx.xx", id: 1 },
      { label: "GST 18%", value: "Rs xxxxx.xx", id: 2 },
      {
        label: "Total including GST",
        value: "Rs xxxxx.xx",
        id: 3,
        description: "GST 18% applicable in all cases (HSN Code 998596 )",
      },
    ],
    paymentTerms:
      "Payment Terms: 100% amount payable at the time of booking to confirm your selection.",
    refundRules: {
      title: "Refund Rules",
      rules: [
        "If any of the Business Meetings Packages (A1 to A6) are purchased and cancelled before 15 Aug, we will refund the whole amount after deducting Rs 2000 and 10% of the purchase amount. Thereafter, no refunds are possible for Business Meetings Packages.",
        "For all other options (Sponsorship, Exhibition, Branding, and Communications), refunds will be made up to 15 Sep 2024 after deducting 25% of the total cost of the bill. Thereafter, no refunds are possible, except in case the event is cancelled by the Organisers.",
      ],
    },
  },
  exampleItems: {
    exitem1: "Showcase (3 shown)",
    exitem2: "Wall flex banners of 2x2m booth",
    exitem3: "Wall flex banners of 3x2m booth",
  },
  bankDetails: {
    title: "Our Bank particulars",
    details: [
      { label: "Account Name:", value: " IMR Media Pvt Ltd" },
      { label: "Bank:", value: " Axis Bank" },
      { label: "IFSC Code:", value: "UTIB0003622" },
      {
        label: "Bank Branch:",
        value:
          " Sector 30, Star Mall, Gurgaon 122001",
      },
      { label: "Account No:", value: " 919020060114566" },
      { label: "SWIFT Code:", value: " AXISINBB" },
      { label: "Our GST No.", value: " 06AACCI7766G1ZD" },
    ],
  },
  fulfillingOrder: {
    title: "Fulfilling Your Orders",
    steps: [
      "Your Selection will show up as “Add-on” on your Profile Page Dashboard in the Members Area.",
      "Please fulfill the requirements of material, files, images, text, etc, required to be submitted by due date online.",
      "In case any material is required to be sent by email please send it to orders@defencepartners.in",
    ],
  },
};

export default pricelist;
