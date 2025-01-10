import type { ProfileSetupState, UserType } from "../enums";

export interface UserProfile {
  country: string
  emailAddress: string
  website: string
  role: UserType
  profileSetupProgress: ProfileSetupState
  city: string
  documents: {
    documentType: string
    documentUrl: string
  }[]
  address: string,
  hasVerifiedPhone: boolean
  companyName: string
  profileImage: string
  banner?: string
  hasVerifiedEmail: boolean
  userName: string
  phoneNumber: string
  street: string
  industries: string[]
  socialMediaAccounts?: {
    platformName: string
    userName: string
  }[]
  referralCode: string
  hasSetTransactionPIN: boolean
  id: string
  state: string
}

export interface User {
  createdAt: string
  emailAddress: string
  phoneNumber: string
  firstName?: string
  lastName?: string
  role: UserType
  user_id: string
  hasVerifiedPhone: boolean
  invited: boolean
  hasVerifiedEmail: boolean
  userName: string
  updatedAt: string
}

export interface AccountWallet {
  createdAt: string
  wallet_id: string
  wallet: number
  userId: string
  updatedAt: string
}

export interface UserReviewResponse {
  data: {
    emailAddress: string;
    phoneNumber: string;
    role: UserType;
    profile: {
      country: string;
      lastName?: string;
      address: string;
      profileSetupProgress: ProfileSetupState;
      city: string;
      profileImage: string;
      transactionPIN?: string;
      userId: string;
      createdAt: string;
      firstName?: string;
      industries: string[];
      referralCode: string;
      hasSetTransactionPin: boolean;
      otherName?: string;
      id: string;
      state: string;
      updatedAt: string;
      website?: string;
      companyName?: string;
    };
    id: string;
    userName: string;
  }[];
  limit: number;
  page: number;
  message: string;
  statusCode: number;
  totalUsers: number
}

export interface Campaign {
  invitees: any[] /// Delete later
  createdAt?: string;
  campaign_id?: string;
  companyName?: string;
  campaignName: string;
  applicationStatus?: string;
  campaignObjective: string;
  campaignAbout: string;
  campaignWebsite: string;
  planningBudget: string;
  socialMediaPlatform: string[];
  category: string[];
  audienceSize: string[];
  audienceGender: string[];
  audienceAgeGroup: string[];
  audienceLocation: string[];
  influencerID: string[];
  startDate: string;
  endDate: string;
  contentType: string[];
  contentPlacement: string[];
  creativeBrief: string;
  campaignRule: string;
  creativeTone: string[] | string;
  referenceLink: string;
  campaignObjectiveAwareness: string[] | string;
  campaignObjectiveAcquisition: string[] | string;
  banner: string | File;
  viewType: boolean;
  statusProgress: string;
}



// OLD

export type AgeGenderData = {
  ageRange: string;
  male: number;
  female: number;
  percentage: number;
};

export type ExploreInfluencerFilter = {
  // size: string;
  // ageGroup: string;
  // location: string;
  // gender: string;
  // socialMedia: string;
  // costPerPost: number;

  name: string;
  socialMediaPlatform: string[];
  audienceDemographics: string[];
  category: string[];

}

export type SearchFilter = { page: number; size: number; sortIn: 'desc' | 'asc'; sortBy: string }

export type LocaleData = {
  name: string;
  percentage: number;
};


export interface IPlan {
  name: string;
  description: string;
  currency: string;
  yearlyPrice: number;
  monthlyPrice: number;
  features: string[];
  countries: string[];
}


export interface AccountResolution {
  account_number: string;
  bank_id: number;
  account_name: string;
};


export interface Bank {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  country: string;
  currency: string;
  type: string;
  pay_with_bank: boolean;
  active: boolean;
  supports_transfer: boolean;
  createdAt: string;
  is_deleted: boolean;
  id: number;
  gateway: string;
  updatedAt: string;
}

export interface CampaignMetrics {
  total_value: {
    value: number;
  };
  id: string;
  name: string;
  period: string;
  title: string;
  description: string;
}



export interface PaymentMethod {
  name: string;
  type: string;
  createdOn?: Date;
}

export interface CampaignByName {
  campaignId: string;
  name: string;
  banner: string;
  description: string;
}



export interface NotificationSetting {
  campaignUpdateAlert: boolean;
  emailAlert: boolean;
  paymentUpdateAlert: boolean;
}

export interface Industry {
  name: string;
  description: string;
}

// export interface Industry {
//   name: string;
//   description: string;
// }

export interface Country {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
}
export interface Authentication {
  scope: null;
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface DemographyInsight {
  name: string;
  value1?: number;
  value2?: number;
  value3?: number;
}
export interface SocialMediaInsight {
  businessOwnerIgId: string;
  businessIgId: string;
  businessHandle: string;
  businessName: string;
  biography: string;
  website: string;
  followers: number;
  totalMedia: number;
  totalComments: number;
  totalLikes: number;
  avgEngagement: number;
}

export interface InfluencerBookmark {
  publicId: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

export interface SearchInfluencer {
  publicId: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  completed: number;
}

export interface InfluencerPaymentStats {
  totalTransactions: number;
  completedTransactions: number;
  pendingTransactions: number;
}

export interface InteractionSummary {
  engagement: number;
  reach: number;
  impressions: number;
  likes: number;
  comments: number;
  shared: number;
}

export interface CampaignDistribution {
  audienceDistributionSummary: AudienceDistributionSummary;
  audienceDistributionGraph: AudienceDistributionGraph;
}

export interface ApprovedCampaignInfluencer {
  applicationId: string;
  userName: string;
  profilePicture: string;
  socialMediaPlatforms: string[];
  applicationDate: Date | string;
  insight: Insight;
  userPublicId: string;
}

export interface Insight {
  businessOwnerIgId: string;
  businessIgId: string;
  businessHandle: string;
  businessName: string;
  biography: string;
  website: string;
  profilePictureUrl: string;
  followers: number;
  totalMedia: number;
  totalComments: number;
  totalLikes: number;
  avgEngagement: number;
}


export interface AudienceDistributionGraph {
  ageRange: AgeRange[];
  genderPie: AgeRange[];
  country: AgeRange[];
}

export interface AgeRange {
  name: string;
  value: number;
}
export interface ApplicationContract {
  influencerPublicId: string;
  campaignPublicId: string;
  contractId: string;
  influencerName: string;
  campaignName: string;
  brandName: string;
  contractAmount: number;
  balance: number;
  status: string;
  createdOn: Date;
}


export interface AudienceDistributionSummary {
  topCountry: string;
  topCity: string;
  topGender: string;
  topAge: string;
}


export interface MonthData {
  name: string;
  index: number;
  legends: Legend[];
  legend: Legend;
}

export interface GroupedData {
  [key: string]: MonthData[];
}

export interface DataSet {
  label: string;
  data: number[];
  backgroundColor: string;
  borderWidth: number;
}



export interface Application {
  applicationId: string;
  campaignPublicId: string;
  campaignName: string;
  campaignBudget: number;
  campaignDescription: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  socialMediaPlatforms: string[];
  collaboration: string;
  userExperience: string;
  userExperienceBrief: string;
  userMotivationBrief: string;
  status: string;
  applicationDate: Date;
  approvedBy: null;
  submittedBy: string;
  reviewedBy: null;
  createdOn: Date;
  editedOn: Date;
}


export interface Address {
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  createdOn: Date;
}

export interface CampaignOptions {
  size: string[];
  gender: string[];
  ageGroup: string[];
  location: string[];
  monthlyIncome: string[];
}

export interface SocialType {
  name: string;
  logo: string;
}


export interface Notification {
  title: string;
  message: string;
  type: string;
  status: string;
  createdOn: Date;
}

export interface InfluencerBookmark {
  id: string;
  campaignRecord: CampaignRecord;
}

export interface CampaignRecord {
  publicId: string;
  brandName: string;
  overview: Overview;
  influencer: Influencer;
  creative: Creative;
  status: number;
  createdBy: string;
  createdOn: Date;
}

export interface Influencer {
  influencerCategory: string[];
  audienceSize: string[];
  audienceGender: string[];
  audienceAgeGroup: string[];
  audienceLocation: string[];
}

export interface Overview {
  name: string;
  briefDescription: string;
  website: string;
  plannedBudget: number;
  costPerPost: number;
  socialMediaPlatforms: string[];
}



export interface CampaignTransaction {
  transactionDate: Date;
  reference: string;
  amount: number;
  balance: number;
  status: string;
  publicId: string;
  type: string;
  name: string;
}

export interface PaymentStatistics {
  name: string;
  index: number;
  legends: Legend[];
}

export interface Legend {
  title: string;
  value: number;
}

export interface InfluencerTransaction {
  publicId: string;
  campaignName: string;
  brandName: string;
  earning: number;
  balance: number;
  status: string;
  transactionDate: Date;
  createdOn: string | Date | null;
  campaignImage?: string;
}

export interface ProfileInfo {
  username: string;
  publicId: string;
  profile: User;
}

export interface UserSocial {
  name: string;
  handle: string;
  businessId: string;
  logo: string;
  expiresIn: number;
}
export interface AgeDemographicsData {
  name: string;
  value1?: number;
  value2?: number;
  value3?: number;
}

export interface Influencer {
  publicId: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

export interface InfluencerCampaignExperience {
  campaignName: string;
  campaignId: string;
  campaignBanner: string;
  startDate: Date | string;
  endDate: Date | string;
}


export interface FullCampaign {
  publicId: string;
  brandName: string;
  overview: Overview;
  influencer: Influencer;
  creative: Creative;
  status: number;
  createdBy: string;
  createdOn: Date;
}

export interface Creative {
  paymentType: string;
  startDate: Date | string;
  endDate: string;
  contentType: string[];
  contentPlacement: string[];
  creativeBrief: string;
  rules: string;
  creativeTone: string[];
  referenceLink: string;
  awarenessObjective: string[];
  acquisitionObjective: string[];
  thumbnail: string;
  visibility: boolean;
}

export interface BankDetails {
  createdOn: null;
  publicId: string;
  bankName: string;
  currency: string;
  swiftCode: string;
  bankAddress: string;
  accountName: string;
  accountNumber: string;
}

export interface Influencer {
  statusProgress: string;
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
    userId: string;
    createdAt: string;
    firstName: string;
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
  paymentInformation: Record<string, never>;
}

export interface Overview {
  name: string;
  briefDescription: string;
  website: string;
  plannedBudget: number;
  costPerPost: number;
  socialMediaPlatforms: string[];
}

