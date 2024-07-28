import { UserType } from "~/lib/enums";
import type { Core, Payload, Response } from "../../interfaces";
import type { IResponse } from "../../interfaces/utils";
import {
  auth,
  generateMockAddress,
  generateMockSocialMediaInsight,
  generateMockAgeDemographicsData,
  generateMockApplications,
  generateMockApplicationsData,
  generateMockApprovedInfluencersData,
  generateMockBankDetails,
  generateMockCampaignDistribution,
  generateMockCampaignMetrics,
  generateMockCampaignOptions,
  generateMockCampaignsByName,
  generateMockCampaignStrategies,
  generateMockInfluencerBookmarks,
  generateMockInteractionSummary,
  generateMockNotification,
  generateMockPaymentStatsData,
  generateMockSearchInfluencer,
  generateRandomIndustries,
  generateRandomPaymentMethods,
  generateRandomSocialTypes,
  mockBankList,
  mockCampaign,
  mockCountries,
  mockProfileInfo,
  mockUserIndustry,
  generateMockDemographyInsight,
  generateMockFullCampaign,
  generateMockCampaignTransactions,
  generateMockInfluencerTransactions,
  generateMockPaymentStatistics,
  generateMockCampaignData,
  generateMockInfluencerByLatest,
  generateMockTopCategories,
  generateMockInfluencerCampaignExperience
} from "../mockdata"
import MockUploadAPI from "./upload"


const response = <T>(data: T, message = "Success") => {
  return new Promise<IResponse<T>>((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
        message,
        data
      })
    }, Math.ceil(Math.random() * 1500))
  })
}

export default class MockTimaAPI extends MockUploadAPI {
  async refreshAuth(token: string = "mock_token"): Promise<Response.SignIn> {
    return response(auth, "Authentication refreshed successfully");
  }

  async signIn(data: Payload.SignIn): Promise<Response.SignIn> {
    const res = prompt(
      "which type of account do you want?",
      UserType.INFLUENCER
    );
    localStorage.setItem(
      "---userType",
      res?.toLowerCase().includes(UserType.INFLUENCER.toLowerCase())
        ? UserType.INFLUENCER
        : UserType.BRAND
    );
    return response(auth);
  }

  async createUser(data: Payload.CreateUser): Promise<Response.CreateUser> {
    return response({
      message: "User created successfully",
      publicId: "mock_public_id",
    });
  }

  async verifyOTP(data: Payload.VerifyOTP): Promise<Response.CreateUser> {
    return response({
      message: "OTP verified successfully",
      publicId: "mock_public_id",
    });
  }

  async resendOTP(data: Payload.ResendOTP): Promise<Response.CreateUser> {
    return response({
      message: "OTP resent successfully",
      publicId: "mock_public_id",
    });
  }

  async passwordReset(
    data: Payload.PasswordReset
  ): Promise<Response.CreateUser> {
    return response({
      message: "Password reset initiated",
      publicId: "mock_public_id",
    });
  }

  async completePasswordReset(
    data: Payload.CompletePasswordReset,
    headers: Payload.CompletePasswordResetHeaders
  ): Promise<Response.CreateUser> {
    return response({
      message: "Password reset completed",
      publicId: "mock_public_id",
    });
  }

  async brandBasicInformationUpdate(
    data: Payload.BrandBasicInformation
  ): Promise<Response.BrandBasicInformation> {
    return response(mockProfileInfo(UserType.BRAND).profile, "Brand basic information updated")
  }

  async brandAddressDocumentUpdate(
    data: Payload.BrandAddressDocumentation
  ): Promise<Response.BrandAddressDocumentation> {
    return response(generateMockAddress(), "Brand address document updated")
  }

  async influencerCompleteProfileUpdate(
    data: Payload.InfluencerCompleteProfile
  ): Promise<Response.InfluencerCompleteProfile> {
    const profileData = mockProfileInfo(UserType.INFLUENCER).profile;
    return response(profileData);
  }

  async getCampaignsOptions(): Promise<Response.GetCampaignOptions> {
    return response([generateMockCampaignOptions()]);
  }

  async brandIndustryUpdate(
    publicId: string,
    industries: string[]
  ): Promise<Response.GetIndustry> {
    return response(generateRandomIndustries(15));
  }

  async influencerBankDetailsUpdate(
    data: Payload.InfluencerBankDetails
  ): Promise<Response.CreateUser> {
    return response({
      message: "Bank details updated",
      publicId: "mock_public_id",
    });
  }

  async getCountries(): Promise<Response.GetCountries> {
    return response(mockCountries);
  }

  async getIndustries(): Promise<Response.GetIndustry> {
    return response(generateRandomIndustries(20));
  }

  async getBanks(): Promise<Response.GetBankList> {
    return response(mockBankList);
  }

  async getUserIndustry(): Promise<IResponse<Core.UserIndustry>> {
    return response(mockUserIndustry[0]);
  }

  async getCampaign(publicId: string): Promise<Response.GetCampaign> {
    return response(mockCampaign(0));
  }

  async getCampaignMetrics(
    publicId: string
  ): Promise<IResponse<Core.CampaignMetrics[]>> {
    return response(generateMockCampaignMetrics(10));
  }

  async deleteCampaign(publicId: string): Promise<Response.GetCampaign> {
    return response(mockCampaign(0));
  }

  async getCampaigns(
    payload: Payload.GetCampaigns
  ): Promise<Response.GetCampaigns> {
    return response(new Array(3).fill(0).map((e) => mockCampaign(e)));
  }

  async getBrandCampaigns(
    payload: Payload.GetBrandCampaigns
  ): Promise<Response.GetCampaigns> {
    return response(new Array(10).fill(0).map((e, i) => mockCampaign(i + 1)));
  }

  async getUserProfile(): Promise<Response.GetUserProfile> {
    return response(
      mockProfileInfo(localStorage.getItem("---userType") as UserType)
    );
  }

  async getAddress(): Promise<Response.GetAddress> {
    return response(generateMockAddress());
  }

  async getBankDetails(): Promise<Response.BankDetailUpdate> {
    return response(generateMockBankDetails());
  }

  async getSocials(): Promise<Response.GetSocialTypes> {
    return response(generateRandomSocialTypes(7));
  }

  async getCreativesOptions(): Promise<Response.GetCreativesOptions> {
    return response([generateMockCampaignStrategies()]);
  }

  async getPaymentMethods(): Promise<Response.GetPaymentMethods> {
    return response(generateRandomPaymentMethods(10));
  }

  async getUserIndustries(
    publicId: string
  ): Promise<Response.UpdateIndustries> {
    return response({
      userPublicId: "xxxxxxx",
      selectedIndustries: [],
      createdOn: new Date(),
    });
  }

  async getPaymentStatus(): Promise<Response.GetPaymentStatus> {
    return response(["pending", "paid", "failed", "cancelled"]);
  }

  async getCampaignKPI(
    campaignId: string
  ): Promise<IResponse<{ accounts: number; followers: number }>> {
    return response({ accounts: 100, followers: 1000 });
  }

  async getCampaignInteractionSummary(
    campaignId: string
  ): Promise<IResponse<Core.InteractionSummary>> {
    return response(generateMockInteractionSummary());
  }

  async getCampaignDistribution(
    campaignId: string
  ): Promise<IResponse<Core.CampaignDistribution>> {
    return response(generateMockCampaignDistribution());
  }

  async getApplicantsByCampaign(
    campaignId: string,
    data: Partial<Payload.Filter> = {}
  ): Promise<Response.GetApplications> {
    return response(generateMockApplications(10));
  }

  async getCampaignApplicants(
    campaignId: string,
    data: Payload.Filter
  ): Promise<Response.GetApplications> {
    return response(generateMockApplications(20));
  }

  async getCampaignPendingApplications(
    status: string,
    data: Payload.Filter
  ): Promise<Response.GetApplications> {
    return response(generateMockApplications(10));
  }

  async getNotifications(
    data: Payload.Filter
  ): Promise<Response.GetNotifications> {
    return response(
      new Array(10).fill(0).map(() => generateMockNotification())
    );
  }

  async getDemographicsInsightById(
    publicId: string,
    socialMedia: string,
    data: { type: string }
  ): Promise<Response.GetDemographicsData> {
    return response(generateMockAgeDemographicsData(2));
  }

  async getSocialInsightById(
    publicId: string,
    socialMedia: string
  ): Promise<Response.GetSocialMediaInsight> {
    return response(generateMockSocialMediaInsight());
  }

  async getCampaignsByName(
    name: string,
    filter: Partial<Core.SearchFilter>
  ): Promise<IResponse<Core.CampaignByName[]>> {
    return response(generateMockCampaignsByName(10));
  }

  async getCampaignApplicationsByStatus(
    data: Payload.Filter & {
      status: "PENDING" | "APPROVED";
      campaignId: string;
    }
  ): Promise<Response.GetApplications | Response.GetApprovedInfluencers> {
    return data.status === "PENDING"
      ? response(generateMockApplicationsData(10))
      : response(generateMockApprovedInfluencersData(10));
  }

  async getInfluencerPaymentStats(): Promise<Response.GetInfluencerPaymentStats> {
    return response({
      totalTransactions: Math.ceil(Math.random() * 1000),
      completedTransactions: Math.ceil(Math.random() * 10),
      pendingTransactions: Math.ceil(Math.random() * 100),
    });
  }

  async getApplicationById(publicId: string): Promise<Response.GetApplication> {
    return response(generateMockApplications(1)[0]);
  }

  async getInfluencerById(
    publicId: string
  ): Promise<Response.GetSearchInfluencer> {
    return response(generateMockSearchInfluencer(10)[2]);
  }

  async getBookmarks(): Promise<IResponse<Core.InfluencerBookmark[]>> {
    return response(generateMockInfluencerBookmarks(5));
  }

  async searchInfluencers(
    filter: Partial<Core.ExploreInfluencerFilter>
  ): Promise<Response.GetApprovedInfluencers> {
    return response(generateMockApprovedInfluencersData(10));
  }

  async getDemographyInsights(
    data: Payload.DemographyInsight
  ): Promise<Response.GetDemographyInsights> {
    return response(
      new Array(10).fill(0).map((e) => generateMockDemographyInsight())
    );
  }

  async addBookmark(data: Payload.AddBookmark): Promise<Response.GetBookmarks> {
    return response(
      new Array(10).fill(0).map((e) => generateMockFullCampaign())
    );
  }

  async bookmarkInfluencer(data: Payload.AddInfluencerBookmark): Promise<Response.GetBookmarks> {
    return response(new Array(10).fill(0).map(e => generateMockFullCampaign()))
  }

  async deleteInfluencerBookmark(title: string): Promise<void> {
    // Mock implementation
  }

  async getBookmarkedInfluencers(): Promise<Response.GetApprovedInfluencers> {
    return response(generateMockApprovedInfluencersData(10))
  }

  async deleteBookmark(name: string): Promise<void> {
    // Mock implementation
  }

  async getPaymentStats(): Promise<Response.GetPaymentStats> {
    return response(generateMockPaymentStatsData());
  }

  async getCampaignTransactions(): Promise<Response.GetCampaignPayments> {
    return response(generateMockCampaignTransactions())
  }

  async getInfluencerTransactions(): Promise<Response.GetInfluencerTransactions> {
    return response(generateMockInfluencerTransactions(5))
  }

  async getInfluencerTransactionsByStatus(status: string): Promise<Response.GetInfluencerTransactions> {
    return response(generateMockInfluencerTransactions(5, status))
  }

  async getPaymentStatistics(year?: string): Promise<Response.GetPaymentStatistics> {
    return response(generateMockPaymentStatistics(12))
  }

  async getInfluencersByIntent(payload: any): Promise<Response.GetCampaignPayments> {
    return response(generateMockCampaignTransactions())
  }

  async getLatestInfluencers(): Promise<Response.GetInfluencers> {
    return response(generateMockInfluencerByLatest(10));
  }

  async getTopInfluencers(
    data: Partial<Payload.Filter>
  ): Promise<Response.GetInfluencers> {
    return response(generateMockInfluencerByLatest(10));
  }

  async getTopCategories(): Promise<IResponse<string[]>> {
    return response(generateMockTopCategories(5))
  }

  async getInfluencersByCategory(
    category: string
  ): Promise<Response.GetInfluencers> {
    return response(generateMockInfluencerByLatest(10));
  }

  async getInfluencerCampaignExperience(
    data: Partial<Payload.Filter> & { influencerPublicId: string }
  ): Promise<IResponse<Core.InfluencerCampaignExperience[]>> {
    return response(generateMockInfluencerCampaignExperience(10));
  }

  async updatePersonalProfile(
    data: Payload.InfluencerPersonalProfile
  ): Promise<Response.InfluencerCompleteProfile> {
    return response(mockProfileInfo(UserType.INFLUENCER).profile);
  }

  async updateProfilePictures(
    fileName: string
  ): Promise<Response.GetUserProfile> {
    return response({
      username: 'user001',
      publicId: 'xxxxxxxx',
      profile: mockProfileInfo(localStorage.getItem("---userType") as UserType).profile
    })
  }

  async updateCoverImage(fileName: string): Promise<Response.GetUserProfile> {
    return response({
      username: 'user001',
      publicId: 'xxxxxxxx',
      profile: mockProfileInfo(localStorage.getItem("---userType") as UserType).profile
    })
  }

  async updateSocialPlatforms(
    publicId: string,
    data: Payload.AddSocials
  ): Promise<Response.UpdateSocials> {
    return { success: true, data: { message: "Social platforms updated" } };
  }

  async updatePassword(
    data: Payload.UpdatePassword
  ): Promise<Response.UpdatePassword> {
    return {
      success: true,
      data: { message: "Password updated successfully" },
    };
  }

  async updateBankDetails(
    data: Payload.UpdateBankInformation
  ): Promise<Response.BankDetailUpdate> {
    return { success: true, data: {} as Core.BankDetail };
  }

  async updateAddress(
    data: Payload.UpdateAddress
  ): Promise<Response.GetAddress> {
    return { success: true, data: {} as Core.Address };
  }

  async deactivateUser(): Promise<void> {
    // Mock implementation
  }

  async updateIndustries(data: string[]): Promise<Response.UpdateIndustries> {
    return { success: true, data: { industries: data } };
  }

  async updateInfluencerNotificationSetting(
    data: Payload.NotificationSettings
  ): Promise<Response.GenericStringRes> {
    return {
      success: true,
      data: { message: "Notification settings updated" },
    };
  }

  async updateBrandInformation(
    data: Payload.UpdateBrandInformation
  ): Promise<Response.UpdateBrandInformation> {
    return { success: true, data: { message: "Brand information updated" } };
  }

  async createCampaign(
    data: Payload.CreateCampaign
  ): Promise<Response.GetCampaign> {
    return response(generateMockCampaignData(1)[0]);
  }

  async createApplication(
    data: Payload.CreateApplication
  ): Promise<Response.CreateApplication> {
    return response(generateMockApplicationsData(1)[0]);
  }

  async reviewApplication(
    data: Payload.ReviewApplication
  ): Promise<Response.GetApplication> {
    return response(generateMockApplicationsData(1)[0]);
  }

  async createContract(
    data: Payload.CreateContract
  ): Promise<IResponse<Core.ApplicationContract>> {
    return response({
      influencerPublicId: "influencer123",
      campaignPublicId: "campaign456",
      influencerName: "John Doe",
      campaignName: "Summer Campaign",
      brandName: "BrandXYZ",
      contractAmount: 5000,
      balance: 5000,
      status: "active",
      contractId: Math.random().toString(36).substr(2, 9),
      createdOn: new Date(),
    });
  }
}
