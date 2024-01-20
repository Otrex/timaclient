import type {
  Address, Authentication,
  Bank, BankDetails, Country,
  Creative, Industry, Influencer,
  Overview, ProfileInfo, User
} from "./core";
import type { IResponse } from "./utils";

export interface CreateUser extends IResponse<{
  message: string;
  publicId: string;
}> { }

export interface BankDetailUpdate extends IResponse<BankDetails> { }

export interface GetCampaigns extends IResponse<{
  publicId: string;
  overview: Overview;
  influencer: Influencer;
  creative: Creative;
  status: null;
  createdOn: null;
}[]> { }

export interface GetCampaign extends IResponse<{
  publicId: string;
  overview: Overview;
  influencer: Influencer;
  creative: Creative;
  status: null;
  createdOn: null;
}> { }

export interface UpdateIndustries extends IResponse<{
  userPublicId: string;
  selectedIndustries: string[];
  createdOn: Date;
}> { }


export interface GetAddress extends IResponse<Address> { }
export interface UpdatePassword extends IResponse<string> { }
export interface GetBankList extends IResponse<Bank[]> { }
export interface GetSignedURL extends IResponse<string> { }
export interface GenericStringRes extends IResponse<string> { }
export interface SignIn extends IResponse<Authentication> { }
export interface GetCountries extends IResponse<Country[]> { };
export interface GetIndustry extends IResponse<Industry[]> { }
export interface GetUserProfile extends IResponse<ProfileInfo> { };
export interface BrandBasicInformation extends IResponse<User> { };
export interface InfluencerCompleteProfile extends IResponse<User> { };
export interface UpdateBrandInformation extends IResponse<User> { };
export interface BrandAddressDocumentation extends IResponse<Address> { };



