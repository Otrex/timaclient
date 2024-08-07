<template>
  <div
    class="inline-block border border-solid border-[#999] rounded-[2.5rem] pr-[0.375rem] pl-[1.5rem] py-[0.375rem]"
  >
    <div class="flex justify-between w-full">
      <div class="flex items-center text-[#999] gap-[1.0625rem]">
        <div v-if="props.icon">
          <UtSvg :name="props.icon" class="w-[1.5625rem] h-[1.5625rem]" />
        </div>
        <p v-if="!props.isCompleted">{{ props.label }}</p>
        <p v-else>Connected!</p>
      </div>
      <div
        :class="['flex-1 max-w-[9.75rem]', props.isCompleted && 'invisible']"
      >
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
        m-width="37.75rem"
        :preventBackdropClose="true"
        content-class="mx-auto mt-[10%]"
        backdrop-color="rgba(0,0,0,.3)"
      >
        <div class="model-wrapper rounded-lg relative">
          <div class="bg-white pt-6 !rounded-[2.5rem]">
            <div class="absolute top-[2rem] right-[2rem]">
              <button @click="modalState = false">
                <UtSvg name="close" class="w-[1.125rem] h-[1.125rem]" />
              </button>
            </div>
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
