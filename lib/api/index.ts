import type { Core, Payload, Response } from "../interfaces";
import type { InfluencerProfileSetup } from "../interfaces/payload";
import type { GetAdminUsersResponse, GetCampaignsResponse, GetInfluencerApplicationsResponse, GetInfluencerApplicationsWithCampaignResponse, GetInfluencerCampaignsResponse, GetInfluencerContentApplicationsResponse, GetOverviewStats, GetPlansResponse, GetTransactionsResponse, PaymentAuthorizationResponse, UpdatePricingPlan } from "../interfaces/response";
import type { IResponse } from "../interfaces/utils";
import SocialsAPI from "./socials";
import type { WithdrawalResponse } from "./types/responses";
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

  async getPlans() {
    return this.request<GetPlansResponse>({
      url: "/brand/fetch-plans",
      method: "POST",
      requireAuth: true,
      data: {
        "page": 1,
        "limit": 10
      }
    })
  }

  async fundWallet(data: {
    amount: number,
    paymentGateway: "FLUTTERWAVE" | "PAYSTACK" //PAYSTACK OR FLUTTERWAVE
  }) {
    return this.request<PaymentAuthorizationResponse>({
      url: "/wallet/fund",
      requireAuth: true,
      method: "POST",
      data
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

  async getWalletBalance() {
    return this.request<IResponse<{ balance: number }>>({
      url: "/wallet/balance",
      requireAuth: true,
      method: "GET",
    });
  }

  async getWalletTransactions({ page = 1, limit = 20, type, days }: {
    "page": number,
    "limit": number,
    "type": 'CREDIT' | 'DEBIT',
    "days": "1" | "7" | "30"
  }) {
    return this.request<GetTransactionsResponse>({
      url: "/wallet/transactions",
      requireAuth: true,
      method: "POST",
      data: {
        page,
        limit,
        ...(type && { type }),
        ...(days && { days })
      }
    });
  }
  async makeSubscriptionPayment() {

  }

  async deactivateAccount() {
    return this.request({
      url: "/users/deactivate-account",
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

  async getInfluencerNotificationSetting() {
    return this.request<Response.GetNotificationSettingsResponse>({
      url: "/users/notification-settings",
      requireAuth: true,
      method: "GET",
    })
  }

  async updateInfluencerNotificationSetting(data: {
    paymentNotification: boolean,
    campaignUpdates: boolean
  }) {
    return this.request<Response.GetNotificationSettingsResponse>({
      url: "/users/notification-settings",
      requireAuth: true,
      method: "POST",
      data
    })
  }

  async getIndustries() {
    return this.request<Response.GetIndustry>({
      url: "/users/industries",
      requireAuth: true,
      method: "GET",
    });
  }

  async getInfluencerCompletedCampaigns({ page = 1, limit = 10 }: Payload.GetCampaigns) {
    return this.request<any>({
      url: '/influencer/campaign/completed',
      requireAuth: true,
      method: "POST",
      data: {
        "page": page,
        "size": limit
      }
    })
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

  async brandSearchCampaigns({ limit = 10, page = 1, ...others }: Payload.SearchCampaignsInterval) {
    return this.request<any>({
      url: '/brand/campaign/search',
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

  async viewAdminCampaign(id: string | number) {
    return this.request<Response.AdminCampaignResponse>({
      url: '/admin/campaign/single',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": id
      }
    })
  }

  async getTopInfluencerCategories() {
    return this.request<Response.GetTopCategoriesResponse>({
      url: '/brand/top/category',
      requireAuth: true,
      method: 'GET',
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

  async getCampaignContents(id: string | number, applicationStatus = "", { page = 1, limit = 10 }) {
    return this.request<GetInfluencerContentApplicationsResponse>({
      url: '/brand/campaign/contents',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": id,
        ...(applicationStatus ? { applicationStatus } : {}),
        "page": page,
        "limit": limit
      }
    })
  }


  async reviewContent(data: Payload.ContentReview) {
    return this.request({
      url: '/brand/influencer/content-review',
      requireAuth: true,
      method: 'POST',
      data: data
    })
  }

  async reportCampaign(id: string | number, reason: string) {
    return this.request({
      url: '/influencer/campaign/report',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": id,
        "reason": reason
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

  async deleteBookmark(id: string) {
    return this.request({
      url: `/influencer/bookmark/delete`,
      requireAuth: true,
      method: "POST",
      data: {
        "bookmark_id": id
      }
    });
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

  async getBrandCampaigns({ page = 1, limit = 10, ...others }: Payload.GetCampaigns) {
    return this.request<GetCampaignsResponse['data']>({
      url: '/brand/campaign/fetch',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        ...others
      }
    })
  }

  async getInfluencerCampaigns({
    page = 1,
    limit = 10,
    type,
    recommended = false,
    top = false,
    status
  }: Payload.GetCampaigns & {
    type?: any,
    recommended?: boolean,
    top?: boolean,
    status?: string
  }) {
    return this.request<GetInfluencerCampaignsResponse>({
      url: '/influencer/campaign',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        recommended,
        top,
        ...(status && { status }),
      }
    })
  }

  async getSimilarCampaigns({ page = 1, limit = 5, campaign_id }: { page?: number, limit?: number, campaign_id: string }) {
    return this.request<GetInfluencerCampaignsResponse>({
      url: '/influencer/campaign/similar',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        campaign_id
      }
    })
  }

  async getInfluencerApplications({ page = 1, limit = 10, applicationStatus }: { page?: number, limit?: number, applicationStatus: string }) {
    return this.request<GetInfluencerApplicationsWithCampaignResponse>({
      url: '/influencer/campaign/application',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        ...(applicationStatus && { applicationStatus })
      }
    })
  }

  async createCampaign(data: Payload.CreateCampaign) {
    const body = new FormData();
    const { banner, ...rest } = data;

    body.append('banner', banner);
    body.append('requestBody', JSON.stringify(rest.requestBody));

    return this.request<Response.ICreateCampaign>({
      url: '/brand/campaign',
      requireAuth: true,
      method: 'POST',
      data: body,
    })
  }

  async updateCoverImage(file: File) {
    const data = new FormData();
    data.append('banner', file);
    return this.request({
      url: '/users/update-banner',
      requireAuth: true,
      method: 'POST',
      data
    })
  }

  async changePassword(data: Payload.ChangePassword) {
    return this.request({
      url: '/users/change-password',
      requireAuth: true,
      method: 'POST',
      data: data
    })
  }

  async getBankList() {
    return this.request<Response.GetBankList>({
      url: '/wallet/bank-list',
      requireAuth: true,
      method: 'GET'
    })
  }

  async withdrawFunds(data: Payload.WithdrawFunds) {
    return this.request({
      url: '/wallet/withdraw',
      requireAuth: true,
      method: 'POST',
      data
    })
  }

  async getWalletStats() {
    return this.request<Response.GetWalletStats>({
      url: '/wallet/stats',
      requireAuth: true,
      method: 'GET',
    })
  }

  async getCalendarEvents() {
    return this.request<Response.GetCalendarEvents>({
      url: '/users/calendar',
      requireAuth: true,
      method: 'GET',
    })
  }

  async setupCalendarEvents(payload: any) {
    const data = this.toFormData({
      ...payload,
    });

    return this.request({
      url: '/users/calendar',
      requireAuth: true,
      method: 'POST',
      data
    })
  }


  async getWithdrawalBanks() {
    return this.request<Response.GetWithdrawalBanksResponse>({
      url: '/wallet/withdrawal_banks',
      requireAuth: true,
      method: 'GET',
    })
  }
  async createWithdrawalBanks(data: Payload.BankAccountCreate) {
    return this.request({
      url: '/wallet/withdrawal_bank',
      requireAuth: true,
      method: 'POST',
      data: data
    })
  }

  async changeTransactionPin(data: {
    oldPIN: string,
    newPIN: string
  }) {
    return this.request({
      url: '/users/change-pin',
      requireAuth: true,
      method: 'POST',
      data,
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

  async transferFunds(data: Payload.TransferFunds) {
    return this.request({
      url: '/wallet/transfer',
      requireAuth: true,
      method: 'POST',
      data
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

  async getSubscriptionStats(data: {
    dateFilter: 'today' | '7days' | '30days' | 'custom',
    startDate?: string,
    endDate?: string
  }) {
    return this.request<Response.GetSubscriptionStats>({
      url: '/admin/subscribe-overview-stats',
      requireAuth: true,
      method: 'POST',
      data
    })
  }

  async getPlanStats(data: {
    planId: string
    dateFilter: 'today' | '7days' | '30days' | 'custom',
    startDate?: string,
    endDate?: string
  }) {
    return this.request<any>({
      url: '/admin/plan/subscribe-overview-stats',
      requireAuth: true,
      method: 'POST',
      data
    })
  }

  async getSubscribers({ planId, limit = 10, page = 1 }: any) {
    return this.request<any>({
      url: '/admin/fetch-subscribers',
      requireAuth: true,
      method: 'POST',
      data: {
        planId,
        page,
        limit
      }
    })
  }

  async getWithdrawalRequests({ page = 1, limit = 10 }: { page: number, limit: number }) {
    return this.request<WithdrawalResponse>({
      url: '/admin/withdrawal-request',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit
      }
    })
  }

  async cancelSubscription({ user_id, reason }: any) {
    return this.request({
      url: '/admin/cancel-subscription',
      requireAuth: true,
      method: 'POST',
      data: {
        user_id,
        reason
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

  async acceptCampaignInvite(inviteId: string | number) {
    return this.request({
      url: '/influencer/accept-invite',
      requireAuth: true,
      method: 'POST',
      data: {
        invite_id: inviteId
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

  async updateIndustries(industries: string[]) {
    return this.request<any>({
      url: `/users/update-industries`,
      requireAuth: true,
      method: "POST",
      data: {
        industries: industries
      },
    });
  }

  async getBrandInfluencers({ page = 1, limit = 10, ...others }: Payload.GetCampaigns) {
    return this.request<Response.GetBrandInfluencer>({
      url: '/brand/influencer/fetch',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        ...others
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
        "influencer_id": id
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

  async getNotifications({ page = 1, limit = 10, ...others }: Payload.GetNotifications) {
    return this.request<Response.GetNotifications>({
      url: '/users/notifications',
      requireAuth: true,
      method: "POST",
      data: {
        page,
        limit,
        ...others
      },
    });
  }


  async updatePaymentInformation(data: Payload.BankInformation) {
    return this.request({
      url: '/influencer/payment-information',
      requireAuth: true,
      method: 'POST',
      data
    })
  }

  async getInfluencerSubmissions({ page = 1, limit = 10, ...others }: Payload.GetInfluencerSubmissions) {
    return this.request<Response.GetInfluencerSubmissions>({
      url: '/influencer/campaign/contents',
      requireAuth: true,
      method: 'POST',
      data: {
        page,
        limit,
        ...others
      }
    })
  }

  async getTopInfluencers(data: Partial<Payload.Filter>) {
    return this.request<Response.GetInfluencers>({
      url: "/brand/influencer/fetch",
      requireAuth: true,
      method: "POST",
      data: {
        ...data,
        top: true
      }
    });
  }


  async getInfluencersByCategory(category: string, pageData?: { page: number, limit: number }) {
    return this.request<IResponse<Core.Influencer[]>>({
      url: `/brand/influencer/search`,
      requireAuth: true,
      method: "POST",
      data: {
        page: pageData?.page || 1,
        limit: pageData?.limit || 5,
        category: [category]
      }
    });
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

  async endCampaign(publicId: string) {
    return this.request<any>({
      url: '/brand/campaign/close',
      requireAuth: true,
      method: 'POST',
      data: {
        "campaign_id": publicId
      }
    })
  }


  async getAddress() {
    return this.request<Response.GetAddress>({
      url: "/user/v1/address",
      requireAuth: true,
      method: "GET",
    });
  }

  async brandOverviewStats() {
    return this.request<Response.GetBrandOverviewStatsResponse>({
      url: "/brand/overview-stat",
      requireAuth: true,
      method: "POST",
    })
  }

  async getLatestInfluencers({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) {
    return this.request<Response.GetInfluencers>({
      url: "/brand/influencer/fetch",
      requireAuth: true,
      method: "POST",
      data: {
        page,
        limit,
        recommended: true,
      }
    });
  }

  async searchInfluencers(payload: Partial<Payload.SearchInfluencerFilters>) {
    return this.request<Response.GetInfluencersResponse>({
      url: "/brand/influencer/search",
      requireAuth: true,
      method: "POST",
      data: payload
    })
  }

  async fetchInvites() {
    return this.request<any>({
      url: "/influencer/fetch-invites",
      requireAuth: true,
      method: "POST",
    })
  }

  async fetchAdminPlans(page = 1, limit = 10) {
    return this.request<any>({
      url: "/admin/fetch-plans",
      requireAuth: true,
      method: "POST",
      data: {
        page, limit
      }
    })
  }

  async saveAdminPlan(data: UpdatePricingPlan) {
    return this.request<any>({
      url: "/admin/create-plans",
      requireAuth: true,
      method: "POST",
      data
    })
  }

  async fetchCampaignAnalytics(campaignId: string) {
    return this.request<Response.GetCampaignAnalytics>({
      url: `/brand/campaign-analytics`,
      requireAuth: true,
      method: "POST",
      data: {
        campaign_id: campaignId
      }
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
}
