
import { UserType } from "~/lib/enums"
import type { Core, Payload, Response } from "../../interfaces"
import type { IResponse } from "../../interfaces/utils"
import { auth, mockBankList, mockCountries, mockIndustries, mockProfileInfo, mockUserIndustry } from "../mockdata"
import MockUploadAPI from "./upload"

const response = <T>(data: T, message = 'Success') => {
  return {
    status: true,
    message,
    data
  }
}

export default class MockTimaAPI extends MockUploadAPI {
  async refreshAuth(token: string = 'mock_token'): Promise<Response.SignIn> {
    return response(auth, "Authentication refreshed successfully")
  }

  async signIn(data: Payload.SignIn): Promise<Response.SignIn> {
    const res = prompt('which type of account do you want?', UserType.INFLUENCER)
    console.log({ res }, res?.toLowerCase().includes(UserType.INFLUENCER.toLowerCase()));

    localStorage.setItem('---userType', res?.toLowerCase().includes(UserType.INFLUENCER.toLowerCase()) ? UserType.INFLUENCER : UserType.BRAND)
    return response(auth)
  }

  async createUser(data: Payload.CreateUser): Promise<Response.CreateUser> {
    return { success: true, data: { message: "User created successfully" } }
  }

  async verifyOTP(data: Payload.VerifyOTP): Promise<Response.CreateUser> {
    return { success: true, data: { message: "OTP verified successfully" } }
  }

  async resendOTP(data: Payload.ResendOTP): Promise<Response.CreateUser> {
    return { success: true, data: { message: "OTP resent successfully" } }
  }

  async passwordReset(data: Payload.PasswordReset): Promise<Response.CreateUser> {
    return { success: true, data: { message: "Password reset initiated" } }
  }

  async completePasswordReset(
    data: Payload.CompletePasswordReset,
    headers: Payload.CompletePasswordResetHeaders
  ): Promise<Response.CreateUser> {
    return { success: true, data: { message: "Password reset completed" } }
  }

  async brandBasicInformationUpdate(
    data: Payload.BrandBasicInformation
  ): Promise<Response.BrandBasicInformation> {
    return { success: true, data: { message: "Brand information updated" } }
  }

  async brandAddressDocumentUpdate(
    data: Payload.BrandAddressDocumentation
  ): Promise<Response.BrandAddressDocumentation> {
    return { success: true, data: { message: "Brand address and documents updated" } }
  }

  async influencerCompleteProfileUpdate(
    data: Payload.InfluencerCompleteProfile
  ): Promise<Response.InfluencerCompleteProfile> {
    return { success: true, data: { message: "Influencer profile updated" } }
  }

  async getCampaignsOptions(): Promise<Response.GetCampaignOptions> {
    return { success: true, data: { options: [] } }
  }

  async brandIndustryUpdate(
    publicId: string,
    industries: string[]
  ): Promise<Response.GetIndustry> {
    return { success: true, data: { industries: [] } }
  }

  async influencerBankDetailsUpdate(
    data: Payload.InfluencerBankDetails
  ): Promise<Response.CreateUser> {
    return { success: true, data: { message: "Bank details updated" } }
  }

  async getCountries(): Promise<Response.GetCountries> {
    return response(mockCountries)
  }

  async getIndustries(): Promise<Response.GetIndustry> {
    return response(mockIndustries)
  }

  async getBanks(): Promise<Response.GetBankList> {
    return response(mockBankList)
  }

  async getUserIndustry(): Promise<IResponse<Core.UserIndustry>> {
    return response(mockUserIndustry[0])
  }

  async getCampaign(publicId: string): Promise<Response.GetCampaign> {
    return { success: true, data: {} as Core.Campaign }
  }

  async getCampaignMetrics(publicId: string): Promise<IResponse<Core.CampaignMetrics[]>> {
    return { success: true, data: [] }
  }

  async deleteCampaign(publicId: string): Promise<Response.GetCampaign> {
    return { success: true, data: {} as Core.Campaign }
  }

  async getCampaigns(payload: Payload.GetCampaigns): Promise<Response.GetCampaigns> {
    return { success: true, data: { campaigns: [], total: 0 } }
  }

  async getBrandCampaigns(payload: Payload.GetBrandCampaigns): Promise<Response.GetCampaigns> {
    return { success: true, data: { campaigns: [], total: 0 } }
  }

  async getUserProfile(): Promise<Response.GetUserProfile> {
    const userType = localStorage.getItem('---userType') as UserType
    return response(mockProfileInfo(userType))
  }

  async getAddress(): Promise<Response.GetAddress> {
    return { success: true, data: {} as Core.Address }
  }

  async getBankDetails(): Promise<Response.BankDetailUpdate> {
    return { success: true, data: {} as Core.BankDetail }
  }

  async getSocials(): Promise<Response.GetSocialTypes> {
    return { success: true, data: { socials: [] } }
  }

  async getCreativesOptions(): Promise<Response.GetCreativesOptions> {
    return { success: true, data: { options: [] } }
  }

  async getPaymentMethods(): Promise<Response.GetPaymentMethods> {
    return { success: true, data: { methods: [] } }
  }

  async getUserIndustries(publicId: string): Promise<Response.UpdateIndustries> {
    return { success: true, data: { industries: [] } }
  }

  async getPaymentStatus(): Promise<Response.GetPaymentStatus> {
    return { success: true, data: { statuses: [] } }
  }

  async getCampaignKPI(campaignId: string): Promise<IResponse<{ accounts: number, followers: number }>> {
    return { success: true, data: { accounts: 0, followers: 0 } }
  }

  async getCampaignInteractionSummary(campaignId: string): Promise<IResponse<Core.InteractionSummary>> {
    return { success: true, data: {} as Core.InteractionSummary }
  }

  async getCampaignDistribution(campaignId: string): Promise<IResponse<Core.CampaignDistribution>> {
    return { success: true, data: {} as Core.CampaignDistribution }
  }

  async getApplicantsByCampaign(
    campaignId: string,
    data: Partial<Payload.Filter> = {}
  ): Promise<Response.GetApplications> {
    return { success: true, data: { applications: [], total: 0 } }
  }

  async getCampaignApplicants(
    campaignId: string,
    data: Payload.Filter
  ): Promise<Response.GetApplications> {
    return { success: true, data: { applications: [], total: 0 } }
  }

  async getCampaignPendingApplications(
    status: string,
    data: Payload.Filter
  ): Promise<Response.GetApplications> {
    return { success: true, data: { applications: [], total: 0 } }
  }

  async getNotifications(data: Payload.Filter): Promise<Response.GetNotifications> {
    return { success: true, data: { notifications: [], total: 0 } }
  }

  async getDemographicsInsightById(
    publicId: string,
    socialMedia: string,
    data: { type: string }
  ): Promise<Response.GetDemographicsData> {
    return { success: true, data: {} as Core.DemographicsData }
  }

  async getSocialInsightById(publicId: string, socialMedia: string): Promise<Response.GetSocialMediaInsight> {
    return { success: true, data: {} as Core.SocialMediaInsight }
  }

  async getCampaignsByName(name: string, filter: Partial<Core.SearchFilter>): Promise<IResponse<Core.CampaignByName[]>> {
    return { success: true, data: [] }
  }

  async getCampaignApplicationsByStatus(
    data: Payload.Filter & {
      status: "PENDING" | "APPROVED"
      campaignId: string
    }
  ): Promise<Response.GetApplications | Response.GetApprovedInfluencers> {
    return { success: true, data: { applications: [], total: 0 } }
  }

  async getInfluencerPaymentStats(): Promise<Response.GetInfluencerPaymentStats> {
    return { success: true, data: {} as Core.InfluencerPaymentStats }
  }

  async getApplicationById(publicId: string): Promise<Response.GetApplication> {
    return { success: true, data: {} as Core.Application }
  }

  async getInfluencerById(publicId: string): Promise<Response.GetSearchInfluencer> {
    return { success: true, data: {} as Core.Influencer }
  }

  async getBookmarks(): Promise<IResponse<Core.InfluencerBookmark[]>> {
    return { success: true, data: [] }
  }

  async searchInfluencers(filter: Partial<Core.ExploreInfluencerFilter>): Promise<Response.GetApprovedInfluencers> {
    return { success: true, data: { influencers: [], total: 0 } }
  }

  async getDemographyInsights(data: Payload.DemographyInsight): Promise<Response.GetDemographyInsights> {
    return { success: true, data: {} as Core.DemographyInsights }
  }

  async addBookmark(data: Payload.AddBookmark): Promise<Response.GetBookmarks> {
    return { success: true, data: { bookmarks: [] } }
  }

  async bookmarkInfluencer(data: Payload.AddInfluencerBookmark): Promise<Response.GetBookmarks> {
    return { success: true, data: { bookmarks: [] } }
  }

  async deleteInfluencerBookmark(title: string): Promise<void> {
    // Mock implementation
  }

  async getBookmarkedInfluencers(): Promise<Response.GetApprovedInfluencers> {
    return { success: true, data: { influencers: [], total: 0 } }
  }

  async deleteBookmark(name: string): Promise<void> {
    // Mock implementation
  }

  async getPaymentStats(): Promise<Response.GetPaymentStats> {
    return { success: true, data: {} as Core.PaymentStats }
  }

  async getCampaignTransactions(): Promise<Response.GetCampaignPayments> {
    return { success: true, data: { transactions: [], total: 0 } }
  }

  async getInfluencerTransactions(): Promise<Response.GetInfluencerTransactions> {
    return { success: true, data: { transactions: [], total: 0 } }
  }

  async getInfluencerTransactionsByStatus(status: string): Promise<Response.GetInfluencerTransactions> {
    return { success: true, data: { transactions: [], total: 0 } }
  }

  async getPaymentStatistics(year?: string): Promise<Response.GetPaymentStatistics> {
    return { success: true, data: {} as Core.PaymentStatistics }
  }

  async getInfluencersByIntent(payload: any): Promise<Response.GetCampaignPayments> {
    return { success: true, data: { transactions: [], total: 0 } }
  }

  async getLatestInfluencers(): Promise<Response.GetInfluencers> {
    return { success: true, data: { influencers: [], total: 0 } }
  }

  async getTopInfluencers(data: Partial<Payload.Filter>): Promise<Response.GetInfluencers> {
    return { success: true, data: { influencers: [], total: 0 } }
  }

  async getTopCategories(): Promise<IResponse<string[]>> {
    return { success: true, data: [] }
  }

  async getInfluencersByCategory(category: string): Promise<Response.GetInfluencers> {
    return { success: true, data: { influencers: [], total: 0 } }
  }

  async getInfluencerCampaignExperience(data: Partial<Payload.Filter> & { influencerPublicId: string }): Promise<IResponse<Core.InfluencerCampaignExperience[]>> {
    return { success: true, data: [] }
  }

  async updatePersonalProfile(
    data: Payload.InfluencerPersonalProfile
  ): Promise<Response.InfluencerCompleteProfile> {
    return { success: true, data: { message: "Profile updated successfully" } }
  }

  async updateProfilePictures(fileName: string): Promise<Response.GetUserProfile> {
    return { success: true, data: {} as Core.User }
  }

  async updateCoverImage(fileName: string): Promise<Response.GetUserProfile> {
    return { success: true, data: {} as Core.User }
  }

  async updateSocialPlatforms(
    publicId: string,
    data: Payload.AddSocials
  ): Promise<Response.UpdateSocials> {
    return { success: true, data: { message: "Social platforms updated" } }
  }

  async updatePassword(data: Payload.UpdatePassword): Promise<Response.UpdatePassword> {
    return { success: true, data: { message: "Password updated successfully" } }
  }

  async updateBankDetails(data: Payload.UpdateBankInformation): Promise<Response.BankDetailUpdate> {
    return { success: true, data: {} as Core.BankDetail }
  }

  async updateAddress(data: Payload.UpdateAddress): Promise<Response.GetAddress> {
    return { success: true, data: {} as Core.Address }
  }

  async deactivateUser(): Promise<void> {
    // Mock implementation
  }

  async updateIndustries(data: string[]): Promise<Response.UpdateIndustries> {
    return { success: true, data: { industries: data } }
  }

  async updateInfluencerNotificationSetting(
    data: Payload.NotificationSettings
  ): Promise<Response.GenericStringRes> {
    return { success: true, data: { message: "Notification settings updated" } }
  }

  async updateBrandInformation(
    data: Payload.UpdateBrandInformation
  ): Promise<Response.UpdateBrandInformation> {
    return { success: true, data: { message: "Brand information updated" } }
  }

  async createCampaign(data: Payload.CreateCampaign): Promise<Response.GetCampaign> {
    return { success: true, data: {} as Core.Campaign }
  }

  async createApplication(data: Payload.CreateApplication): Promise<Response.CreateApplication> {
    return { success: true, data: { message: "Application created successfully" } }
  }

  async reviewApplication(data: Payload.ReviewApplication): Promise<Response.GetApplication> {
    return { success: true, data: {} as Core.Application }
  }

  async createContract(data: Payload.CreateContract): Promise<IResponse<Core.ApplicationContract>> {
    return { success: true, data: {} as Core.ApplicationContract }
  }
}
