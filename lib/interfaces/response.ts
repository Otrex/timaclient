import type { Address, Bank, Country, Industry, User } from "./core";
import type { IRequest } from "./utils";

export interface CreateUser extends IRequest<{
  message: string;
  publicId: string;
}> { }

export interface BankDetailUpdate extends IRequest<{
  createdOn: null;
  publicId: string;
  bankName: string;
  currency: string;
  swiftCode: string;
  bankAddress: string;
  accountName: string;
  accountNumber: string;
}> { }

export interface SignIn extends IRequest<{
  scope: null;
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}> { }


export interface GetBankList extends IRequest<Bank[]> { }
export interface GetSignedURL extends IRequest<string> { }
export interface GetCountries extends IRequest<Country[]> { };
export interface GetIndustry extends IRequest<Industry[]> { }
export interface BrandBasicInformation extends IRequest<User> { };
export interface InfluencerCompleteProfile extends IRequest<User> { };
export interface BrandAddressDocumentation extends IRequest<Address> { };



