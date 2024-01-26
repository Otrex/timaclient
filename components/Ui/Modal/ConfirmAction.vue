<template>
  <div class="bg-red-100">
    <UtModal
      v-model:state="modalState"
      m-width="25.25rem"
      content-class="mx-auto mt-[10%]"
      backdrop-color="rgba(0,0,0,.05)"
    >
      <div class="model-wrapper rounded-lg relative">
        <div class="bg-white rounded-lg shadow-md">
          <div
            class="font-bold px-5 border-b border-slate-100 py-3 items-center justify-between flex flex-row"
          >
            <div>
              <slot name="title"></slot>
            </div>
            <div>
              <button
                @click="close"
                class="w-[1.4rem] h-[1.4rem] flex items-center justify-center bg-red-600 aspect-square hover:ring-4 hover:ring-red-300 p-[.2rem] rounded-full"
              >
                <UtSvg
                  name="close"
                  dim
                  w=".7rem"
                  h=".7rem"
                  class="text-white"
                />
              </button>
            </div>
          </div>

          <div class="px-5 py-3">
            <slot name="body"></slot>
          </div>

          <div class="px-5 py-3">
            <UiButtonDefault
              label="Approve"
              variant="primary"
              :loading="props.loading"
              :disabled="props.loading"
              class="px-3 py-1 mr-3"
              @click="emits('onapprove')"
            />
            <UiButtonDefault
              label="Cancel"
              class="px-3 py-1"
              variant="secondary"
              @click="close"
            />
          </div>
        </div>
      </div>
    </UtModal>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["oncancel", "onapprove"]);
const props = defineProps<{ loading?: boolean }>();

const modalState = ref(false);
const open = () => {
  modalState.value = true;
};

const close = () => {
  modalState.value = false;
};

watch(modalState, () => {
  if (!modalState.value) {
    emits("oncancel");
  }
});

defineExpose({ open, close, modalState });
</script>

<style></style>
