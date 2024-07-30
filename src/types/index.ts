export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface MercuryCustomer {
  mercuryCompanyId: number;
  users: User[];
  tradeName: string;
  legalName: string;
  contactEmail: string;
  contactPhoneNumber: string;
}

export interface ThirdPartyLink {
  mercuryCompanyId: number;
  linkId: number;
  bank: string;
  names: string[];
  emails: string[];
  phoneNumbers: string[];
  mercuryFraudTeamComments: string;
}

export interface ComparisonResult {
  totalMatches: number;
  totalMismatches: number;
  results: { linkId: number; result: "Match" | "Mismatch" }[];
}
