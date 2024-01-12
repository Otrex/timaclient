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

  async getSignedUrl(file: File, type: "docs" | "pics") {
    const fileMeta = this.extractFileMeta(file);

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
}