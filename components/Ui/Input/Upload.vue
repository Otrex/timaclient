<template>
  <div class="inline-block min-w-[100px]">
    <div
      @click="open"
      class="w-full flex items-center gap-[10px] justify-between outline p-[6px] outline-[#BBBBBB] !rounded-[40px]"
    >
      <div>
        <span class="text-[#BBBBBB] text-[19px] pl-[12px] w-full">{{
          fileName || props.placeholder
        }}</span>
      </div>
      <div>
        <button
          @click="open"
          class="!rounded-[40px] bg-[#F59594] text-[19px] px-[50px] py-[4px] text-[#fff] min-w-[70px]"
        >
          Upload
        </button>
      </div>
    </div>

    <UtModal
      v-model:state="modalState"
      m-width="500px"
      backdrop-color="rgba(0,0,0,.3)"
    >
      <div class="model-wrapper relative">
        <div class="absolute top-[32px] right-[32px]">
          <button @click="modalState = false">
            <UtSvg name="close" class="w-[18px] h-[18px]" />
          </button>
        </div>
        <div class="px-[48px] text-center py-[35px] bg-white rounded-[30px]">
          <h4 class="text-[28px] mb-[40px]">UPLOAD FILES</h4>

          <div
            class="outline rounded-[8px] mb-[24px] outline-dashed outline-[#999999] pt-[20px] pb-[29px]"
          >
            <UtSvg name="upload" class="inline-block w-[72px] h-[72px]" />

            <h4 class="text-[24px]">Drag & Drop</h4>
            <p class="text-[#777777]">Your files here or browse to upload</p>
            <p class="text-[#0077D3]">
              Only jpeg & png files with max size of 15mb
            </p>
          </div>

          <button
            class="bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 text-white py-[14px] max-w-[200px] text-[29px] rounded-[29px] w-full"
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
