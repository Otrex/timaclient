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

    <UtModal v-model:state="modalState">
      <div class="model-wrapper">
        <div class="px-[48px] py-[35px] bg-white rounded-[30px]">
          <h4 class="text-[28px] text-center">UPLOAD FILES</h4>

          <div
            class="outline rounded-[8px] outline-dashed outline-[#999999] pt-[20px] pb-[29px]"
          ></div>
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
