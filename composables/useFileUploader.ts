import type { AxiosProgressEvent } from "axios";

export default function (type: "picture" | "docs", onProgress?: (e: number) => void) {
  const api = useAPI();
  const fileConst = (filePath: string) => {
    const lastSlashIndex = filePath.lastIndexOf('/');
    const fileNameWithExtension = lastSlashIndex !== -1 ? filePath.substring(lastSlashIndex + 1) : filePath;

    // Extracting file extension
    const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
    const fileNameWithoutExtension = lastDotIndex !== -1 ? fileNameWithExtension.substring(0, lastDotIndex) : fileNameWithExtension;
    const fileExtension = lastDotIndex !== -1 ? fileNameWithExtension.substring(lastDotIndex + 1) : '';

    return [fileNameWithoutExtension, fileExtension]
  }
  const fileToBinary = (file: File): Promise<ArrayBuffer | string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryData = reader.result;
        resolve(binaryData);
      };
      reader.onerror = () => {
        reject(new Error('Unable to read the file as binary data'));
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const signedUrlMap = {
    "picture": ($fileName: string) => {
      const [fileName, fileExtension] = fileConst($fileName);
      return api.getPictureSignedURL(fileName, fileExtension)
    },
    "docs": ($fileName: string) => {
      const [fileName, fileExtension] = fileConst($fileName);
      return api.getDocsSignedURL(fileName, fileExtension);
    }
  }

  const upload = async (file: File, $fileName?: string) => {
    const fileName = file.name;
    const binary = await fileToBinary(file);
    console.log(fileName);

    const { data: signedUrl } = await signedUrlMap[type](fileName);

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", signedUrl, true);

      xhr.setRequestHeader("x-amz-acl", "public-read");
      xhr.setRequestHeader("content-type", file.type);

      xhr.upload.onprogress = function (e) {
        const percent = e.lengthComputable
          ? Math.round((e.loaded / e.total) * 100)
          : 0;
        onProgress && onProgress(percent);
      };

      xhr.send(file);
      xhr.onload = async function () {
        if ([200, 201].indexOf(xhr.status) >= 0) {
          resolve();
        } else {
          reject();
        }
      };

      xhr.onerror = function () {
        reject();
      };
    })

  }
  return {
    execute: async (file: File | File[]) => {
      if (Array.isArray(file)) {
        Promise.all(file.map(f => upload(f)));
      } else {
        upload(file);
      }
    }
  }
}