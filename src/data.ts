export const MERCURY_USERS = [
  {
    mercuryCompanyId: 1,
    users: [
      { firstName: "John", lastName: "Smith", email: "john@example.com" },
    ],
    tradeName: "InfoLinks",
    legalName: "InfoLinks Technologies, Inc.",
    contactEmail: "contact@infolinks.com",
    contactPhoneNumber: "5557609870",
  },
  {
    mercuryCompanyId: 2,
    users: [
      {
        firstName: "Emmanuel",
        lastName: "Windal",
        email: "biker76@example.fr",
      },
    ],
    tradeName: "Bikes by Emmanuel",
    legalName: "Sports Inc.",
    contactEmail: "biker76@example.fr",
    contactPhoneNumber: "5550989870",
  },
  {
    mercuryCompanyId: 3,
    users: [{ firstName: "Ram", lastName: "Nguyen", email: "ram@example.com" }],
    tradeName: "Ram's Kitchen",
    legalName: "Ram's Kitchen",
    contactEmail: "ram@example.fr",
    contactPhoneNumber: "5550989532",
  },
  {
    mercuryCompanyId: 4,
    users: [
      { firstName: "Cyril", lastName: "Windhorst", email: "cy@example.com" },
    ],
    tradeName: "Cy's Megacorp",
    legalName: "Cy's Megacorp LLC.",
    contactEmail: "cy@example.com",
    contactPhoneNumber: "5550109988",
  },
  {
    mercuryCompanyId: 5,
    users: [
      { firstName: "Lassad", lastName: "Riviero", email: "lassad@hey.com" },
    ],
    tradeName: "Lassad's Music",
    legalName: "LASSAD MEDIA INC",
    contactEmail: "lassad@example.com",
    contactPhoneNumber: "9915554035",
  },
];

export const THIRD_PARTY_LINKS = [
  {
    mercuryCompanyId: 1,
    linkId: 1,
    bank: "Chase",
    names: ["John B. Smith", "InfoLinks Technologies"],
    emails: ["john@example.com", "alice@example.com"],
    phoneNumbers: ["(555)-760-9870"],
    mercuryFraudTeamComments:
      "The name, company name, and phone numbers match. Looks good!",
  },
  {
    mercuryCompanyId: 1,
    linkId: 2,
    bank: "Wells Fargo",
    names: [],
    emails: ["james@example.com"],
    phoneNumbers: ["(555)-760-9870"],
    mercuryFraudTeamComments:
      "The phone number matches, but there's no other connection. Going to call the customer to ask about this.",
  },
  {
    mercuryCompanyId: 2,
    linkId: 3,
    bank: "Capital One",
    names: ["Emmanuel Francisco Windal"],
    emails: [],
    phoneNumbers: ["555 098 9870"],
    mercuryFraudTeamComments: "User's name and phone matches, good to go.",
  },
  {
    mercuryCompanyId: 2,
    linkId: 4,
    bank: "Chase",
    names: ["Ullyses S. Strahd"],
    emails: ["strahd@example.com"],
    phoneNumbers: [],
    mercuryFraudTeamComments: "I don't see any connection. Possible fraud?",
  },
  {
    mercuryCompanyId: 3,
    linkId: 5,
    bank: "Wells Fargo",
    names: ["Rams Kitchen"],
    emails: ["ram@example.fr"],
    phoneNumbers: [],
    mercuryFraudTeamComments:
      "The business name matches, user's matches the business name, and the email matches. ",
  },
  {
    mercuryCompanyId: 4,
    linkId: 6,
    bank: "Chase",
    names: ["Cy J. Windhorst"],
    emails: ["cy1776@example.com"],
    phoneNumbers: [],
    mercuryFraudTeamComments:
      "Cy is short for Cyril, and the last names match, so that's probably good.",
  },
  {
    mercuryCompanyId: 4,
    linkId: 7,
    bank: "Huntington",
    names: ["Mr. Cyril Windhorst"],
    emails: [],
    phoneNumbers: ["5550109988"],
    mercuryFraudTeamComments: "Direct name match and phone match.",
  },
  {
    mercuryCompanyId: 4,
    linkId: 8,
    bank: "Cheyenne Bank and Trust",
    names: ["Cyril", "James Smith"],
    emails: [],
    phoneNumbers: ["555-010-9988"],
    mercuryFraudTeamComments:
      "The phone numbers match, and the first name of Cyril matches. Probably good.",
  },
  {
    mercuryCompanyId: 5,
    linkId: 9,
    bank: "Capital One",
    names: ["IN MEDIA RES PUBLISHING", "Jerry Galdwell"],
    emails: ["jerry@example.com"],
    phoneNumbers: ["555-132-0911"],
    mercuryFraudTeamComments:
      "This doesn't seem to match at all. Possible fraud?",
  },
];
