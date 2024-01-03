import Api from "./core/Api";
import type { Payload, Response } from "./interfaces";


export default class TimaAPI extends Api {
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

  async brandBasicInformationUpdate(data: Payload.BrandBasicInformation) {
    return this.request<Response.BrandBasicInformation>({
      url: `/user/v1/profile/brand`,
      method: "POST",
      data
    });
  }

  async getPictureSignedURL(fileName: string, fileExtension: string) {
    return this.request<Response.GetSignedURL>({
      url: '/user/v1/signed/url/pics/' + fileName + '/' + fileExtension,
      method: "GET",
    });
  }

  async getDocsSignedURL(fileName: string, fileExtension: string) {
    return this.request<Response.GetSignedURL>({
      url: '/user/v1/signed/url/docs/' + fileName + '/' + fileExtension,
      method: "GET",
    });
  }
}