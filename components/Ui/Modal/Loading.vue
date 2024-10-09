<template>
  <div class="bg-red-100">
    <UtModal
      v-model:state="modalState"
      m-width="50.25rem"
      content-class="mx-auto"
      backdrop-color="rgba(0,0,0,.3)"
    >
      <div class="model-wrapper rounded-lg relative">
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-5 py-[3.9375rem]">
            <div class="flex items-center mb-[5.625rem] justify-center">
              <UtSvg
                name="await"
                class="w-[4.375rem] animate-spin h-[4.375rem]"
              />
            </div>
            <div class="text-center mx-auto max-w-[43.75rem]">
              {{ props.message }}
            </div>
          </div>
        </div>
      </div>
    </UtModal>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["close", "onapprove"]);
const props = defineProps<{ loading?: boolean; message?: string }>();

const modalState = ref(false);
const open = () => {
  modalState.value = true;
};

const close = () => {
  modalState.value = false;
};

watch(modalState, () => {
  if (!modalState.value) {
    emits("close");
  }
});

defineExpose({ open, close, modalState });
</script>

<style></style>
