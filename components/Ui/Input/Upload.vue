<template>
  <div class="inline-block min-w-[6.25rem]">
    <div
      @click="open"
      class="w-full flex items-center gap-[0.625rem] justify-between outline p-[0.375rem] outline-[#BBBBBB] !rounded-[2.5rem]"
    >
      <div>
        <span class="text-[#BBBBBB] text-[1.1875rem] pl-[0.75rem] w-full">{{
          fileName || props.placeholder
        }}</span>
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
          class="px-[3rem] text-center py-[2.1875rem] bg-white rounded-[1.875rem]"
        >
          <h4 class="text-[1.75rem] mb-[2.5rem]">UPLOAD FILES</h4>

          <div
            class="rounded-[0.5rem] mb-[1.5rem] outline-dashed outline-[#999999] pt-[1.25rem] pb-[1.8125rem]"
          >
            <UtSvg name="upload" class="inline-block w-[4.5rem] h-[4.5rem]" />

            <h4 class="text-[1.5rem]">Drag & Drop</h4>
            <p class="text-[#777777]">Your files here or browse to upload</p>
            <p class="text-[#0077D3]">
              Only jpeg & png files with max size of 15mb
            </p>
          </div>

          <button
            class="bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 text-white py-[0.875rem] max-w-[12.5rem] text-[1.8125rem] rounded-[1.8125rem] w-full"
          >
            Save
          </button>
        </div>
      </div>
    </UtModal>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  modelValue?: string | File | File[];
  multi?: boolean;
  placeholder?: string;
}

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<IProps>();
const modalState = ref(false);

const fileName = ref<string>();

function change(e: any) {
  if (props.multi) {
    emit("update:modelValue", [...e.target.files]);
    fileName.value = e.target.files.map((f: any) => f.name).join(", ");
  } else {
    emit("update:modelValue", e.target.files[0]);
    fileName.value = e.target.files[0]?.name;
  }
}

function open() {
  modalState.value = true;
}
</script>

<style scoped></style>
