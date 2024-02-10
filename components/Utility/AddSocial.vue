<template>
  <div
    class="flex flex-col max-w-md mx-auto p-[1.25rem] pb-[3.125rem] gap-[0.625rem]"
  >
    <div class="w-[100px] mx-auto text-center h-[100px] overflow-hidden">
      <UiImg :src="props.social.logo" />
    </div>
    <h1 class="font-bold text-center">
      {{ props.social.name }}
    </h1>

    <div class="flex flex-col">
      <div class="transform z-10 translate-x-5 translate-y-3">
        <label
          :class="['bg-white px-3', props.formErrorMessage && 'text-red-600']"
          >Enter your handle:</label
        >
      </div>
      <UiInputText v-model="handle" :error-message="$props.formErrorMessage" />
    </div>

    <div>
      <UiButtonDefault
        @click="emits('add-social')"
        variant="primary"
        :loading="props.loading"
        :disabled="props.loading"
        class="px-5 w-full py-3"
      >
        Add
      </UiButtonDefault>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  social: {
    logo?: string;
    name?: string;
  };
  handle?: string;
  loading?: boolean;
  formErrorMessage?: string;
}>();

const emits = defineEmits(["update:handle", "add-social"]);
const handle = computed({
  get() {
    return props.handle;
  },
  set(value) {
    emits("update:handle", value);
  },
});
</script>

<style></style>
