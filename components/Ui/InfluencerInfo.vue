<template>
  <div
    class="flex flex-row gap-[15px] hover:transform hover:-translate-y-1 border border-solid border-slate-200 rounded-md p-[15px] items-center"
  >
    <div class="w-[150px] aspect-square overflow-hidden rounded-lg">
      <UiImg :src="props.profilePicture" class="w-full h-full object-cover" />
    </div>
    <div>
      <span
        class="text-[0.875rem] bg-red-300 dark:text-black rounded-lg px-2 py-1"
        >{{ props.username }}</span
      >
      <h4 class="font-semibold">{{ props.fullName }}</h4>
      <p class="text-[0.875rem]">{{ props.email }}</p>
      <p class="text-[0.875rem]">{{ props.phoneNumber }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  publicId: string;
  username: string;
  fullName: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
}>();
</script>

<style></style>
