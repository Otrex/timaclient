<template>
  <div class="inline-block rounded-[2.5rem]">
    <div
      class="bg-[#2BA2FD] bg-opacity-10 rounded-[2.5rem] border border-solid border-[rgba(43,162,253,.2)] px-[40px] py-[30px]"
    >
      <div v-if="props.icon" class="mb-[40px]">
        <UtSvg :name="props.icon" class="mb-2" dim w="60px" h="60px" />
        <p>{{ props.label }}</p>
      </div>
      <button
        @click="open"
        class="bg-[#d03f3d] py-[0.375rem] text-white max-w-[9.75rem] w-full rounded-[2.5rem]"
      >
        Connect
      </button>
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
