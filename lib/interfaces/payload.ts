
import type { UserType } from "../enums";
import type * as Core from "./core";

export interface CreateUser {
  username: string;
  password: string;
  email: string;
  userType: UserType;
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


export interface UploadRequest {
  type: "docs" | "pics" | "thumb";
  file: File,
}

export interface SignIn {
  username: string;
  password: string;
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
  newPassword: string
}

export interface UpdateBrandInformation {
  companyName: string;
  phoneNumber: string;
  website: string;
  email: string;
}


export type CreateCampaign = Omit<Core.Campaign, 'publicId' | 'status' | 'createdOn'>;

export type GetCampaigns = {
  type: 'filter',
  category: string;
  size: string;
  age: `${string} - ${string}`;
  location: string;
} | {
  type: 'recommendation'
} | {
  type: 'top'
}

export type GetBrandCampaigns = {
  name: string;
  page?: number;
  size?: number;
}
