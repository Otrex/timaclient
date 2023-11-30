<template>
  <div class="inline-block min-w-[100px]">
    <label
      class="w-full flex p-[6px] items-center justify-between outline outline-[#BBBBBB] min-h-[47px] !rounded-[40px]"
    >
      <span class="text-[#BBBBBB]">{{ fileName || props.placeholder }}</span>
      <input
        v-bind="$attrs"
        :multiple="multi"
        type="file"
        class="hidden"
        @change="change"
      />
      <button
        class="!rounded-[40px] bg-[#F59594] text-[#fff] h-full min-w-[70px]"
      >
        Upload
      </button>
    </label>
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
</script>

<style scoped></style>
