import { RequestState } from "~/lib/enums";
import type { Payload } from "~/lib/interfaces";

export default function (opts: {
  type: Payload.UploadRequest['type'],
  onProgress?: (e: number) => void,
  onCompleted?: (e: URL | URL[] | undefined) => void
}) {
  const { type, onProgress, onCompleted } = opts;
  const state = ref(RequestState.IDLE);
  const api = useAPI();

  const upload = async (file: File) => {
    try {
      if (!file) return;
      state.value = RequestState.LOADING;

      const response = await api.upload({
        file,
        type,
      }, (event) => {
        const completed = event.progress || 0;
        const progress = Math.round(completed * 100);
        onProgress && onProgress(progress);
      })

      state.value = RequestState.COMPLETED;

      return response;
    } catch (error) {
      state.value = RequestState.ERROR;
      throw error;
    }
  }

  return {
    state,
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