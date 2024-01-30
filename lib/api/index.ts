
import type { Payload, Response } from "../interfaces";
import UploadAPI from "./upload";


export default class TimaAPI extends UploadAPI {
  async refreshAuth(token: string) {
    return this.request<Response.SignIn>({
      url: "/user/v1/login/reconnect",
      method: "POST",
      headers: {
        'REFRESH-TOKEN': btoa(token)
      }
    })
  }

  async signIn(data: Payload.SignIn) {
    return this.request<Response.SignIn>({
      url: `/user/v1/login`,
      method: "POST",
      auth: data,
    })
  }

  async createUser(data: Payload.CreateUser) {
    return this.request<Response.CreateUser>({
      url: "/user/v1/account",
      method: "POST",
      data,
    })
  }

  async verifyOTP(data: Payload.VerifyOTP) {
    return this.request<Response.CreateUser>({
      url: `/user/v1/account/verify/${data.otp}`,
      method: "GET",
    })
  }

  async resendOTP(data: Payload.ResendOTP) {
    return this.request<Response.CreateUser>({
      url: `/user/v1/account/otp/resend`,
      method: "POST",
      data
    })
  }

  async passwordReset(data: Payload.PasswordReset) {
    return this.request<Response.CreateUser>({
      url: `/user/v1/account/password/reset/${data.email}`,
      method: "PUT",
    });
  }

  async completePasswordReset(
    data: Payload.CompletePasswordReset,
    headers: Payload.CompletePasswordResetHeaders
  ) {
    return this.request<Response.CreateUser>({
      url: "/user/v1/account/password/update",
      method: "PUT",
      headers,
      data,
    });
  }

  async brandBasicInformationUpdate(
    data: Payload.BrandBasicInformation
  ) {
    return this.request<Response.BrandBasicInformation>({
      url: `/user/v1/profile/brand`,
      method: "POST",
      data
    });
  }

  async brandAddressDocumentUpdate(
    data: Payload.BrandAddressDocumentation
  ) {
    return this.request<Response.BrandAddressDocumentation>({
      url: `/user/v1/address`,
      method: "POST",
      data
    });
  }

  async influencerCompleteProfileUpdate(
    data: Payload.InfluencerCompleteProfile
  ) {
    return this.request<Response.InfluencerCompleteProfile>({
      url: `/user/v1/profile/influencer`,
      method: "POST",
      data
    });
  }

  async getCampaignsOptions() {
    return this.request<Response.GetCampaignOptions>({
      url: "/agency/v1/settings/audience",
      requireAuth: true,
      method: "GET",
    })
  }

  async brandIndustryUpdate(
    publicId: string,
    industries: string[]
  ) {
    return this.request<Response.GetIndustry>({
      url: `/user/v1/industries/${publicId}`,
      method: "PUT",
      data: {
        industries,
      }
    });
  }

  async influencerBankDetailsUpdate(
    data: Payload.InfluencerBankDetails
  ) {
    return this.request<Response.CreateUser>({
      url: '/payment/v1/bank/customers',
      method: "POST",
      data
    });
  }

  async getCountries() {
    return this.request<Response.GetCountries>({
      url: '/user/v1/countries',
      method: "GET",
    });
  }

  async getIndustries() {
    return this.request<Response.GetIndustry>({
      url: '/agency/v1/industries',
      method: "GET",
    });
  }

  async getBanks() {
    return this.request<Response.GetBankList>({
      url: '/payment/v1/banks',
      method: "GET",
    });
  }

  async getCampaign(publicId: string) {
    return this.request<Response.GetCampaign>({
      url: `/agency/v1/campaigns/${publicId}`,
      requireAuth: true,
      method: "GET",
    });
  }

  async getCampaigns(payload: Payload.GetCampaigns) {
    const { type, ...data } = payload;

    return this.request<Response.GetCampaigns>({
      url: this.querify(
        `/agency/v1/campaigns/search/${type}`,
        data
      ),
      requireAuth: true,
      method: "GET",
    });
  }


  async getBrandCampaigns(payload: Payload.GetBrandCampaigns) {
    const { name, ...data } = payload;
    return this.request<Response.GetCampaigns>({
      url: this.querify(
        `/agency/v1/campaigns/brand/${name}`,
        data
      ),
      requireAuth: true,
      method: "GET",
    });
  }

  async getUserProfile() {
    return this.request<Response.GetUserProfile>({
      url: '/user/v1/profile',
      requireAuth: true,
      method: 'GET'
    });
  }

  async getAddress() {
    return this.request<Response.GetAddress>({
      url: '/user/v1/address',
      requireAuth: true,
      method: 'GET',
    });
  }

  async getBankDetails() {
    return this.request<Response.BankDetailUpdate>({
      url: "/payment/v1/bank/customers/_self",
      requireAuth: true,
      method: 'GET',
    });
  }

  async getCreativesOptions() {
    return this.request<Response.GetCreativesOptions>({
      url: "/agency/v1/settings/creative",
      requireAuth: true,
      method: 'GET',
    });
  }

  async getPaymentMethods() {
    return this.request<Response.GetPaymentMethods>({
      url: "/payment/v1/methods/_public",
      requireAuth: true,
      method: 'GET',
    });
  }

  async getUserIndustries() {
    return this.request<Response.UpdateIndustries>({
      url: "/agency/v1/user/industry",
      requireAuth: true,
      method: 'GET',
    });
  }

  async getPaymentStatus() {
    return this.request<Response.GetPaymentStatus>({
      url: "/payment/v1/statuses",
      requireAuth: true,
      method: 'GET',
    });
  }

  async getCampaignApplicants(campaignId: string, data: Payload.Filter) {
    return this.request<Response.GetApplications>({
      url: this.querify(`/agency/v1/applications/applicant/${campaignId}`, data),
      requireAuth: true,
      method: 'GET',
    });
  }

  async getCampaignPendingApplications(status: string, data: Payload.Filter) {
    return this.request<Response.GetApplications>({
      url: this.querify(`/agency/v1/applications/status/${status}`, data),
      requireAuth: true,
      method: 'GET',
    });
  }


  async getCampaignApplicationsByStatus(data: Payload.Filter & { status: string; campaignId: string }) {
    return this.request<Response.GetApplications>({
      url: this.querify(`/agency/v1/applications/search/filter`, data),
      requireAuth: true,
      method: 'GET',
    });
  }

  async getApplicationById(publicId: string) {
    return this.request<Response.GetApplication>({
      url: `/agency/v1/applications/${publicId}`,
      requireAuth: true,
      method: 'GET',
    });
  }

  async getPaymentStats() {
    return this.request<Response.GetPaymentStats>({
      url: "/payment/v1/histories/campaign/dashboard",
      requireAuth: true,
      method: 'GET',
    });
  }

  async getCampaignTransactions() {
    return this.request<Response.GetCampaignPayments>({
      url: "/payment/v1/histories",
      requireAuth: true,
      method: 'GET',
    });
  }

  async updatePersonalProfile(data: Payload.InfluencerPersonalProfile) {
    return this.request<Response.InfluencerCompleteProfile>({
      url: "/user/v1/profile/influencer",
      requireAuth: true,
      method: "PUT",
      data
    })
  }

  async updateProfilePictures(fileName: string) {
    return this.request<Response.GetUserProfile>({
      url: `/user/v1/profile/picture/${fileName}`,
      requireAuth: true,
      method: 'PUT',
    });
  }

  async updatePassword(data: Payload.UpdatePassword) {
    return this.request<Response.UpdatePassword>({
      url: "/user/v1/account/password",
      requireAuth: true,
      method: "PUT",
      data
    })
  }

  async updateBankDetails(data: Payload.UpdateBankInformation) {
    return this.request<Response.BankDetailUpdate>({
      url: "/payment/v1/bank/customers/_edit",
      method: "PUT",
      requireAuth: true,
      data,
    })
  }

  async updateAddress(data: Payload.UpdateAddress) {
    return this.request<Response.GetAddress>({
      url: "/user/v1/address",
      method: "PUT",
      requireAuth: true,
      data
    });
  }

  async deactivateUser() {
    return this.request({
      url: "/user/v1/account/deactivate",
      requireAuth: true,
      method: "PUT"
    });
  }

  async updateIndustries(data: string[]) {
    return this.request<Response.UpdateIndustries>({
      url: "/agency/v1/user/industry",
      method: "PUT",
      requireAuth: true,
      data: {
        selectedIndustries: data
      }
    })
  }

  async updateInfluencerNotificationSetting(
    data: Payload.NotificationSettings
  ) {
    return this.request<Response.GenericStringRes>({
      url: "/agency/v1/settings/toggle",
      requireAuth: true,
      method: "PATCH",
      data,
    })
  }

  async updateBrandInformation(data: Payload.UpdateBrandInformation) {
    return this.request<Response.UpdateBrandInformation>({
      url: "/user/v1/profile/brand",
      requireAuth: true,
      method: "PUT",
      data
    })
  }

  async createCampaign(data: Payload.CreateCampaign) {
    return this.request<Response.GetCampaign>({
      url: "/agency/v1/campaigns",
      requireAuth: true,
      method: "POST",
      data
    })
  }

  async createApplication(data: Payload.CreateApplication) {
    return this.request<Response.CreateApplication>({
      url: "/agency/v1/applications",
      requireAuth: true,
      method: "POST",
      data
    })
  }

  async reviewApplication(data: Payload.ReviewApplication) {
    const { status, applicationId } = data;
    return this.request<Response.GetApplication>({
      url: this.querify(`/agency/v1/applications/review/${status}`, { applicationId }),
      requireAuth: true,
      method: "PUT",
    })
  }
}