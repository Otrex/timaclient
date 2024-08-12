import * as Core from "./core";
import type { IResponse } from "./utils";

export interface CreateUser extends IResponse<{
  user: Core.User
  token: string
}> { }

export interface Login
  extends IResponse<{
    accountWallet: Core.AccountWallet;
    profile: Core.UserProfile;
    user: Core.User;
    token: string;
  }> { }

export interface GetCreativesOptions
  extends IResponse<
    {
      contentType: string[];
      contentPlacement: string[];
      creativeTone: string[];
      objectiveAwareness: string[];
      objectiveAcquisition: string[];
    }[]
  > { }

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

export interface GetInfluencersBookmark extends IResponse<Core.InfluencerBookmark[]> { }
export interface GetSocialMediaInsight extends IResponse<Core.SocialMediaInsight> { }
export interface GetInfluencers extends IResponse<Core.Influencer[]> { }
export interface GetDemographicsData extends IResponse<Core.AgeDemographicsData[]> { }
export interface GetBookmarks extends IResponse<Core.FullCampaign[]> { }
export interface UpdateSocials extends IResponse<Core.UserSocial> { }
export interface GetSocialTypes extends IResponse<Core.SocialType[]> { }
export interface GetSignedURL extends IResponse<string> { }
export interface GetNotifications extends IResponse<Core.Notification[]> { }
export interface UpdatePassword extends IResponse<string> { }
export interface GetAddress extends IResponse<Core.Address> { }
export interface GetBankList extends IResponse<Core.Bank[]> { }
export interface GenericStringRes extends IResponse<string> { }
export interface GetDemographyInsights extends IResponse<Core.DemographyInsight[]> { }
export interface GetCampaign extends IResponse<Core.Campaign> { }
export interface GetPaymentStatus extends IResponse<string[]> { }
export interface SignIn extends IResponse<Core.Authentication> { }
export interface GetCountries extends IResponse<Core.Country[]> { };
export interface GetIndustry extends IResponse<string[]> { }
export interface GetCampaigns extends IResponse<Core.Campaign[]> { }
export interface BrandBasicInformation extends IResponse<Core.User> { };
export interface UpdateBrandInformation extends IResponse<Core.User> { };
export interface GetApplications extends IResponse<Core.Application[]> { };
export interface GetInfluencerPaymentStats extends IResponse<Core.InfluencerPaymentStats> { };
export interface GetApprovedInfluencers extends IResponse<Core.ApprovedCampaignInfluencer[]> { }
export interface GetApplication extends IResponse<Core.Application> { }
export interface GetSearchInfluencer extends IResponse<Core.SearchInfluencer> { }
export interface BankDetailUpdate extends IResponse<Core.BankDetails> { }
export interface CreateApplication extends IResponse<Core.Application> { }
export interface InfluencerCompleteProfile extends IResponse<Core.User> { };
export interface GetPaymentMethods extends IResponse<Core.PaymentMethod[]> { }
export interface BrandAddressDocumentation extends IResponse<Core.Address> { };
export interface GetCampaignOptions extends IResponse<Core.CampaignOptions[]> { }
export interface GetCampaignPayments extends IResponse<Core.CampaignTransaction[]> { }
export interface GetPaymentStatistics extends IResponse<Core.PaymentStatistics[]> { }
export interface GetInfluencerTransactions extends IResponse<Core.InfluencerTransaction[]> { }

export interface GetPaymentStats
  extends IResponse<{
    totalBudget: number;
    totalClientPaid: number;
    totalAmountPaid: number;
    totalBalance: number;
  }> { }

export interface GetInfluencersBookmark
  extends IResponse<Core.InfluencerBookmark[]> { }
export interface GetSocialMediaInsight
  extends IResponse<Core.SocialMediaInsight> { }
export interface GetInfluencers extends IResponse<Core.Influencer[]> { }
export interface GetDemographicsData
  extends IResponse<Core.AgeDemographicsData[]> { }
export interface GetBookmarks extends IResponse<Core.FullCampaign[]> { }
export interface UpdateSocials extends IResponse<Core.UserSocial> { }
export interface GetSocialTypes extends IResponse<Core.SocialType[]> { }
export interface GetSignedURL extends IResponse<string> { }
export interface GetNotifications extends IResponse<Core.Notification[]> { }
export interface UpdatePassword extends IResponse<string> { }
export interface GetAddress extends IResponse<Core.Address> { }
export interface GetBankList extends IResponse<Core.Bank[]> { }
export interface GenericStringRes extends IResponse<string> { }
export interface GetDemographyInsights
  extends IResponse<Core.DemographyInsight[]> { }
export interface GetCampaign extends IResponse<Core.Campaign> { }
export interface GetPaymentStatus extends IResponse<string[]> { }
export interface SignIn extends IResponse<Core.Authentication> { }
export interface GetCountries extends IResponse<Core.Country[]> { }
export interface GetIndustry extends IResponse<string[]> { }
export interface GetCampaigns extends IResponse<Core.Campaign[]> { }
export interface GetUserProfile extends IResponse<Core.UserProfile> { }
export interface BrandBasicInformation extends IResponse<Core.User> { }
export interface UpdateBrandInformation extends IResponse<Core.User> { }
export interface GetApplications extends IResponse<Core.Application[]> { }
export interface GetInfluencerPaymentStats
  extends IResponse<Core.InfluencerPaymentStats> { }
export interface GetApprovedInfluencers
  extends IResponse<Core.ApprovedCampaignInfluencer[]> { }
export interface GetApplication extends IResponse<Core.Application> { }
export interface GetSearchInfluencer extends IResponse<Core.SearchInfluencer> { }
export interface BankDetailUpdate extends IResponse<Core.BankDetails> { }
export interface CreateApplication extends IResponse<Core.Application> { }
export interface InfluencerCompleteProfile extends IResponse<Core.User> { }
export interface GetPaymentMethods extends IResponse<Core.PaymentMethod[]> { }
export interface BrandAddressDocumentation extends IResponse<Core.Address> { }
export interface GetCampaignOptions extends IResponse<Core.CampaignOptions[]> { }
export interface GetCampaignPayments
  extends IResponse<Core.CampaignTransaction[]> { }
export interface GetPaymentStatistics
  extends IResponse<Core.PaymentStatistics[]> { }
export interface GetInfluencerTransactions
  extends IResponse<Core.InfluencerTransaction[]> { }
