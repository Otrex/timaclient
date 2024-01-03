<template>
  <div class="inline-block min-w-[6.25rem]">
    <div
      @click="open"
      class="w-full flex items-center gap-[0.625rem] justify-between p-[0.375rem] border border-solid border-[#6B7280] !rounded-[2.5rem]"
    >
      <div>
        <span v-show="fileName" class="text-[1.1875rem] pl-[0.75rem] w-full">{{
          fileName
        }}</span>
        <span
          v-show="!fileName"
          class="text-[#999999] text-[1.1875rem] pl-[0.75rem] w-full"
          >{{ props.placeholder || "Select a file to upload" }}</span
        >
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

    <UtModal
      v-model:state="modalState"
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
            @dragover.prevent="handleDragOver"
            @drop.prevent="dropHandler"
            class="rounded-[0.5rem] mb-[1.5rem] outline-dashed outline-[#999999] pt-[1.25rem] pb-[1.8125rem]"
          >
            <UtSvg name="upload" class="inline-block w-[4.5rem] h-[4.5rem]" />

            <h4 class="text-[1.5rem]">Drag & Drop</h4>
            <p class="text-[#777777]">Your files here or browse to upload</p>
            <label class="text-[#0077D3] whitespace-nowrap text-[1.1875rem]">
              {{ fileName || "Only jpeg & png files with max size of 15mb" }}
              <input type="file" class="hidden" @change="clickHandler" />
            </label>
          </div>

          <button
            @click="save"
            class="bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 text-white py-[0.875rem] max-w-[12.5rem] text-[1.8125rem] rounded-[1.8125rem] w-full"
          >
            {{ progress ? `${progress}%` : "Save" }}
          </button>
        </div>
      </div>
    </UtModal>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  file?: File | File[];
  name?: string;
  multi?: boolean;
  placeholder?: string;
}

type ClickEvent = Event & (MouseEvent & { target: HTMLInputElement }) & any;
type DropEvent = DragEvent & ({ dataTransfer: DataTransfer } | any);

const progress = ref(0);
const file = ref();

const { execute: upload } = useFileUploader("picture", (e) => {
  progress.value = e;
});

const emit = defineEmits(["update:file", "update:name"]);
const props = defineProps<IProps>();
const modalState = ref(false);

const fileName = ref<string>();

const handleDragOver = (event: any) => {
  event.preventDefault();
};

const updateFile = (files: File[]) => {
  const data = props.multi ? files : files[0];
  emit("update:file", props.multi ? files : files[0]);
  file.value = data;
};

const updateFileName = () => {
  emit("update:name", fileName.value);
};

const processFiles = (fileList: FileList) => {
  const files = Array.from(fileList);
  fileName.value = files.map((f) => f.name).join(", ");
  updateFile(files);
  updateFileName();
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
