import type { UserType } from "../enums";

export interface Bank {
  name: string;
  slug: string;
  code: string;
  longCode: null | string;
  country: string;
  currency: string;
  type: string;
}


export interface Campaign {
  publicId: string;
  brandName: string,
  overview: Overview;
  influencer: Influencer;
  creative: Creative;
  status: null;
  createdOn: null;
}


export interface PaymentMethod {
  name: string;
  type: string;
  createdOn?: Date;
}


export interface NotificationSetting {
  campaignUpdateAlert: boolean;
  emailAlert: boolean;
  paymentUpdateAlert: boolean;
}


export interface Industry {
  name: string;
  description: string;
}

export interface Country {
  name: string;
  language: string[];
  currency: string;
}
export interface Authentication {
  scope: null;
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface Application {
  applicationId: string;
  campaignPublicId: string;
  campaignName: string;
  campaignBudget: number;
  campaignDescription: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  socialMediaPlatform: string[];
  collaboration: string;
  userExperience: string;
  userExperienceBrief: string;
  userMotivationBrief: string;
  status: string;
  applicationDate: Date;
  approvedBy: null;
  submittedBy: string;
  reviewedBy: null;
  createdOn: Date;
  editedOn: Date;
}


export interface Address {
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  createdOn: Date;
}

export interface CampaignOptions {
  size: string[];
  gender: string[];
  ageGroup: string[];
  location: string[];
  monthlyIncome: string[];
}

export interface CampaignTransaction {
  transactionDate: Date;
  reference: string;
  amount: number;
  balance: number;
  status: string;
  publicId: string;
  type: string;
  name: string;
}

export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: UserType;
  companyName: string;
  website: string;
  language: null;
  profilePicture: string;
  registeredDocument: null;
  notificationSetting: string;
  userid: null;
  createdOn: Date;
}

export interface ProfileInfo {
  username: string;
  publicId: string;
  profile: User;
}


export interface Creative {
  paymentType: string;
  startDate: Date | string;
  endDate: string;
  contentType: string;
  contentPlacement: string;
  creativeBrief: string;
  rules: string;
  creativeTone: string;
  referenceLink: string;
  awarenessObjective: string[];
  acquisitionObjective: string[];
  thumbnail: string;
  visibility: boolean;
}

export interface BankDetails {
  createdOn: null;
  publicId: string;
  bankName: string;
  currency: string;
  swiftCode: string;
  bankAddress: string;
  accountName: string;
  accountNumber: string;
}

export interface Influencer {
  influencerCategory: string[];
  audienceSize: string[];
  audienceGender: string[];
  audienceAgeGroup: string[];
  audienceLocation: string[];
}

export interface Overview {
  name: string;
  briefDescription: string;
  website: string;
  plannedBudget: number;
  costPerPost: number;
  socialMediaPlatforms: string[];
}

