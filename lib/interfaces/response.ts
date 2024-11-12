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


export interface GetOverviewStats {
  influencerStats: {
    inReview: number;
    total: number;
    verified: number;
    registered: number;
  };
  brandStats: {
    inReview: number;
    total: number;
    verified: number;
    registered: number;
  };
  message: string;
  statusCode: number;
}

export type GetAdminUsersResponse<T = 'INFLUENCER' | 'BRAND'> = T extends 'INFLUENCER' ? GetInfluencerUsersResponse : GetBrandUsersResponse

export interface GetInfluencerUsersResponse {
  totalUsers: number;
  data: Array<{
    emailAddress: string;
    phoneNumber: string;
    role: string;
    profile: {
      createdAt: string;
      profileSetupProgress: string;
      referralCode: string;
      hasSetTransactionPin: boolean;
      id: string;
      userId: string;
      updatedAt: string;
      country?: string;
      address?: string;
      city?: string;
      profileImage?: string;
      transactionPIN?: string;
      industries?: string[];
      firstName?: string;
      lastName?: string;
      otherName?: string;
      state?: string;
    };
    id: string;
    userName: string;
  }>;
  limit: number;
  page: number;
  message: string;
  statusCode: number;
}

export interface GetBrandUsersResponse {
  totalUsers: number;
  data: Array<{
    emailAddress: string;
    phoneNumber: string;
    role: string;
    profile: {
      country?: string;
      website?: string;
      address?: string;
      city?: string;
      profileSetupProgress: string;
      companyName?: string;
      profileImage?: string;
      userId: string;
      createdAt: string;
      industries?: string[];
      referralCode: string;
      hasSetTransactionPin: boolean;
      id: string;
      state?: string;
      updatedAt: string;
    };
    id: string;
    userName: string;
  }>;
  limit: number;
  page: number;
  message: string;
  statusCode: number;
}





export interface GetCampaignsResponse extends IResponse<{
  total: number;
  data: Array<{
    audienceLocation: string[];
    campaignAbout: string;
    campaignWebsite: string;
    endDate: string;
    contentPlacement: string[];
    campaignObjectiveAwareness: string;
    creativeBrief: string;
    campaignObjectiveAcquisition: string;
    referenceLink: string;
    audienceAgeGroup: string[];
    createdAt: string;
    contentType: string[];
    campaign_id: string;
    updatedAt: string;
    campaignObjective: string;
    influencerID: string[];
    planningBudget: string;
    audienceSize: string[];
    campaignRule: string;
    banner: string;
    socialMediaPlatform: string[];
    user_id: string;
    audienceGender: string[];
    viewType: boolean;
    creativeTone: string;
    category: string[];
    campaignName: string;
    startDate: string;
  }>;
  limit: number;
  page: number;
  message: string;
  statusCode: number;
}> { }


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


export interface GetAdminCampaignDetails {
  data: Array<{
    campaignObjective: string;
    audienceLocation: string[];
    campaignAbout: string;
    audienceSize: string[];
    endDate: string;
    contentPlacement: string[];
    campaignRule: string;
    campaignObjectiveAwareness: string[];
    creativeBrief: string;
    campaignObjectiveAcquisition: string[];
    banner: string;
    referenceLink: string;
    audienceAgeGroup: string[];
    socialMediaPlatform: string[];
    statusProgress: string;
    user_id: string;
    audienceGender: string[];
    creativeTone: string;
    category: string[];
    campaignName: string;
    contentType: string[];
    campaign_id: string;
    startDate: string;
  }>;
  limit: number;
  page: number;
  message: string;
  totalCount: number;
  statusCode: number;
}

export interface GetBrandInfluencer {
  totalUsers: number;
  data: Array<{
    emailAddress: string;
    phoneNumber: string;
    role: string;
    profile: {
      country: string;
      lastName: string;
      address: string;
      city: string;
      profileSetupProgress: string;
      profileImage: string;
      transactionPIN?: string;
      userId: string;
      firstName: string;
      createdAt: string;
      referralCode: string;
      industries: string[];
      hasSetTransactionPin: boolean;
      otherName: string;
      id: string;
      state: string;
      updatedAt: string;
    };
    id: string;
    userName: string;
  }>;
  limit: number;
  page: number;
  message: string;
  statusCode: number;
}


export interface GetInfluencerCampaignsResponse {
  data: Array<{
    audienceLocation: string[];
    campaignAbout: string;
    endDate: string;
    contentPlacement: string[];
    campaignObjectiveAwareness: string[];
    companyName: string;
    creativeBrief: string;
    campaignObjectiveAcquisition: string[];
    referenceLink: string;
    audienceAgeGroup: string[];
    statusProgress: string;
    contentType: string[];
    campaign_id: string;
    campaignObjective: string;
    website: string;
    audienceSize: string[];
    campaignRule: string;
    banner: string;
    socialMediaPlatform: string[];
    user_id: string;
    audienceGender: string[];
    creativeTone: string;
    category: string[];
    campaignName: string;
    startDate: string;
  }>;
  limit: number;
  page: number;
  message: string;
  totalCount: number;
  statusCode: number;
}


export interface GetInfluencerApplicationsResponse {
  data: Array<{
    influencer_id: string;
    applicationStatus: string;
    application_id: string;
    user: {
      role: string;
      email: string;
      username: string;
    };
    campaign_id: string;
    appliedAt: string;
    userProfile: {
      firstName: string;
      lastName: string;
      profilePicture: string;
      country: string;
      industries: string[];
      otherName: string;
    };
  }>;
  message: string;
  statusCode: number;
}


export interface GetInfluencerProfileResponse {
  data: {
    country: string;
    lastName: string;
    socialMediaAccounts: {
      userName: string;
      platformName: string;
      data?: {
        avgLikes: number;
        followers: number;
        avgEngagement: number;
      };
    }[]
    role: string;
    city: string;
    profileImage: string;
    userName: string;
    firstName: string;
    emailAddress: string;
    phoneNumber: string;
    street: string;
    industries: string[];
    otherName: string;
    id: string;
    state: string;
  };
  message: string;
  statusCode: number;
}
