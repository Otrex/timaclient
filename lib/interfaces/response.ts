import * as Core from "./core";
import type { IResponse } from "./utils";

export interface CreateUser extends IResponse<{
  message: string;
  publicId: string;
}> { }

export interface GetCreativesOptions extends IResponse<{
  contentType: string[];
  contentPlacement: string[];
  creativeTone: string[];
  objectiveAwareness: string[];
  objectiveAcquisition: string[];
}[]> { }

export interface UpdateIndustries extends IResponse<{
  userPublicId: string;
  selectedIndustries: string[];
  createdOn: Date;
}> { }

export interface GetPaymentStats extends IResponse<{
  totalBudget: number;
  totalClientPaid: number;
  totalAmountPaid: number;
  totalBalance: number;
}> { }

export interface GetCampaignOptions extends IResponse<Core.CampaignOptions[]> { }
export interface GetPaymentMethods extends IResponse<Core.PaymentMethod[]> { }
export interface BankDetailUpdate extends IResponse<Core.BankDetails> { }
export interface GetCampaigns extends IResponse<Core.Campaign[]> { }
export interface GetCampaign extends IResponse<Core.Campaign> { }
export interface GetAddress extends IResponse<Core.Address> { }
export interface UpdatePassword extends IResponse<string> { }
export interface GetBankList extends IResponse<Core.Bank[]> { }
export interface GetSignedURL extends IResponse<string> { }
export interface GenericStringRes extends IResponse<string> { }
export interface SignIn extends IResponse<Core.Authentication> { }
export interface GetCountries extends IResponse<Core.Country[]> { };
export interface GetIndustry extends IResponse<Core.Industry[]> { }
export interface GetUserProfile extends IResponse<Core.ProfileInfo> { };
export interface BrandBasicInformation extends IResponse<Core.User> { };
export interface UpdateBrandInformation extends IResponse<Core.User> { };
export interface InfluencerCompleteProfile extends IResponse<Core.User> { };
export interface BrandAddressDocumentation extends IResponse<Core.Address> { };
export interface CreateApplication extends IResponse<Core.Application> { }
export interface GetApplication extends IResponse<Core.Application[]> { }


