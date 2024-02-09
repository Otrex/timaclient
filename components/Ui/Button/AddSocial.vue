<template>
  <div
    class="inline-block border border-solid border-[#999] rounded-[2.5rem] pr-[0.375rem] pl-[1.5rem] py-[0.375rem]"
  >
    <div class="flex justify-between w-full">
      <div class="flex items-center text-[#999] gap-[1.0625rem]">
        <div v-if="props.icon">
          <UtSvg :name="props.icon" class="w-[1.5625rem] h-[1.5625rem]" />
        </div>
        <p>{{ props.label }}</p>
      </div>
      <div class="flex-1 max-w-[9.75rem]">
        <button
          @click="open"
          class="bg-[#F59594] py-[0.375rem] text-white max-w-[9.75rem] w-full rounded-[2.5rem]"
        >
          Add
        </button>
      </div>
    </div>
    <Teleport to="body">
      <UtModal
        v-model:state="modalState"
        m-width="50.25rem"
        :preventBackdropClose="true"
        content-class="mx-auto mt-[10%]"
        backdrop-color="rgba(0,0,0,.3)"
      >
        <div class="model-wrapper rounded-lg relative">
          <div class="flex justify-end">
            <button
              class="active:ring-2 hover:ring-1 mb-1 hover:ring-slate-100 hover:rounded flex items-center justify-center active:ring-slate-50 active:rounded w-[25px] h-[25px]"
              @click="modalState = false"
            >
              <UtSvg
                name="close"
                dim
                w=".9rem"
                h=".9rem"
                class="text-white dark:text-slate-500"
              />
            </button>
          </div>
          <div class="bg-white">
            <slot name="form">
              <div class="p-[1.25rem] text-center">
                <h1 class="font-bold">404</h1>
                <p>Resource Not Available</p>
              </div>
            </slot>
          </div>
        </div>
      </UtModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  label: string;
  id: string;
  modal?: boolean;
  isCompleted?: boolean;
}>();

const $emit = defineEmits(["action", "open", "closeModal"]);

const modalState = computed({
  get() {
    return !!props.modal;
  },
  set(value) {
    $emit("closeModal", value);
  },
});

const open = () => {
  modalState.value = true;
  $emit("open", props.id);
};

const close = () => {
  modalState.value = false;
};
</script>

<style></style>
