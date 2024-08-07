import type { UserType } from "../enums";

export interface UserProfile {
  country: string
  website: string
  address: string
  profileSetupProgress: string
  city: string
  companyName: string
  profileImage: string
  userId: string
  createdAt: string
  referralCode: string
  hasSetTransactionPin: boolean
  id: string
  state: string
  updatedAt: string
}

export interface User {
  createdAt: string
  emailAddress: string
  phoneNumber: string
  role: string
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

export interface UserData {
  profile: UserProfile
  user: User
  accountWallet: AccountWallet
  token: string
}


// OLD

export type AgeGenderData = {
  ageRange: string;
  male: number;
  female: number;
  percentage: number;
};

export type ExploreInfluencerFilter = {
  size: string;
  ageGroup: string;
  location: string;
  gender: string;
  socialMedia: string;
  costPerPost: number;
}

export type SearchFilter = { page: number; size: number; sortIn: 'desc' | 'asc'; sortBy: string }

export type LocaleData = {
  name: string;
  percentage: number;
};

export interface Bank {
  name: string;
  slug: string;
  code: string;
  longCode: null | string;
  country: string;
  currency: string;
  type: string;
}


export interface Campaign {
  publicId: string;
  brandName: string,
  overview: Overview;
  influencer: Influencer;
  creative: Creative;
  status: number | null;
  createdOn: null;
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

export interface Country {
  name: string;
  language: string[];
  currency: string;
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

export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: UserType;
  companyName: string;
  website: string;
  language: null;
  profilePicture: string;
  registeredDocument: null;
  notificationSetting: string;
  userid: null;
  createdOn: Date;
  settingBackground?: string;
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
  contentType: string;
  contentPlacement: string;
  creativeBrief: string;
  rules: string;
  creativeTone: string;
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

