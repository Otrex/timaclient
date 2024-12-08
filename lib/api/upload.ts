import type { AxiosRequestConfig } from "axios";
import type { Payload, Response } from "../interfaces";
import Api from "../core/Api";

export default class UploadAPI extends Api {
  private extractFileMeta(file: File) {
    const extension = file.type.split('/').pop();
    const lastDotIndex = file.name.lastIndexOf('.');
    const filename = lastDotIndex !== -1
      ? file.name.substring(0, lastDotIndex)
      : file.name;
    return { extension, name: filename };
  }

  async getSignedUrl(file: File, type: Payload.UploadRequest['type']) {
    const fileMeta = this.extractFileMeta(file);

    switch (type) {
      case "pics":
        return this.request<Response.GetSignedURL>({
          url: `/user/v1/signed/url/pics/${fileMeta.name}/${file.type.split('/')[1]}`,
          method: "GET",
        })

      case "thumb":
        return this.request<Response.GetSignedURL>({
          url: `/agency/v1/campaigns/signed/url/thumbnail/${fileMeta.name}/${fileMeta.extension}`,
          method: "GET",
        })

      case "settings":
        return this.request<Response.GetSignedURL>({
          url: `/user/v1/signed/url/settings/${fileMeta.name}/${fileMeta.extension}`,
          method: "GET",
          requireAuth: true
        })

      case "docs": default:
        return this.request<Response.GetSignedURL>({
          url: `/user/v1/signed/url/docs/${fileMeta.name}/${fileMeta.extension}`,
          method: "GET",
        })
    }
  }

  async upload(
    data: Payload.UploadRequest,
    onUploadProgress?: AxiosRequestConfig['onUploadProgress']
  ) {
    const { data: url } = await this.getSignedUrl(data.file, data.type);
    await this.request({
      headers: { 'Content-Type': data.file.type },
      maxBodyLength: Infinity,
      requireAuth: false,
      onUploadProgress,
      data: data.file,
      method: "PUT",
      url,
    });
    return new URL(url);
  }


  toFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();

    if (obj['profileImage']) {
      formData.append('profileImage', obj['profileImage']);
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    }

    return formData;
  }

}