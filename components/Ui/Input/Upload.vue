<template>
  <div :key="reset" class="inline-block min-w-[6.25rem]">
    <div
      @click="open"
      :class="[
        props.errorMessage && '!border-red-600',
        'w-full md:flex items-center gap-[0.625rem] justify-between p-[0.375rem] border border-solid border-[#6B7280] !rounded-[2.5rem]',
      ]"
    >
      <div>
        <transition>
          <span
            v-show="fileName"
            class="text-[1.1875rem] pl-[0.75rem] w-full"
            >{{ fileName }}</span
          >
        </transition>
        <transition>
          <span
            v-show="!fileName"
            class="text-[#999999] text-[1.1875rem] pl-[0.75rem] w-full"
            >{{ props.placeholder || "Select a file to upload" }}</span
          >
        </transition>
      </div>
      <div>
        <button
          @click="open"
          class="!rounded-[2.5rem] bg-[#F59594] text-[19px] px-[3.125rem] py-[0.25rem] text-[#fff] min-w-[4.375rem]"
        >
          Upload
        </button>
      </div>
    </div>
    <transition>
      <div
        v-show="props.errorMessage"
        class="text-red-600 text-left text-[0.875rem]"
      >
        {{ props.errorMessage }}
      </div>
    </transition>

    <Teleport to="body">
      <UtModal
        v-model:state="modalState"
        :prevent-backdrop-close="true"
        m-width="31.25rem"
        backdrop-color="rgba(0,0,0,.3)"
      >
        <div class="model-wrapper relative">
          <div class="absolute top-[2rem] right-[2rem]">
            <button @click="modalState = false">
              <UtSvg name="close" class="w-[1.125rem] h-[1.125rem]" />
            </button>
          </div>
          <div
            class="px-[3rem] text-center py-[2.1875rem] dark:bg-[#444] bg-white rounded-[1.875rem]"
          >
            <h4 class="text-[1.75rem] mb-[2.5rem]">UPLOAD FILES</h4>

            <div
              ref="dropZoneRef"
              :class="{
                'rounded-[0.5rem] mb-[1.5rem] outline-dashed outline-[#999999] pt-[1.25rem] pb-[1.8125rem]': true,
                '!outline-red-600': error,
              }"
              @click="openUploadFile"
            >
              <UtSvg name="upload" class="inline-block w-[4.5rem] h-[4.5rem]" />

              <h4 class="text-[1.5rem]">Drag & Drop</h4>
              <p class="text-[#777777]">Your files here or browse to upload</p>
              <label
                class="text-[#0077D3] w-full block px-4 overflow-clip text-[1.1875rem]"
              >
                {{ fileName || "Only jpeg & png files with max size of 15mb" }}
                <input
                  type="file"
                  :accept="`${acceptsMime}*`"
                  class="hidden"
                  ref="input"
                  @change="clickHandler"
                />
              </label>

              <label
                v-show="error"
                class="text-[#d30007] block whitespace-nowrap text-[1.1875rem]"
                >{{ error }}</label
              >
            </div>

            <ui-button-default
              variant="primary"
              :loading="requestState === constants.LOADING"
              :disabled="requestState === constants.LOADING"
              @click="save"
              class="py-[0.875rem] max-w-[12.5rem] text-[1.8125rem] rounded-[1.8125rem] w-full"
            >
              {{ progress ? `${progress}%` : "Save" }}
            </ui-button-default>
          </div>
        </div>
      </UtModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// TODO: Fix drag and drop issues
import { useDropZone } from "@vueuse/core";
import { Payload } from "~/lib/interfaces";
interface IProps {
  file?: File | File[];
  name?: string;
  url?: string | string[];
  type: Payload.UploadRequest["type"];
  multi?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

type ClickEvent = Event & (MouseEvent & { target: HTMLInputElement }) & any;
type DropEvent = DragEvent & ({ dataTransfer: DataTransfer } | any);

const props = defineProps<IProps>();
const progress = ref(0);
const file = ref();
const input = ref();

const openUploadFile = () => {
  input.value.click();
};

const emit = defineEmits(["update:file", "update:name", "update:url"]);

const accepts = {
  pics: "image/",
  thumb: "image/",
  docs: "application/",
};

const { execute: upload, state: requestState } = useFileUploader({
  type: props.type!,
  onProgress(e) {
    progress.value = e;
  },
  onCompleted(e) {
    if (e) {
      const url = Array.isArray(e)
        ? e.map((m) => `${m.origin}${m.pathname}`)
        : `${e.origin}${e.pathname}`;
      emit("update:url", url);
      modalState.value = false;
    }
  },
});

const modalState = ref(false);
const error = ref<string>();
const reset = ref(0);

const acceptsMime = computed(() => (props.type ? accepts[props.type] : "*/"));

const fileName = ref<string>();

const dropZoneRef = ref<HTMLDivElement>();

function onDrop(files: File[] | null) {
  // called when files are dropped on zone
  if (files !== null) processFiles(files);
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ["image/jpeg"],
});

const handleDragOver = (event: any) => {
  event.preventDefault();
};

const updateFile = (files: File[]) => {
  const data = props.multi ? files : files[0];
  emit("update:file", data);
  file.value = data;
};

const updateFileName = () => {
  emit("update:name", fileName.value);
};

function isFileType(mimeType: string) {
  if (acceptsMime.value === "*/") return true;
  return mimeType.startsWith(acceptsMime.value);
}

const checkFileType = (file: File) => {
  if (isFileType(file.type)) return;
  throw new Error("Invalid file type: " + file.type);
};

const getFileName = (file: File) => {
  const name = file.name;
  const type = file.type;

  const realExtension = type.split("/")[1];

  const [_, ...nameOnly] = name.split(".").reverse();
  const namePart = nameOnly.reverse().join(".");

  return `${namePart}.${realExtension}`;
};

const processFiles = (fileList: FileList | File[]) => {
  try {
    const files = Array.from(fileList);
    files.map((file) => checkFileType(file));
    fileName.value = files.map((f) => getFileName(f)).join(", ");
    console.log(fileName.value);

    updateFile(files);
    updateFileName();
  } catch (err: any) {
    error.value = err.message;
  }
};

const clickHandler = (event: ClickEvent) => {
  if (event.target && event.target.files) {
    processFiles(event.target.files);
  }
};

const dropHandler = (event: DropEvent) => {
  if (event.dataTransfer && event.dataTransfer.items) {
    const files = [] as never as FileList;
    const items = event.dataTransfer.items as DataTransfer["items"];
    Array.from(items).forEach((item, i) => {
      const file = item.getAsFile();
      if (item.kind === "file" && file) {
        files[i] = file;
      }
    });
    processFiles(files);
  }
};

function open() {
  modalState.value = true;
}

async function save() {
  console.log("Saving", props.file);
  if (file.value) {
    await upload(file.value);
    // modalState.value = false;
  }
}
</script>

<style scoped></style>
