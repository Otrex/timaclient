<template>
  <div class="bg-white rounded-[20px] p-8">
    <h3 class="text-[1.25rem] font-semibold">{{ title }}</h3>
    <p class="text-sm">{{ description }}</p>

    <div class="hr mt-3" />

    <div class="flex flex-row my-10">
      <UiInputOtp
        :length="5"
        gap="1rem"
        size="3rem"
        :allow-paste="false"
        input-class="overflow-y-auto !rounded-full border border-[rgba(43,162,253,.5)]"
        @finish="onFinish"
      />
    </div>

    <div class="flex justify-center">
      <UiButtonDefault
        variant="primary"
        :disabled="!isReady || loading"
        :loading="loading"
        @click="emit('submit', value)"
        class="w-full max-w-sm py-2"
        :label="label"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  label: String,
  description: String,
  loading: Boolean,
});

const isReady = ref(false);
const value = ref("");
const emit = defineEmits(["finish", "submit"]);

function onFinish(_value: string) {
  isReady.value = true;
  value.value = _value;
  emit("finish", value);
}
</script>

<style scoped>
.hr {
  @apply h-[1px] border border-gray-300;
}
</style>
