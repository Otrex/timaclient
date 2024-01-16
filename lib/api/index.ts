
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

  async getUserProfile() {
    return this.request<Response.GetUserProfile>({
      url: '/user/v1/profile',
      requireAuth: true,
      method: 'GET'
    });
  }


  async updatePersonalProfile(data: Payload.InfluencerPersonalProfile) {
    return this.request<Response.InfluencerCompleteProfile>({
      url: "/user/v1/profile/influencer",
      requireAuth: true,
      method: "PUT"
    })
  }

}