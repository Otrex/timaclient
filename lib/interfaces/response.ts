import * as Core from "./core";
import type { IResponse } from "./utils";

export interface CreateUser extends IResponse<{
  user: Core.User
  token: string
}> { }

export interface GetCalendarEvents { }
export interface GetWalletStats extends IResponse<{
  data: {
    totalTransactions: number;
    totalPendingPayments: number;
    balance: number;
    totalCompletedPayments: number;
  };
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
    statusProgress?: string;
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
      socialMediaAccounts: any[];
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

export interface GetInfluencerApplicationsWithCampaignResponse {
  data: Array<{
    influencer_id: string;
    applicationStatus: string;
    campaign: {
      campaignObjective: string;
      audienceLocation: string[];
      campaignAbout: string;
      planningBudget: string;
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
      statusProgress: string;
      socialMediaPlatform: string[];
      user_id: string;
      audienceGender: string[];
      creativeTone: string;
      category: string[];
      campaignName: string;
      contentType: string[];
      campaign_id: string;
      startDate: string;
    };
    application_id: string;
    campaign_id: string;
    appliedAt: string;
  }>;
  message: string;
  statusCode: number;
}


export interface InstagramSocialPost {
  Views: number | null;
  Comments: number;
  Hashtags: string[];
  Duration: number | null;
  City: string | null;
  Likes: number;
  "Media Type": string;
  Shares: number | null;
  Date: string;
  Caption: string;
  Location: string | null;
}

export interface TiktokSocialPost {
  comment_count: number;
  share_count: number;
  duration: number;
  like_count: number;
  video_url: string;
  hashtags: string[];
  description: string;
  play_count: number;
  publish_date: number;
  video_id: string;
}

export interface InstagramSocialInfo {
  Category: string | null;
  Email: string | null;
  "Average Comments": number;
  "Estimated Reach": number;
  "Full Name": string;
  "Profile Url": string;
  "Average Views": number;
  Verified: boolean;
  "Average Likes": number;
  "Igtv Videos": number;
  Biography: string;
  "Engagement Rate": number;
  "Account Type": number;
  "Account ID": string;
  "Link in Bio": string;
  Following: number;
  Posts: number;
  "Total Comments": number;
  "Total Shares": number;
  Followers: number;
  "Average Shares": number;
  "Total Views": number;
  "Total Likes": number;
  Username: string;
  "Profile Pic": string;
}

export interface TiktokSocialInfo {
  unique_id: string;
  avatar_url: string;
  user_id: string;
  signature: string;
  following_count: number;
  engagement_metrics: {
    total_comments: number;
    average_views_per_video: number;
    average_shares_per_video: number;
    average_comments_per_video: number;
    total_views: number;
    engagement_rate: number;
    total_likes: number;
    estimated_reach: number;
    total_shares: number;
    average_likes_per_video: number;
    estimated_impressions: number;
  };
  nickname: string;
  verified: boolean;
  total_hearts: number;
  total_videos: number;
  follower_count: number;
}
export interface GetInfluencerProfileResponse {
  data: {
    totalCompletedCampaigns: number;
    country: string;
    lastName: string;
    audienceDemographics?: any,
    socialMediaAccounts: {
      userName: string;
      platformName: string;
      data?: {
        avgLikes: number;
        followers: number;
        avgEngagement: number;
      };
    }[];
    paymentInformation?: {
      bankDetails: {
        bankCode: string,
        accountName: string,
        bankName: string,
        accountNumber: string
      },
      paymentMethod: "PAYSTACK" | "FLUTTERWAVE",
      platformPrices: { price: number, platform: string }[]
    }
    role: string;
    city: string;
    socialPost?: {
      data: InstagramSocialPost[] | { posts: TiktokSocialPost[] } | TwitterSocialPost[];
      platform: string;
    }[];
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
    socialInfo?: {
      data: InstagramSocialInfo | TiktokSocialInfo | TwitterSocialInfo;
      platform: string;
    }[];
  };
  message: string;
  statusCode: number;
}

export interface TwitterSocialPost {
  Retweets: number;
  Bookmarks: number;
  Language: string;
  Comments: number;
  Media?: {
    photo?: {
      sizes: {
        w: number;
        h: number;
      };
      media_url_https: string;
      id: string;
    }[];
  };
  Quotes: number;
  Date: string;
  Caption: string;
  Favorites: number;
}

export interface TwitterSocialInfo {
  "Average Quotes": number;
  "Average Comments": number;
  "Estimated Reach": number;
  Following: number;
  "Total Comments": number;
  Followers: number;
  Name: string;
  "Total Likes": number;
  "Average Likes": number;
  user_id: string;
  Username: string;
  "Profile Image": string;
  "Engagement Rate": number;
  "Total Retweets": number;
  "Average Retweets": number;
  "Total Quotes": number;
}

export interface GetWithdrawalBanksResponse {
  data: {
    bankCode: string;
    accountName: string;
    bankName: string;
    id: string;
    accountNumber: string;
  }[];
  message: string;
  statusCode: number;
}

export interface GetSearchCampaignsResponse {
  data: {
    statusProgress: string;
    audienceDemographics: string[];
    socialMediaPlatform: string[];
    category: string[];
    campaignName: string;
    campaign_id: string;
  }[];
  totalCampaigns: number;
  limit: number;
  page: number;
  message: string;
  statusCode: number;
}

export interface GetTopCategoriesResponse {
  data: {
    count: number;
    category: string;
  }[];
  totalCategories: number;
  message: string;
  statusCode: number;
}


export interface AdminCampaignResponse {
  data: {
    campaignObjective: string;
    audienceLocation: string[];
    campaignAbout: string;
    website: string;
    audienceSize: string[];
    endDate: string;
    contentPlacement: string[];
    campaignRule: string;
    campaignObjectiveAwareness: string[];
    companyName: string;
    creativeBrief: string;
    campaignObjectiveAcquisition: string[];
    banner: string;
    referenceLink: string;
    audienceAgeGroup: string[];
    socialMediaPlatform: string[];
    user_id: string;
    audienceGender: string[];
    creativeTone: string;
    category: string[];
    campaignName: string;
    contentType: string[];
    campaign_id: string;
    startDate: string;
  };
  message: string;
  statusCode: number;
}


export interface GetNotificationSettingsResponse {
  data: {
    paymentNotification: boolean;
    campaignUpdates: boolean;
  };
  message: string;
  statusCode: number;
}


export interface CreateBookmarkResponse {
  "data": {
    "bookmark_id": string,
    "influencer_id": string,
    "campaign_id": string
  },
  "message": "Bookmark saved successfully",
  "statusCode": 200
}

export interface GetInfluencerContentApplicationsResponse {
  data: {
    opened?: boolean;
    influencer_id: string;
    content_link: string;
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
  }[];
  message: string;
  statusCode: number;
}

export interface GetInfluencersResponse {
  data: {
    country: string;
    createdAt: string;
    emailAddress: string;
    socialMediaAccounts: {
      platformName?: string;
      userName?: string;
    }[];
    user_id: string;
    industries: string[];
    profileImage: string;
    userName: string;
    updatedAt: string;
    firstName?: string;
    lastName?: string;
  }[];
  limit: number;
  totalInfluencers: number;
  page: number;
  message: string;
  statusCode: number;
}


export interface GetBrandOverviewStatsResponse {
  data: {
    approved: number;
    declined: number;
    all_contents: number;
    pending: number;
    completed: number;
    all_campaigns: number;
  };
  message: string;
  statusCode: number;
}
export interface BankResponse {
  country: string;
  code: string;
  pay_with_bank: boolean;
  longcode: string;
  active: boolean;
  type: string;
  supports_transfer: boolean;
  createdAt: string;
  is_deleted: boolean;
  name: string;
  currency: string;
  id: number;
  slug: string;
  gateway: string;
  updatedAt: string;
}


export interface GetBankList {
  data: BankResponse[];
  message: string;
  statusCode: number;
}


export interface GetPlansResponse {
  data: {
    locationEnabled: boolean;
    features: string[];
    defaultPrice: {
      monthlyPrice: number;
      yearlyPrice: number;
      currency: string;
    };
    referralBonus: string;
    active: boolean;
    planName: string;
    id: string;
    locationBasedPricing: {
      EU: {
        monthlyPrice: number;
        yearlyPrice: number;
        currency: string;
      };
      US: {
        monthlyPrice: number;
        yearlyPrice: number;
        currency: string;
      };
    };
  }[];
  totalPages: number;
  limit: number;
  totalPlans: number;
  message: string;
  currentPage: number;
  statusCode: number;
}


export interface PaymentAuthorizationResponse {
  data: {
    reference: string;
    authorization_url: string;
    access_code: string;
  };
  message: string;
  status: boolean;
}

export interface GetTransactionsResponse {
  data: {
    transaction_id: string;
    createdAt: string;
    amount: number;
    transactionReference: string;
    description: string;
    type: string;
    transaction_type: string;
    userId: string;
    status: string;
  }[];
  message: string;
  statusCode: number;
}

export interface GetInfluencerSubmissions {
  data: {
    pagination: {
      totalItems: number
      totalPages: number
      pageSize: number
      currentPage: number
    }
    contents: {
      influencer_id: string
      createdAt: string
      contentLink: string
      campaignInfo: {
        audienceLocation: string[]
        campaignAbout: string
        endDate: string
        contentPlacement: string[]
        campaignObjectiveAwareness: string[]
        companyName: string
        creativeBrief: string
        campaignObjectiveAcquisition: string[]
        referenceLink: string
        audienceAgeGroup: string[]
        statusProgress: string
        applicationStatus: string
        contentType: string[]
        campaign_id: string
        campaignObjective: string
        website: string
        planningBudget: string
        audienceSize: string[]
        campaignRule: string
        banner: string
        socialMediaPlatform: string[]
        user_id: string
        audienceGender: string[]
        creativeTone: string
        category: string[]
        campaignName: string
        startDate: string
      }
      id: string
      campaign_id: string
      contentStatus: string
      updatedAt: string
    }[]
  }
  message: string
  statusCode: number
}


export interface ICreateCampaign {
  data: {
    audienceLocation: string[],
    "campaignAbout": string,
    "endDate": string | Date,
    "contentPlacement": string[],
    "campaignObjectiveAwareness": string[],
    "companyName": string,
    "creativeBrief": string,
    "campaignObjectiveAcquisition": string[],
    "referenceLink": string,
    "audienceAgeGroup": string,
    "contentType": string[],
    "campaign_id": string,
    "campaignObjective": string,
    "website": "www.bennyj.com",
    "planningBudget": "1000",
    "audienceSize": [
      "Nano+ (5000 - 9,999)"
    ],
    "campaignRule": "- Do not peek",
    "banner": "https://tima-service.nyc3.digitaloceanspaces.com/campaign_banner_image/5f25cfca-f5f8-4b21-bcb0-44a8f3437ba8_illustration-john-light-0061869a.png",
    "socialMediaPlatform": [
      "instagram",
      "tiktok"
    ],
    "user_id": "670cf8761e75392dee1d8dee",
    "audienceGender": [
      "Male"
    ],
    "creativeTone": "[\"Funny\"]",
    "category": [
      "Business & Entrepreneurship",
      "Finance"
    ],
    "campaignName": "Best Man",
    "startDate": "2025-01-15"
  },
  "message": "Campaign created successfully",
  "statusCode": 200
}