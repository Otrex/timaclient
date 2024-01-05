import type { UserType } from "../enums";

export interface CreateUser {
  username: string;
  password: string;
  email: string;
  userType: UserType;
}

export interface PasswordReset {
  email: string;
}

export interface UploadRequest {
  type: "docs" | "pics";
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

export interface AddressRecord {
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
}


export interface VerifyOTP {
  otp: string;
}


