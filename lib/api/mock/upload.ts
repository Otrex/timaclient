import type { AxiosRequestConfig } from "axios"
import type { Payload, Response } from "../../interfaces"
import MockApi from "./baseapi"

export default class MockUploadAPI extends MockApi {
  private extractFileMeta(file: File) {
    const extension = file.type.split('/').pop()
    const lastDotIndex = file.name.lastIndexOf('.')
    const filename = lastDotIndex !== -1
      ? file.name.substring(0, lastDotIndex)
      : file.name
    return { extension, name: filename }
  }

  async getSignedUrl(file: File, type: Payload.UploadRequest['type']): Promise<Response.GetSignedURL> {
    const fileMeta = this.extractFileMeta(file)
    const mockSignedUrl = `https://mock-signed-url.com/${type}/${fileMeta.name}.${fileMeta.extension}`

    return {
      status: true,
      message: "Mock signed URL generated successfully",
      data: mockSignedUrl
    }
  }

  async upload(
    data: Payload.UploadRequest,
    onUploadProgress?: AxiosRequestConfig['onUploadProgress']
  ): Promise<URL> {
    const { data: url } = await this.getSignedUrl(data.file, data.type)

    // Simulate upload progress
    if (onUploadProgress) {
      const totalSize = data.file.size
      const chunkSize = totalSize / 10
      let uploadedSize = 0

      const progressInterval = setInterval(() => {
        uploadedSize += chunkSize
        onUploadProgress({
          loaded: uploadedSize,
          total: totalSize,
          progress: uploadedSize / totalSize,
          bytes: 1000
        })

        if (uploadedSize >= totalSize) {
          clearInterval(progressInterval)
        }
      }, 100)
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new URL(url)
  }
}
