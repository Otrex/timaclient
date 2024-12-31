import type { UserType } from "../enums";
import type * as Core from "./core";

export interface BrandProfileSetup {
  companyName: string, website: string
}

export interface CampaignApplication {
  campaign_id: string;
  influencer_id: string;
  status: "APPROVED" | "DECLINED" | "PENDING";
}

export interface GetInfluencerSubmissions {
  page: number;
  limit: number;
  [key: string]: any;
}


export interface SocialMediaAccount {
  platformName: string;
  userName: string;
}

export interface SocialMediaAccounts {
  socialMediaAccounts: SocialMediaAccount[];
}

export interface InfluencerProfileSetup {
  firstName: string
  lastName: string
  otherName: string
}

export interface CreateUser {
  userName: string;
  password: string;
  phoneNumber: string;
  emailAddress: string;
  role: UserType;
}

export interface ResolveBankPayload {
  accountNumber: string;
  bankCode: string;
}

export interface AddBankAccountDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
}

export interface CreateCampaign {
  banner: File;
  requestBody: Core.Campaign;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface BankAccountCreate {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
}




/// OLD

export interface UpdateAccountSetup {
  profile_image: File,
  document_upload: File[] | File,
  street: string;
  city: string;
  state: string;
  country: string;
  postCode?: string;
  language?: string
}

export interface DemographyInsight {
  socialMedia: string;
  influencerId: string;
  type: string;
}

export interface AddBookmark {
  title: string;
  bookmarkPublicId: string;
}

export interface CreateContract {
  influencerPublicId: string;
  campaignPublicId: string;
  influencerName: string;
  campaignName: string;
  brandName: string;
  contractAmount: number;
}

export interface AddInfluencerBookmark {
  title: string;
  bookmarkPublicId: string;
}

export interface ReviewApplication {
  status: string;
  applicationId: string;
}

export interface PasswordReset {
  email: string;
}

export interface CompletePasswordReset {
  password: string;
  publicId: string;
}

export interface CompletePasswordResetHeaders extends Record<string, string> {
  salt: string;
  hash: string;
}
export interface CreateApplication {
  campaignPublicId: string;
  collaboration: string;
  userExperience: string;
  userExperienceBrief: string;
  userMotivationBrief: string;
}

export interface ContentReview {
  campaign_id: string;
  content_id: string;
  status: "APPROVED" | "DECLINED" | "PENDING";
}


export interface GetNotifications {
  "page"?: number,
  "limit"?: number,
  "type": "NEWS" | "ACTIVITIES" | "ALERTS", //Optional NEWS/ACTIVITIES/ALERTS
  "days": 1 | 7 | 30 //1/7/30 optional
}

export interface Filter {
  page: number;
  size: number;
  sortIn: string;
  sortBy: string;
}

export interface UploadRequest {
  type: "docs" | "pics" | "thumb" | "settings";
  file: File;
}

export interface SignIn {
  user: string;
  password: string;
}


export interface Demographics {
  genderDistribution: {
    male: string | number;
    female: string | number;
  };
  ageDistribution: {
    "13-25": string | number;
    "26-40": string | number;
    "41-60": string | number;
    "60+": string | number;
  };
  audienceLocation: string[];
}








export interface ResendOTP {
  email: string;
  username: string;
}

export interface BrandBasicInformation {
  companyName: string;
  phoneNumber: string;
  website: string;
  email: string;
  publicId: string;
}

export interface BrandAddressDocumentation {
  publicId: string;
  pictureName: string;
  documentName: string;
  addressRecord: AddressRecord;
}

export interface UpdateBankInformation {
  bankName: string;
  bankAddress: string;
  currency: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
}

export interface UpdateAddress {
  addressRecord: AddressRecord;
}

export interface InfluencerBankDetails {
  publicId: string;
  bankName: string;
  bankAddress: string;
  currency: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
}

export interface AddressRecord {
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  language: string;
}

export interface InfluencerCompleteProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  publicId: string;
}

export interface VerifyOTP {
  otp: string;
}

export interface InfluencerPersonalProfile {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  publicId: string;
}

export interface NotificationSettings {
  campaignUpdateAlert: boolean;
  paymentUpdateAlert: boolean;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateBrandInformation {
  companyName: string;
  phoneNumber: string;
  website: string;
  email: string;
}


export interface GetCampaigns {
  limit?: number;
  page?: number;
  statusProgress?: "APPROVED" | "DECLINED" | "PENDING"
}

export interface SearchCampaignsInterval {
  campaignName: string;
  socialMediaPlatform: string[];
  audienceDemographics: string[];
  category: string[];
  page?: number;
  limit?: number;
}


export type GetBrandCampaigns = {
  name: string;
  page?: number;
  size?: number;
};

export interface SearchCampaigns {
  campaignName?: string;
  socialMediaPlatform?: string[];
  audienceDemographics?: string[];
  category?: string[];
  page?: number;
  limit?: number;
}



export interface ReviewUser {
  user_id: string;
  review: 'APPROVED' | 'DECLINED';
  reason?: string;
}


export interface BankInformation {
  bankDetails: {
    bankCode: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  platformPrices: Array<{
    platform: string;
    price: number;
  }>;
}
