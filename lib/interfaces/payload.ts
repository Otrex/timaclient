import type { UserType } from "../enums";

export interface CreateUser {
  username: string;
  password: string;
  email: string;
  userType: UserType;
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

export interface VerifyOTP {
  otp: string;
}


