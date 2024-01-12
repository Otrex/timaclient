import type { Address, Authentication, Bank, Country, Industry, ProfileInfo, User } from "./core";
import type { IResponse } from "./utils";

export interface CreateUser extends IResponse<{
  message: string;
  publicId: string;
}> { }

export interface BankDetailUpdate extends IResponse<{
  createdOn: null;
  publicId: string;
  bankName: string;
  currency: string;
  swiftCode: string;
  bankAddress: string;
  accountName: string;
  accountNumber: string;
}> { }



export interface GetBankList extends IResponse<Bank[]> { }
export interface GetSignedURL extends IResponse<string> { }
export interface SignIn extends IResponse<Authentication> { }
export interface GetCountries extends IResponse<Country[]> { };
export interface GetIndustry extends IResponse<Industry[]> { }
export interface GetUserProfile extends IResponse<ProfileInfo> { };
export interface BrandBasicInformation extends IResponse<User> { };
export interface InfluencerCompleteProfile extends IResponse<User> { };
export interface BrandAddressDocumentation extends IResponse<Address> { };



