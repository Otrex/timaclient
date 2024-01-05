import type { Address, Country, Industry, User } from "./core";
import type { IRequest } from "./utils";

export interface CreateUser extends IRequest<{
  message: string;
  publicId: string;
}> { }
export interface SignIn extends IRequest<{
  scope: null;
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}> { }


export interface GetSignedURL extends IRequest<string> { }
export interface GetCountries extends IRequest<Country[]> { };
export interface GetIndustry extends IRequest<Industry[]> { }
export interface BrandBasicInformation extends IRequest<User> { };
export interface BrandAddressDocumentation extends IRequest<Address> { };



