import type { AxiosRequestConfig } from "axios";
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

  async brandAddressDocumentUpdate(data: Payload.BrandAddressDocumentation) {
    return this.request<Response.BrandAddressDocumentation>({
      url: `/user/v1/address`,
      method: "POST",
      data
    });
  }

  async getSignedUrl(file: File, type: "docs" | "pics") {
    const fileMeta = TimaAPI.extractFileMeta(file);

    return type === "pics"
      ? this.request<Response.GetSignedURL>({
        url: `/user/v1/signed/url/pics/${fileMeta.name}/${fileMeta.extension}`,
        method: "GET",
      })
      : this.request<Response.GetSignedURL>({
        url: `/user/v1/signed/url/docs/${fileMeta.name}/${fileMeta.extension}`,
        method: "GET",
      })
  }

  async getCountries() {
    return this.request<Response.GetCountries>({
      url: '/user/v1/countries',
      method: "GET",
    });
  }

  async passwordReset(data: Payload.PasswordReset) {
    return this.request<Response.CreateUser>({
      url: `/user/v1/account/password/reset/${data.email}`,
      method: "PUT",
    });
  }

  async upload(
    data: Payload.UploadRequest,
    onUploadProgress?: AxiosRequestConfig['onUploadProgress']
  ) {

    const { data: url } = await this.getSignedUrl(data.file, data.type);
    await this.request({
      headers: {
        'Content-Type': data.file.type,
      },
      maxBodyLength: Infinity,
      requireAuth: false,
      onUploadProgress,
      data: data.file,
      method: "PUT",
      url,
    });
    return new URL(url);
  }
}