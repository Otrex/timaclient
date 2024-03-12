<template>
  <div class="flex flex-row items-center gap-3">
    <div>
      <div class="w-[4.375rem] h-[4.375rem] overflow-hidden rounded-md">
        <UiImg :src="props.banner" class="w-full h-full object-cover" />
      </div>
    </div>
    <div>
      <h4>{{ props.name }}</h4>
      <p>{{ tools.trunc(props.description, 10) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  banner: string;
  description: string;
  publicId: string;
}>();
</script>

<style></style>
