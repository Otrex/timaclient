import type { Core, Payload, Response } from "../interfaces";
import type { InfluencerProfileSetup } from "../interfaces/payload";
import type { GetAdminUsersResponse, GetCampaignsResponse, GetInfluencerApplicationsResponse, GetInfluencerCampaignsResponse, GetOverviewStats } from "../interfaces/response";
import type { IResponse } from "../interfaces/utils";
import SocialsAPI from "./socials";
import UploadAPI from "./upload";

const defaultFilter = {
  page: 0,
  size: 5,
  sortIn: "desc",
  sortBy: "createdOn",
};

export default class TimaAPI extends UploadAPI {
  socials: SocialsAPI;

  constructor() {
    super();

    this.socials = new SocialsAPI(this)
  }

  async refreshAuth(token: string) {
    return this.request<Response.SignIn>({
      url: "/user/v1/login/reconnect",
      method: "POST",
      headers: {
        "REFRESH-TOKEN": btoa(token),
      },
    });
  }

  async signIn(data: Payload.SignIn) {
    return this.request<Response.Login>({
      url: `/auth/login`,
      method: "POST",
      data,
    });
  }

  async verifyUsername(username: string) {
    return this.request<{ message: string; statusCode: number }>({
      url: `/auth/check-username?userName=${username}`,
      method: "GET",
    });
  }

  async createUser(data: Payload.CreateUser) {
    return this.request<Response.CreateUser>({
      url: "/auth/register",
      method: "POST",
      data,
    });
  }

  async verifyOTP(data: Payload.VerifyOTP) {
    return this.request<Response.CreateUser>({
      url: `/users/verify-email`,
      requireAuth: true,
      method: "POST",
      data,
    });
  }

  async verifyPasswordReset(data: { emailAddress: string, otp: string }) {
    return this.request<Response.CreateUser>({
      url: `/auth/validate-forgot-password`,
      method: "POST",
      data
    });
  }

  async resetNewPassword(data: { emailAddress: string, newPassword: string, otp: string }) {
    return this.request<Response.CreateUser>({
      url: `/auth/reset-password`,
      method: "POST",
      data
    });
  }

  async resendEmailOTP() {
    return this.request({
      url: `/users/resend-email-verification`,
      requireAuth: true,
      method: "POST"
    });
  }

  async forgotPassword(data: { emailAddress: string }) {
    return this.request<IResponse>({
      url: `/auth/forgot-password`,
      method: "POST",
      data,
    });
  }

  async industryUpdate(industries: string[]) {
    return this.request<Response.GetIndustry>({
      url: `/users/update-industries`,
      method: "POST",
      requireAuth: true,
      data: { industries },
    });
  }

  async pushProfileForReview() {
    return this.request<Response.GetIndustry>({
      url: `/users/push-review`,
      method: "GET",
      requireAuth: true,
    });
  }

  async createTransactionPin(data: { transactionPIN: string }) {
    return this.request<IResponse>({
      url: `/users/create-pin`,
      method: "POST",
      requireAuth: true,
      data,
    });
  }

  async profileSetup(data: Payload.BrandProfileSetup | InfluencerProfileSetup) {
    return this.request<IResponse<Core.UserProfile>>({
      url: "/users/profile-setup",
      requireAuth: true,
      method: "POST",
      data,
    });
  }

  async updateProfile(data: any) {
    return this.request<Response.GetUserProfile>({
      url: "/users/update-profile",
      requireAuth: true,
      method: "POST",
      data: this.toFormData(data),
    });
  }

  async accountSetup(data: FormData) {
    return this.request<Response.GetUserProfile>({
      url: "/users/setup-account",
      requireAuth: true,
      method: "POST",
      data,
    });
  }

  async getCountries() {
    return this.request<Core.Country[]>({
      url: "https://restcountries.com/v3.1/all?fields=name,flags,currencies",
      method: "GET",
    });
  }


  async getBanks() {
    return this.request<Response.GetBankList>({
      url: "/wallet/bank-list",
      method: "GET",
      requireAuth: true,
    })
  }

  async resolveBankAccount(data: Payload.ResolveBankPayload) {
    return this.request<IResponse<Core.AccountResolution>>({
      url: "/wallet/resolve-account",
      requireAuth: true,
      method: "POST",
      data,
    })
  }

  async addWithdrawalBank(data: Payload.AddBankAccountDetails) {
    return this.request({
      url: "/wallet/withdrawal_bank",
      requireAuth: true,
      method: "POST",
      data,
    })
  }

  async getWalletAddress() {
    return this.request<IResponse<{ balance: number }>>({
      url: "/wallet/balance",
      requireAuth: true,
      method: "GET",
    });
  }

  async getWalletTransactions() {
    return this.request<any>({
      url: "/wallet/transactions",
      requireAuth: true,
      method: "POST",
    });
  }

  async getUserProfile() {
    return this.request<IResponse<Core.User>>({
      url: "/users/profile",
      requireAuth: true,
      method: "GET",
    });
  }

  async getIndustries() {
    return this.request<Response.GetIndustry>({
      url: "/users/industries",
      requireAuth: true,
      method: "GET",
    });
  }

  async fetchCampaigns({ page = 1, limit = 10 }: Payload.GetCampaigns) {
    return this.request({
      url: '/influencer/campaign',
      requireAuth: true,
      method: "POST",
      data: {
        page,
        limit
      }
    })
  }

  async influencerSearchCampaigns({ limit = 10, page = 1, ...others }: Payload.SearchCampaignsInterval) {
    return this.request<Response.GetSearchCampaignsResponse>({
      url: '/influencer/campaign/search',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        ...others
      }
    })
  }

  async influencerContentUpload(campaignId: string, contentLink: string) {
    return this.request({
      url: '/influencer/campaign/content-upload',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": campaignId,
        "contentLink": contentLink
      }
    })
  }

  async viewCampaign(id: string | number) {
    return this.request({
      url: '/influencer/campaign/info',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": id
      }
    })
  }

  async fetchBookmarks({ page = 1, limit = 10 }: Payload.GetCampaigns) {
    return this.request({
      url: '/influencer/bookmark/fetch',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit
      }
    })
  }

  async bookmarkCampaign(id: string | number) {
    return this.request({
      url: '/influencer/bookmark',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": id
      }
    })
  }

  async applyToCampaign(id: string | number) {
    return this.request({
      url: '/influencer/campaign/join',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": id
      }
    })
  }

  async fetchUserReviews({ page = 1, limit = 10 }: Payload.GetCampaigns) {
    return this.request<Core.UserReviewResponse>({
      url: '/admin/users-review',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit
      }
    });
  }

  async reviewUser(data: Payload.ReviewUser) {
    return this.request({
      url: '/admin/review-user',
      requireAuth: true,
      method: 'POST',
      data,
    });
  }

  async getBrandCampaigns({ page = 1, limit = 10, statusProgress }: Payload.GetCampaigns) {
    return this.request<GetCampaignsResponse['data']>({
      url: '/brand/campaign/fetch',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        ...(statusProgress && { statusProgress })
      }
    })
  }

  async getInfluencerCampaigns({ page = 1, limit = 10, type, recommended = false,
    top = false }: Payload.GetCampaigns & { type?: any, recommended?: boolean, top?: boolean }) {
    return this.request<GetInfluencerCampaignsResponse>({
      url: '/influencer/campaign',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        recommended,
        top,
      }
    })
  }

  async createCampaign(data: Payload.CreateCampaign) {
    const body = new FormData();
    const { banner, ...rest } = data;

    body.append('banner', banner);
    body.append('requestBody', JSON.stringify(rest.requestBody));

    return this.request({
      url: '/brand/campaign',
      requireAuth: true,
      method: 'POST',
      data: body,
    })
  }

  async getBrandCampaign(id: string | number) {
    return this.request<Response.GetCampaign>({
      url: `/brand/campaign/fetch-single`,
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": id
      }
    })
  }

  async getAdminOverview() {
    return this.request<GetOverviewStats>({
      url: '/admin/overview-stats',
      requireAuth: true,
      method: 'POST',
    })
  }

  async getAdminCampaigns({ page = 1, limit = 10, statusProgress }: Payload.GetCampaigns) {
    return this.request<Response.GetAdminCampaignDetails>({
      url: '/admin/campaigns',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        ...(statusProgress && { statusProgress })
      }
    })
  }

  async reviewCampaign(id: string | number, data: {
    review: string,
    reason?: string
  }) {
    return this.request({
      url: '/admin/review-campaign',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": id,
        ...data
      }
    })
  }

  async fetchAdminUsers({ page = 1, limit = 10, role = 'INFLUENCER' }: { page: number, limit: number, role: 'INFLUENCER' | 'BRAND' }) {
    return this.request<GetAdminUsersResponse<typeof role>>({
      url: '/admin/users',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        role
      }
    })
  }

  async getCampaignApplicants({ page = 1, limit = 10, campaign_id, applicationStatus }: Payload.GetCampaigns & { campaign_id: string, applicationStatus?: "PENDING" | "APPROVED" | "DECLINED" }) {
    return this.request<GetInfluencerApplicationsResponse>({
      url: '/brand/campaign/application',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        campaign_id,
        ...(applicationStatus && { applicationStatus })
      }
    })
  }
  async updateAudienceDemographics(data: Payload.Demographics) {
    return this.request<any>({
      url: `/users/audience-demographic`,
      requireAuth: true,
      method: "POST",
      data: {
        audienceDemographics: data
      },
    });
  }

  async getBrandInfluencers({ page = 1, limit = 10 }: Payload.GetCampaigns) {
    return this.request<Response.GetBrandInfluencer>({
      url: '/brand/influencer/fetch',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit
      }
    })
  }

  async searchForInfluencerCampaigns({ page = 1, limit = 10, ...others }: Payload.SearchCampaigns) {
    return this.request<Response.GetCampaigns>({
      url: '/influencer/campaign/search',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        ...others
      }
    })
  }

  async getInfluencerById(id: string | number) {
    return this.request<Response.GetInfluencerProfileResponse>({
      url: `/brand/influencer-profile`,
      requireAuth: true,
      method: 'POST',
      data: {
        "influecer_id": id
      }
    })
  }

  async updateSocialPlatforms(data: Payload.SocialMediaAccounts) {
    return this.request<Response.UpdateSocials>({
      url: `/users/social-accounts`,
      requireAuth: true,
      method: "POST",
      data,
    });
  }

  async reviewInfluencerApplication(data: Payload.CampaignApplication) {
    return this.request({
      url: '/brand/influencer/review',
      requireAuth: true,
      method: 'POST',
      data
    })
  }

  async inviteInfluencer(data: Omit<Payload.CampaignApplication, 'applicationStatus'>) {
    return this.request({
      url: '/brand/influencer/invite-campaign',
      requireAuth: true,
      method: 'POST',
      data
    })
  }






  async brandBasicInformationUpdate(data: Payload.BrandBasicInformation) {
    return this.request<Response.BrandBasicInformation>({
      url: `/user/v1/profile/brand`,
      method: "POST",
      data,
    });
  }

  async brandAddressDocumentUpdate(data: Payload.BrandAddressDocumentation) {
    return this.request<Response.BrandAddressDocumentation>({
      url: `/user/v1/address`,
      method: "POST",
      data,
    });
  }

  async influencerCompleteProfileUpdate(
    data: Payload.InfluencerCompleteProfile
  ) {
    return this.request<Response.InfluencerCompleteProfile>({
      url: `/user/v1/profile/influencer`,
      method: "POST",
      data,
    });
  }

  async getCampaignsOptions() {
    return this.request<Response.GetCampaignOptions>({
      url: "/agency/v1/settings/audience",
      requireAuth: true,
      method: "GET",
    });
  }



  async brandIndustryUpdate(publicId: string, industries: string[]) {
    return this.request<Response.GetIndustry>({
      url: `/user/v1/industries/${publicId}`,
      method: "PUT",
      data: {
        industries,
      },
    });
  }

  async influencerBankDetailsUpdate(data: Payload.InfluencerBankDetails) {
    return this.request<Response.CreateUser>({
      url: "/payment/v1/bank/customers",
      method: "POST",
      data,
    });
  }


  async getCampaign(publicId: string) {
    return this.request<Response.GetCampaign>({
      url: `/agency/v1/campaigns/${publicId}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async getCampaignMetrics(publicId: string) {
    return this.request<IResponse<Core.CampaignMetrics[]>>({
      url: `/agency/v1/social-media/Instagram/insight/metrics?userPublicId=${publicId}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async deleteCampaign(publicId: string) {
    return this.request<Response.GetCampaign>({
      url: `/agency/v1/campaigns/${publicId}`,
      requireAuth: true,
      method: "DELETE",
    });
  }


  async getAddress() {
    return this.request<Response.GetAddress>({
      url: "/user/v1/address",
      requireAuth: true,
      method: "GET",
    });
  }

  async getBankDetails() {
    return this.request<Response.BankDetailUpdate>({
      url: "/payment/v1/bank/customers/_self",
      requireAuth: true,
      method: "GET",
    });
  }

  async getSocials() {
    return this.request<Response.GetSocialTypes>({
      url: "/agency/v1/social-media/_public",
      method: "GET",
    });
  }

  async getCreativesOptions() {
    return this.request<Response.GetCreativesOptions>({
      url: "/agency/v1/settings/creative",
      requireAuth: true,
      method: "GET",
    });
  }

  async getPaymentMethods() {
    return this.request<Response.GetPaymentMethods>({
      url: "/payment/v1/methods/_public",
      requireAuth: true,
      method: "GET",
    });
  }

  async getUserIndustries() {
    return this.request<Response.UpdateIndustries>({
      url: "/agency/v1/user/industry",
      requireAuth: true,
      method: "GET",
    });
  }

  async getPaymentStatus() {
    return this.request<Response.GetPaymentStatus>({
      url: "/payment/v1/statuses",
      requireAuth: true,
      method: "GET",
    });
  }

  async getCampaignKPI(campaignId: string) {
    return this.request<IResponse<{ accounts: number; followers: number }>>({
      url: `/agency/v1/campaigns/dashboard/kpi/${campaignId}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async getCampaignInteractionSummary(campaignId: string) {
    return this.request<IResponse<Core.InteractionSummary>>({
      url: `/agency/v1/campaigns/dashboard/interaction/${campaignId}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async getCampaignDistribution(campaignId: string) {
    return this.request<IResponse<Core.CampaignDistribution>>({
      url: `/agency/v1/campaigns/dashboard/distribution/${campaignId}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async getApplicantsByCampaign(campaignId: string, data: Payload.Filter) {
    return this.request<Response.GetApplications>({
      url: this.querify(`/agency/v1/applications/campaign/${campaignId}`, data),
      requireAuth: true,
      method: "GET",
    });
  }

  async getCampaignPendingApplications(status: string, data: Payload.Filter) {
    return this.request<Response.GetApplications>({
      url: this.querify(`/agency/v1/applications/status/${status}`, data),
      requireAuth: true,
      method: "GET",
    });
  }

  async getNotifications(data: Payload.Filter) {
    return this.request<Response.GetNotifications>({
      url: this.querify("/alert/v1/notifications", data),
      requireAuth: true,
      method: "GET",
    });
  }

  async getDemographicsInsightById(
    publicId: string,
    socialMedia: string,
    data: { type: string }
  ) {
    return this.request<Response.GetDemographicsData>({
      url: this.querify(
        `/agency/v1/social-media/${publicId}/demographic/${socialMedia}`,
        data
      ),
      requireAuth: true,
      method: "GET",
    });
  }

  async getSocialInsightById(publicId: string, socialMedia: string) {
    return this.request<Response.GetSocialMediaInsight>({
      url: `/agency/v1/social-media/${socialMedia}/insight?userPublicId=${publicId}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async getCampaignsByName(name: string, filter: Partial<Core.SearchFilter>) {
    return this.request<IResponse<Core.CampaignByName[]>>({
      url: this.querify(`/agency/v1/influencer/search/campaign/${name}`, {
        ...defaultFilter,
        ...filter,
      }),
      requireAuth: true,
      method: "GET",
    });
  }
  async getCampaignApplicationsByStatus(
    data: Payload.Filter & {
      status: "PENDING" | "APPROVED";
      campaignId: string;
    }
  ) {
    return this.request<
      Response.GetApplications | Response.GetApprovedInfluencers
    >({
      url: this.querify(`/agency/v1/applications/search/filter`, data),
      requireAuth: true,
      method: "GET",
    });
  }

  async getInfluencerPaymentStats() {
    return this.request<Response.GetInfluencerPaymentStats>({
      url: "/payment/v1/histories/influencer/dashboard",
      requireAuth: true,
      method: "GET",
    });
  }

  async getApplicationById(publicId: string) {
    return this.request<Response.GetApplication>({
      url: `/agency/v1/applications/${publicId}`,
      requireAuth: true,
      method: "GET",
    });
  }



  async getBookmarks() {
    return this.request<IResponse<Core.InfluencerBookmark[]>>({
      url: `/agency/v1/bookmarks`,
      requireAuth: true,
      method: "GET",
    });
  }

  async searchInfluencers(filter: Partial<Core.ExploreInfluencerFilter>) {
    return this.request<Response.GetApprovedInfluencers>({
      url: this.querify(`/agency/v1/influencer/search/campaign`, filter),
      requireAuth: true,
      method: "GET",
    });
  }

  async getDemographyInsights(data: Payload.DemographyInsight) {
    return this.request<Response.GetDemographyInsights>({
      url: `/agency/v1/social-media/${data.influencerId}/demographic/${data.socialMedia}?type=${data.type}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async bookmarkInfluencer(data: Payload.AddInfluencerBookmark) {
    return this.request<Response.GetBookmarks>({
      url: `/agency/v1/bookmarks/influencer`,
      requireAuth: true,
      method: "POST",
      data,
    });
  }

  async deleteInfluencerBookmark(title: string) {
    return this.request({
      url: `/agency/v1/bookmarks/influencer/title/${title}`,
      requireAuth: true,
      method: "DELETE",
    });
  }

  async getBookmarkedInfluencers() {
    return this.request<Response.GetApprovedInfluencers>({
      url: "/agency/v1/bookmarks/influencer",
      requireAuth: true,
      method: "GET",
    });
  }

  async deleteBookmark(name: string) {
    return this.request({
      url: `/agency/v1/bookmarks/title/${name}`,
      requireAuth: true,
      method: "DELETE",
    });
  }

  async getPaymentStats() {
    return this.request<Response.GetPaymentStats>({
      url: "/payment/v1/histories/campaign/dashboard",
      requireAuth: true,
      method: "GET",
    });
  }

  async getCampaignTransactions() {
    return this.request<Response.GetCampaignPayments>({
      url: "/payment/v1/histories",
      requireAuth: true,
      method: "GET",
    });
  }

  async getInfluencerTransactions() {
    return this.request<Response.GetInfluencerTransactions>({
      url: "/payment/v1/transactions",
      requireAuth: true,
      method: "GET",
    });
  }

  async getInfluencerTransactionsByStatus(status: string) {
    return this.request<Response.GetInfluencerTransactions>({
      url: `/payment/v1/transactions/status/${status}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async getPaymentStatistics(year?: string) {
    return this.request<Response.GetPaymentStatistics>({
      url:
        "/payment/v1/histories/influencer/graph?year=" +
        (year || new Date().getFullYear()),
      requireAuth: true,
      method: "GET",
    });
  }

  // Incomplete
  async getInfluencersByIntent(payload: any) {
    const { intent, data } = payload;
    return this.request<Response.GetCampaignPayments>({
      url: this.querify(`/agency/v1/influencer/search/${intent}`, data),
      requireAuth: true,
      method: "GET",
    });
  }

  async getLatestInfluencers() {
    return this.request<Response.GetInfluencers>({
      url: "/agency/v1/influencer/search/latest",
      requireAuth: true,
      method: "GET",
    });
  }

  async getTopInfluencers(data: Partial<Payload.Filter>) {
    return this.request<Response.GetInfluencers>({
      url: this.querify(`/agency/v1/influencer/search/top`, data),
      requireAuth: true,
      method: "GET",
    });
  }

  async getTopCategories() {
    return this.request<IResponse<string[]>>({
      url: "/agency/v1/influencer/search/categories",
      requireAuth: true,
      method: "GET",
    });
  }

  async getInfluencersByCategory(category: string) {
    return this.request<Response.GetInfluencers>({
      url: `/agency/v1/influencer/search/categories/${category}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async getInfluencerCampaignExperience(
    data: Partial<Payload.Filter> & { influencerPublicId: string }
  ) {
    return this.request<IResponse<Core.InfluencerCampaignExperience[]>>({
      url: this.querify(`/agency/v1/influencer/search/experiences`, data),
      requireAuth: true,
      method: "GET",
    });
  }

  async updatePersonalProfile(data: Payload.InfluencerPersonalProfile) {
    return this.request<Response.InfluencerCompleteProfile>({
      url: "/user/v1/profile/influencer",
      requireAuth: true,
      method: "PUT",
      data,
    });
  }

  async updateProfilePictures(fileName: string) {
    return this.request<Response.GetUserProfile>({
      url: `/user/v1/profile/picture/${fileName}`,
      requireAuth: true,
      method: "PUT",
    });
  }

  async updateCoverImage(fileName: string) {
    return this.request<Response.GetUserProfile>({
      url: `/user/v1/profile/setting/${fileName}`,
      requireAuth: true,
      method: "PUT",
    });
  }



  async updatePassword(data: Payload.UpdatePassword) {
    return this.request<Response.UpdatePassword>({
      url: "/user/v1/account/password",
      requireAuth: true,
      method: "PUT",
      data,
    });
  }

  async updateBankDetails(data: Payload.UpdateBankInformation) {
    return this.request<Response.BankDetailUpdate>({
      url: "/payment/v1/bank/customers/_edit",
      method: "PUT",
      requireAuth: true,
      data,
    });
  }

  async updateAddress(data: Payload.UpdateAddress) {
    return this.request<Response.GetAddress>({
      url: "/user/v1/address",
      method: "PUT",
      requireAuth: true,
      data,
    });
  }

  async deactivateUser() {
    return this.request({
      url: "/user/v1/account/deactivate",
      requireAuth: true,
      method: "PUT",
    });
  }

  async updateIndustries(data: string[]) {
    return this.request<Response.UpdateIndustries>({
      url: "/agency/v1/user/industry",
      method: "PUT",
      requireAuth: true,
      data: {
        selectedIndustries: data,
      },
    });
  }

  async updateInfluencerNotificationSetting(
    data: Payload.NotificationSettings
  ) {
    return this.request<Response.GenericStringRes>({
      url: "/agency/v1/settings/toggle",
      requireAuth: true,
      method: "PATCH",
      data,
    });
  }

  async updateBrandInformation(data: Payload.UpdateBrandInformation) {
    return this.request<Response.UpdateBrandInformation>({
      url: "/user/v1/profile/brand",
      requireAuth: true,
      method: "PUT",
      data,
    });
  }

  async createApplication(data: Payload.CreateApplication) {
    throw new Error("Not implemented");
  }

  async reviewApplication(data: Payload.ReviewApplication) {
    const { status, applicationId } = data;
    return this.request<Response.GetApplication>({
      url: this.querify(`/agency/v1/applications/review/${status}`, {
        applicationId,
      }),
      requireAuth: true,
      method: "PUT",
    });
  }

  async createContract(data: Payload.CreateContract) {
    return this.request<IResponse<Core.ApplicationContract>>({
      url: "/payment/v1/contracts",
      requireAuth: true,
      method: "POST",
      data,
    });
  }
}
