export default function (opts: {
  type: "pics" | "docs",
  onProgress?: (e: number) => void,
  onCompleted?: (e: URL | URL[] | undefined) => void
}) {
  const { type, onProgress, onCompleted } = opts;
  const api = useAPI();

  const upload = async (file: File) => {
    if (!file) return;
    return api.upload({
      file,
      type,
    }, (event) => {
      const completed = event.progress || 0;
      const progress = Math.round(completed * 100);
      onProgress && onProgress(progress);
    })
  }

  return {
    execute: async (file: File | File[]) => {
      let result;
      if (Array.isArray(file)) {
        result = [];
        for (let i = 0; i < file.length; i++) {
          const url = await upload(file[i]);
          result.push(url!);
        }
      } else {
        result = await upload(file);
      }

      onCompleted && onCompleted(result);
    }
  }
}